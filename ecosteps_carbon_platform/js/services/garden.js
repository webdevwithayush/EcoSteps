import { supabase, TABLES, STORAGE_BUCKETS } from '../config/supabase.js';

export class GardenService {
  static async createGarden(gardenData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.GARDENS)
        .insert({
          owner_id: gardenData.owner_id,
          name: gardenData.name,
          description: gardenData.description,
          location: gardenData.location,
          garden_type: gardenData.garden_type,
          size_sqm: gardenData.size_sqm,
          image_urls: gardenData.image_urls || []
        })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Create garden error:', error);
      return { data: null, error };
    }
  }

  static async getGardensByOwner(ownerId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.GARDENS)
        .select(`
          *,
          submissions (
            id,
            tree_count,
            estimated_co2_offset,
            status,
            submitted_at
          )
        `)
        .eq('owner_id', ownerId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get gardens error:', error);
      return { data: null, error };
    }
  }

  static async getGardenById(gardenId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.GARDENS)
        .select(`
          *,
          users (
            full_name,
            email
          ),
          submissions (
            id,
            tree_count,
            tree_types,
            estimated_co2_offset,
            status,
            submitted_at,
            verification_photos
          )
        `)
        .eq('id', gardenId)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get garden error:', error);
      return { data: null, error };
    }
  }

  static async updateGarden(gardenId, updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.GARDENS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', gardenId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Update garden error:', error);
      return { data: null, error };
    }
  }

  static async deleteGarden(gardenId) {
    try {
      const { error } = await supabase
        .from(TABLES.GARDENS)
        .delete()
        .eq('id', gardenId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Delete garden error:', error);
      return { error };
    }
  }

  static async uploadGardenImages(gardenId, files) {
    try {
      const uploadPromises = files.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${gardenId}/${Date.now()}_${index}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from(STORAGE_BUCKETS.GARDEN_IMAGES)
          .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from(STORAGE_BUCKETS.GARDEN_IMAGES)
          .getPublicUrl(fileName);

        return publicUrl;
      });

      const imageUrls = await Promise.all(uploadPromises);
      return { data: imageUrls, error: null };
    } catch (error) {
      console.error('Upload garden images error:', error);
      return { data: null, error };
    }
  }

  static async searchGardens(filters = {}) {
    try {
      let query = supabase
        .from(TABLES.GARDENS)
        .select(`
          *,
          users (
            full_name
          ),
          submissions (
            id,
            tree_count,
            estimated_co2_offset,
            status
          )
        `);

      // Apply filters
      if (filters.garden_type) {
        query = query.eq('garden_type', filters.garden_type);
      }

      if (filters.location) {
        // Implement location-based search
        query = query.ilike('location->address', `%${filters.location}%`);
      }

      if (filters.min_size) {
        query = query.gte('size_sqm', filters.min_size);
      }

      if (filters.max_size) {
        query = query.lte('size_sqm', filters.max_size);
      }

      // Always filter for active gardens
      query = query.eq('status', 'active');

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Search gardens error:', error);
      return { data: null, error };
    }
  }
}