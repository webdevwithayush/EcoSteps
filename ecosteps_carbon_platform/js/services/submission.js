import { supabase, TABLES, STORAGE_BUCKETS } from '../config/supabase.js';

export class SubmissionService {
  static async createSubmission(submissionData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SUBMISSIONS)
        .insert({
          garden_id: submissionData.garden_id,
          submitter_id: submissionData.submitter_id,
          tree_count: submissionData.tree_count,
          tree_types: submissionData.tree_types,
          estimated_co2_offset: submissionData.estimated_co2_offset,
          verification_photos: submissionData.verification_photos || [],
          additional_data: submissionData.additional_data || {}
        })
        .select()
        .single();

      if (error) throw error;

      // Create notification for successful submission
      await this.createNotification(submissionData.submitter_id, {
        title: 'Submission Received',
        message: 'Your garden submission has been received and is pending review.',
        type: 'info',
        related_id: data.id
      });

      return { data, error: null };
    } catch (error) {
      console.error('Create submission error:', error);
      return { data: null, error };
    }
  }

  static async getSubmissionsByUser(userId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SUBMISSIONS)
        .select(`
          *,
          gardens (
            name,
            location,
            garden_type
          ),
          carbon_credits (
            id,
            credit_amount,
            price_per_tonne,
            total_value,
            status
          )
        `)
        .eq('submitter_id', userId)
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get user submissions error:', error);
      return { data: null, error };
    }
  }

  static async getSubmissionById(submissionId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.SUBMISSIONS)
        .select(`
          *,
          gardens (
            *,
            users (
              full_name,
              email
            )
          ),
          carbon_credits (
            *
          )
        `)
        .eq('id', submissionId)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get submission error:', error);
      return { data: null, error };
    }
  }

  static async updateSubmissionStatus(submissionId, status, reviewerNotes = null) {
    try {
      const updates = {
        status,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (reviewerNotes) {
        updates.reviewer_notes = reviewerNotes;
      }

      const { data, error } = await supabase
        .from(TABLES.SUBMISSIONS)
        .update(updates)
        .eq('id', submissionId)
        .select(`
          *,
          gardens (
            owner_id
          )
        `)
        .single();

      if (error) throw error;

      // Create notification for status update
      const notificationMessages = {
        approved: 'Your garden submission has been approved! Carbon credits are now being generated.',
        rejected: 'Your garden submission has been rejected. Please review the notes and resubmit if needed.',
        under_review: 'Your garden submission is now under detailed review by our team.'
      };

      const notificationTypes = {
        approved: 'success',
        rejected: 'error',
        under_review: 'info'
      };

      await this.createNotification(data.gardens.owner_id, {
        title: `Submission ${status.replace('_', ' ').toUpperCase()}`,
        message: notificationMessages[status],
        type: notificationTypes[status],
        related_id: submissionId
      });

      // If approved, create carbon credits
      if (status === 'approved') {
        await this.generateCarbonCredits(data);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Update submission status error:', error);
      return { data: null, error };
    }
  }

  static async uploadVerificationPhotos(submissionId, files) {
    try {
      const uploadPromises = files.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `verification/${submissionId}/${Date.now()}_${index}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from(STORAGE_BUCKETS.GARDEN_IMAGES)
          .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from(STORAGE_BUCKETS.GARDEN_IMAGES)
          .getPublicUrl(fileName);

        return publicUrl;
      });

      const photoUrls = await Promise.all(uploadPromises);
      return { data: photoUrls, error: null };
    } catch (error) {
      console.error('Upload verification photos error:', error);
      return { data: null, error };
    }
  }

  static async generateCarbonCredits(submission) {
    try {
      // Calculate carbon credit amount based on tree data
      const creditAmount = submission.estimated_co2_offset;
      const pricePerTonne = 25.00; // Base price per tonne CO2

      const { data, error } = await supabase
        .from(TABLES.CARBON_CREDITS)
        .insert({
          submission_id: submission.id,
          owner_id: submission.submitter_id,
          credit_amount: creditAmount,
          price_per_tonne: pricePerTonne,
          total_value: creditAmount * pricePerTonne,
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
        })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Generate carbon credits error:', error);
      return { data: null, error };
    }
  }

  static async createNotification(userId, notificationData) {
    try {
      const { error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .insert({
          user_id: userId,
          ...notificationData
        });

      if (error) throw error;
    } catch (error) {
      console.error('Create notification error:', error);
    }
  }

  static async getPendingSubmissions() {
    try {
      const { data, error } = await supabase
        .from(TABLES.SUBMISSIONS)
        .select(`
          *,
          gardens (
            name,
            location,
            users (
              full_name,
              email
            )
          )
        `)
        .in('status', ['submitted', 'under_review'])
        .order('submitted_at', { ascending: true });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get pending submissions error:', error);
      return { data: null, error };
    }
  }

  static calculateCO2Offset(treeTypes) {
    // CO2 absorption rates by tree type (tonnes per year)
    const absorptionRates = {
      oak: 0.048,
      pine: 0.035,
      maple: 0.042,
      birch: 0.038,
      fruit: 0.025,
      default: 0.040
    };

    let totalOffset = 0;

    treeTypes.forEach(tree => {
      const rate = absorptionRates[tree.name.toLowerCase()] || absorptionRates.default;
      const ageMultiplier = Math.min(tree.age_years / 10, 1); // Full capacity at 10 years
      const sizeMultiplier = tree.diameter_cm / 30; // Normalized to 30cm diameter
      
      totalOffset += tree.count * rate * ageMultiplier * sizeMultiplier;
    });

    return Math.round(totalOffset * 1000) / 1000; // Round to 3 decimal places
  }
}