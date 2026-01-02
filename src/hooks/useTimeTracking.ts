import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const SAVE_INTERVAL_MS = 60000; // Save every minute

export const useTimeTracking = () => {
  const { user } = useAuth();
  const sessionStartRef = useRef<number>(Date.now());
  const lastSaveRef = useRef<number>(Date.now());
  const accumulatedSecondsRef = useRef<number>(0);

  const saveTimeToDatabase = useCallback(async (seconds: number) => {
    if (!user || seconds <= 0) return;

    const today = new Date().toISOString().split('T')[0];

    try {
      // Try to upsert the time for today
      const { data: existing } = await supabase
        .from('daily_time_tracking')
        .select('id, time_spent_seconds')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (existing) {
        // Update existing record
        await supabase
          .from('daily_time_tracking')
          .update({ 
            time_spent_seconds: existing.time_spent_seconds + seconds 
          })
          .eq('id', existing.id);
      } else {
        // Insert new record
        await supabase
          .from('daily_time_tracking')
          .insert({
            user_id: user.id,
            date: today,
            time_spent_seconds: seconds,
          });
      }
    } catch (error) {
      console.error('Error saving time tracking:', error);
    }
  }, [user]);

  const saveAccumulatedTime = useCallback(() => {
    const now = Date.now();
    const secondsSinceLastSave = Math.floor((now - lastSaveRef.current) / 1000);
    
    if (secondsSinceLastSave > 0) {
      accumulatedSecondsRef.current += secondsSinceLastSave;
      lastSaveRef.current = now;
      
      // Save to database
      saveTimeToDatabase(accumulatedSecondsRef.current);
      accumulatedSecondsRef.current = 0;
    }
  }, [saveTimeToDatabase]);

  useEffect(() => {
    if (!user) return;

    // Reset refs when user changes
    sessionStartRef.current = Date.now();
    lastSaveRef.current = Date.now();
    accumulatedSecondsRef.current = 0;

    // Save periodically
    const intervalId = setInterval(saveAccumulatedTime, SAVE_INTERVAL_MS);

    // Handle visibility change (tab switch, minimize)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveAccumulatedTime();
      } else {
        lastSaveRef.current = Date.now();
      }
    };

    // Handle page unload
    const handleBeforeUnload = () => {
      const now = Date.now();
      const secondsSinceLastSave = Math.floor((now - lastSaveRef.current) / 1000);
      if (secondsSinceLastSave > 0) {
        // Use sendBeacon for reliable save on page unload
        const today = new Date().toISOString().split('T')[0];
        navigator.sendBeacon?.(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/daily_time_tracking`,
          JSON.stringify({
            user_id: user.id,
            date: today,
            time_spent_seconds: secondsSinceLastSave,
          })
        );
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveAccumulatedTime();
    };
  }, [user, saveAccumulatedTime]);

  return { saveAccumulatedTime };
};
