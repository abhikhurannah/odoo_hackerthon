import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SwapRequest } from '../types';

export function useSwapRequests(userId?: string) {
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchSwapRequests();
    }
  }, [userId]);

  const fetchSwapRequests = async () => {
    if (!userId) return;

    try {
      // Use mock data since swap_requests table doesn't exist yet
      // In a real app, this would fetch from supabase swap_requests table
      const mockRequests: SwapRequest[] = [
        {
          id: 'mock-request-1',
          fromUserId: 'mock-user-1',
          toUserId: userId,
          skillOffered: 'React',
          skillWanted: 'Python',
          message: 'Hi! I\'d love to learn Python from you. I can teach you React in exchange.',
          status: 'pending',
          createdAt: '2024-11-05T10:00:00Z',
          updatedAt: '2024-11-05T10:00:00Z'
        }
      ];

      // Only show mock requests if current user is involved
      const filteredRequests = mockRequests.filter(req => 
        req.fromUserId === userId || req.toUserId === userId
      );

      setSwapRequests(filteredRequests);
    } catch (error) {
      console.error('Error in fetchSwapRequests:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSwapRequest = async (data: {
    toUserId: string;
    skillOffered: string;
    skillWanted: string;
    message: string;
  }) => {
    if (!userId) return false;

    try {
      // Mock creation - in real app this would insert to supabase
      console.log('Mock: Creating swap request', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add mock request to current state
      const mockRequest: SwapRequest = {
        id: `mock-request-${Date.now()}`,
        fromUserId: userId,
        toUserId: data.toUserId,
        skillOffered: data.skillOffered,
        skillWanted: data.skillWanted,
        message: data.message,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setSwapRequests(prev => [mockRequest, ...prev]);
      return true;
    } catch (error) {
      console.error('Error in createSwapRequest:', error);
      return false;
    }
  };

  const updateSwapRequest = async (requestId: string, status: SwapRequest['status']) => {
    try {
      const { error } = await supabase
        .from('swap_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) {
        console.error('Error updating swap request:', error);
        return false;
      }

      // Refresh requests
      await fetchSwapRequests();
      return true;
    } catch (error) {
      console.error('Error in updateSwapRequest:', error);
      return false;
    }
  };

  const deleteSwapRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('swap_requests')
        .delete()
        .eq('id', requestId);

      if (error) {
        console.error('Error deleting swap request:', error);
        return false;
      }

      // Refresh requests
      await fetchSwapRequests();
      return true;
    } catch (error) {
      console.error('Error in deleteSwapRequest:', error);
      return false;
    }
  };

  return {
    swapRequests,
    loading,
    createSwapRequest,
    updateSwapRequest,
    deleteSwapRequest,
    refetch: fetchSwapRequests
  };
}