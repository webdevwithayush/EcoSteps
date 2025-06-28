import { supabase, TABLES } from '../config/supabase.js';

export class NotificationService {
  static async getUserNotifications(userId, limit = 20) {
    try {
      const { data, error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Get user notifications error:', error);
      return { data: null, error };
    }
  }

  static async markAsRead(notificationId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .update({ read_at: new Date().toISOString() })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Mark notification as read error:', error);
      return { data: null, error };
    }
  }

  static async markAllAsRead(userId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .update({ read_at: new Date().toISOString() })
        .eq('user_id', userId)
        .is('read_at', null);

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Mark all notifications as read error:', error);
      return { data: null, error };
    }
  }

  static async getUnreadCount(userId) {
    try {
      const { count, error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .select('id', { count: 'exact' })
        .eq('user_id', userId)
        .is('read_at', null);

      if (error) throw error;

      return { data: count, error: null };
    } catch (error) {
      console.error('Get unread count error:', error);
      return { data: 0, error };
    }
  }

  static async createNotification(userId, notificationData) {
    try {
      const { data, error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .insert({
          user_id: userId,
          title: notificationData.title,
          message: notificationData.message,
          type: notificationData.type,
          related_id: notificationData.related_id
        })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Create notification error:', error);
      return { data: null, error };
    }
  }

  static async deleteNotification(notificationId) {
    try {
      const { error } = await supabase
        .from(TABLES.NOTIFICATIONS)
        .delete()
        .eq('id', notificationId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Delete notification error:', error);
      return { error };
    }
  }

  static subscribeToNotifications(userId, callback) {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: TABLES.NOTIFICATIONS,
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();

    return channel;
  }

  static unsubscribeFromNotifications(channel) {
    if (channel) {
      supabase.removeChannel(channel);
    }
  }
}