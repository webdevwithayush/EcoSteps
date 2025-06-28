import { supabase } from '../config/supabase.js';

export class AuthService {
  static async signUp(email, password, userData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.fullName,
            role: userData.role
          }
        }
      });

      if (error) throw error;

      // Create user profile in public.users table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            full_name: userData.fullName,
            role: userData.role,
            organization_name: userData.organizationName || null
          });

        if (profileError) throw profileError;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  }

  static async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear any local storage
      localStorage.removeItem('supabase.auth.token');
      
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      if (user) {
        // Get additional user data from public.users table
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        return { user: { ...user, ...profile }, error: null };
      }

      return { user: null, error: null };
    } catch (error) {
      console.error('Get current user error:', error);
      return { user: null, error };
    }
  }

  static async updateProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error };
    }
  }

  static async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/pages/reset-password.html`
      });

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error };
    }
  }

  static onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }

  static async signInWithProvider(provider) {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/pages/garden_owner_dashboard.html`
        }
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
      return { data: null, error };
    }
  }
}

// Auth state management
export class AuthState {
  static user = null;
  static listeners = [];

  static init() {
    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { user } = await AuthService.getCurrentUser();
        this.user = user;
      } else {
        this.user = null;
      }
      
      // Notify listeners
      this.listeners.forEach(callback => callback(this.user, event));
    });
  }

  static subscribe(callback) {
    this.listeners.push(callback);
    // Call immediately with current user
    callback(this.user, 'initial');
  }

  static unsubscribe(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  static isAuthenticated() {
    return !!this.user;
  }

  static hasRole(role) {
    return this.user?.role === role;
  }

  static requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '/pages/user_registration_login.html';
      return false;
    }
    return true;
  }

  static requireRole(role) {
    if (!this.hasRole(role)) {
      throw new Error(`Access denied. Required role: ${role}`);
    }
  }
}

// Initialize auth state
AuthState.init();