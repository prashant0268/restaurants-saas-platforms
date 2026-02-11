import { useEffect, useCallback, useRef } from 'react';
import { useLocationStore } from '../stores/locationStore';
import type { GeoPoint } from '@restaurants/types';

interface UseLocationReturn {
  currentLocation: GeoPoint | null;
  heading: number | null;
  speed: number | null;
  isTracking: boolean;
  locationPermissionGranted: boolean;
  error: string | null;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
}

const LOCATION_UPDATE_INTERVAL_MS = 10000; // 10 seconds

export const useLocation = (): UseLocationReturn => {
  const {
    currentLocation,
    heading,
    speed,
    isTracking,
    locationPermissionGranted,
    error,
    startTracking,
    stopTracking,
    updateDriverLocation,
  } = useLocationStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Periodically sync driver location to Firestore
  useEffect(() => {
    if (isTracking && currentLocation) {
      // Send initial update
      updateDriverLocation();

      intervalRef.current = setInterval(() => {
        updateDriverLocation();
      }, LOCATION_UPDATE_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTracking, currentLocation, updateDriverLocation]);

  const handleStartTracking = useCallback(async () => {
    await startTracking();
  }, [startTracking]);

  const handleStopTracking = useCallback(() => {
    stopTracking();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [stopTracking]);

  return {
    currentLocation,
    heading,
    speed,
    isTracking,
    locationPermissionGranted,
    error,
    startTracking: handleStartTracking,
    stopTracking: handleStopTracking,
  };
};
