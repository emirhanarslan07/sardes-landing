import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Global event emitter for interest updates
class InterestEventEmitter {
  private listeners: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  emit() {
    this.listeners.forEach(callback => callback());
  }
}

export const interestEmitter = new InterestEventEmitter();

export const useWaitlistCount = () => {
  const [count, setCount] = useState(360); // Base count
  const [isLoading, setIsLoading] = useState(true);

  const fetchCount = async () => {
    try {
      const { count: realCount, error } = await supabase
        .from('interest_submissions')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Interest count fetch error:', error);
        setCount(360);
      } else {
        // Base count (360) + real signups
        setCount(360 + (realCount || 0));
      }
    } catch (error) {
      console.error('Interest count error:', error);
      setCount(360);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();

    // Listen for interest updates
    const unsubscribe = interestEmitter.subscribe(fetchCount);

    // Periodic refresh every 30 seconds
    const interval = setInterval(fetchCount, 30000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return { count, isLoading, refetch: fetchCount };
};