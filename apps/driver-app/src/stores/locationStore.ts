import { create } from 'zustand';
import type { GeoPoint } from '@restaurants/types';

interface LocationState {
  currentLocation: GeoPoint | null;
  heading: number | null;
  speed: number | null;
  isTracking: boolean;
  locationPermissionGranted: boolean;
  error: string | null;

  setCurrentLocation: (location: GeoPoint) => void;
  setHeading: (heading: number) => void;
  setSpeed: (speed: number) => void;
  setTracking: (isTracking: boolean) => void;
  setLocationPermission: (granted: boolean) => void;
  setError: (error: string | null) => void;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
  updateDriverLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  currentLocation: null,
  heading: null,
  speed: null,
  isTracking: false,
  locationPermissionGranted: false,
  error: null,

  setCurrentLocation: (location) => set({ currentLocation: location }),

  setHeading: (heading) => set({ heading }),

  setSpeed: (speed) => set({ speed }),

  setTracking: (isTracking) => set({ isTracking }),

  setLocationPermission: (granted) =>
    set({ locationPermissionGranted: granted }),

  setError: (error) => set({ error }),

  startTracking: async () => {
    try {
      // TODO: Request location permissions
      // const { status } = await Location.requestForegroundPermissionsAsync();
      // if (status !== 'granted') {
      //   set({ locationPermissionGranted: false, error: 'Location permission denied' });
      //   return;
      // }
      // set({ locationPermissionGranted: true });

      // TODO: Start watching location with expo-location
      // const subscription = await Location.watchPositionAsync(
      //   {
      //     accuracy: Location.Accuracy.High,
      //     timeInterval: 5000,
      //     distanceInterval: 10,
      //   },
      //   (location) => {
      //     set({
      //       currentLocation: {
      //         latitude: location.coords.latitude,
      //         longitude: location.coords.longitude,
      //       },
      //       heading: location.coords.heading ?? null,
      //       speed: location.coords.speed ?? null,
      //     });
      //   },
      // );

      set({ isTracking: true, error: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to start location tracking';
      set({ error: message, isTracking: false });
    }
  },

  stopTracking: () => {
    // TODO: Remove location subscription
    set({ isTracking: false });
  },

  updateDriverLocation: async () => {
    const { currentLocation, heading, speed } = get();
    if (!currentLocation) return;

    try {
      // TODO: Update driver location in Firestore
      // await updateDoc(doc(db, 'driverLocations', driverId), {
      //   location: new GeoPoint(currentLocation.latitude, currentLocation.longitude),
      //   heading: heading ?? 0,
      //   speed: speed ?? 0,
      //   isOnline: true,
      //   updatedAt: serverTimestamp(),
      // });
    } catch (err) {
      console.error('Failed to update driver location:', err);
    }
  },
}));
