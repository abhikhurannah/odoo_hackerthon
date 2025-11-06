import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Use mock data since profiles table doesn't exist yet
      // In a real app, this would fetch from supabase profiles table
      const mockUsers: User[] = [
        {
          id: 'mock-user-1',
          name: 'Alex Chen',
          email: 'alex@example.com',
          location: 'San Francisco, CA',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          skillsOffered: ['React', 'TypeScript', 'Node.js'],
          skillsWanted: ['Python', 'Machine Learning', 'DevOps'],
          rating: 4.8,
          totalSwaps: 12,
          availability: ['Weekends', 'Evenings'],
          isOnline: true,
          joinedDate: '2024-01-15',
          isAdmin: false
        },
        {
          id: 'mock-user-2',
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          location: 'New York, NY',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          skillsOffered: ['Python', 'Data Science', 'Machine Learning'],
          skillsWanted: ['React', 'Frontend Development', 'UI/UX Design'],
          rating: 4.9,
          totalSwaps: 8,
          availability: ['Weekdays', 'Mornings'],
          isOnline: false,
          joinedDate: '2024-02-20',
          isAdmin: false
        },
        {
          id: 'mock-user-3',
          name: 'Mike Rodriguez',
          email: 'mike@example.com',
          location: 'Austin, TX',
          avatar: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          skillsOffered: ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
          skillsWanted: ['Mobile Development', 'React Native', 'iOS'],
          rating: 4.7,
          totalSwaps: 15,
          availability: ['Weekends', 'Evenings'],
          isOnline: true,
          joinedDate: '2024-01-10',
          isAdmin: false
        }
      ];

      setUsers(mockUsers);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (userId: string, updates: Partial<User>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          location: updates.location,
          skills_offered: updates.skillsOffered,
          skills_wanted: updates.skillsWanted,
          availability: updates.availability,
          is_online: updates.isOnline
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating profile:', error);
        return false;
      }

      // Refresh users list
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('Error in updateUserProfile:', error);
      return false;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('Error deleting user:', error);
        return false;
      }

      // Refresh users list
      await fetchUsers();
      return true;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      return false;
    }
  };

  return {
    users,
    loading,
    updateUserProfile,
    deleteUser,
    refetch: fetchUsers
  };
}