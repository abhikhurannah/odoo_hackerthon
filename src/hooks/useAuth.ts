import { useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { AuthUser } from '../types';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('🔄 Setting up user profile for:', supabaseUser.email);
      
      // Skip database profile fetch since tables don't exist yet
      // Create a basic user profile from auth data
      const isAdminEmail = supabaseUser.email === 'admin@skillshare.com';
      
      setUser({
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.name || 
              supabaseUser.email?.split('@')[0] || 
              'User',
        email: supabaseUser.email || '',
        avatar: `https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`,
        isAdmin: isAdminEmail
      });
      
      console.log('✅ User profile set successfully');
    } catch (error) {
      console.error('❌ Error in fetchUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('🔄 Starting signup process for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          },
          emailRedirectTo: undefined // Disable email confirmation
        }
      });

      if (error) {
        console.error('❌ Supabase signup error:', error);
        
        // Handle specific error cases
        if (error.message.includes('Database error saving new user')) {
          throw new Error('There was a database issue creating your account. Please try again in a moment.');
        } else if (error.message.includes('User already registered')) {
          throw new Error('An account with this email already exists. Please try signing in instead.');
        } else {
          throw new Error(error.message || 'Failed to create account');
        }
      }

      console.log('✅ Signup successful:', data);
      return data;
    } catch (error) {
      console.error('❌ Signup error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Supabase signin error:', error.message);
        throw new Error(error.message || 'Failed to sign in');
      }

      return data;
    } catch (error) {
      console.error('❌ Signin error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut
  };
}
