import { create } from 'zustand';
import type {
  DeliveryAssignment,
  DeliveryStatus,
  ProofOfDelivery,
} from '@restaurants/types';

interface DeliveryState {
  currentDelivery: DeliveryAssignment | null;
  availableOrders: DeliveryAssignment[];
  isLoading: boolean;
  error: string | null;

  setCurrentDelivery: (delivery: DeliveryAssignment | null) => void;
  setAvailableOrders: (orders: DeliveryAssignment[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  acceptDelivery: (deliveryId: string) => Promise<void>;
  updateDeliveryStatus: (deliveryId: string, status: DeliveryStatus) => void;
  completeDelivery: (
    deliveryId: string,
    proof?: Partial<ProofOfDelivery>,
  ) => Promise<void>;
  declineDelivery: (deliveryId: string) => void;
  fetchAvailableOrders: () => Promise<void>;
}

export const useDeliveryStore = create<DeliveryState>((set, get) => ({
  currentDelivery: null,
  availableOrders: [],
  isLoading: false,
  error: null,

  setCurrentDelivery: (delivery) => set({ currentDelivery: delivery }),

  setAvailableOrders: (orders) => set({ availableOrders: orders }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  acceptDelivery: async (deliveryId: string) => {
    const { availableOrders } = get();
    set({ isLoading: true, error: null });
    try {
      const delivery = availableOrders.find((o) => o.id === deliveryId);
      if (!delivery) {
        throw new Error('Delivery not found');
      }

      // TODO: Update delivery status in Firestore to 'accepted'
      // await updateDoc(doc(db, 'deliveries', deliveryId), {
      //   status: 'accepted',
      //   driverId: currentUser.uid,
      // });

      const updatedDelivery: DeliveryAssignment = {
        ...delivery,
        status: 'accepted',
      };

      set({
        currentDelivery: updatedDelivery,
        availableOrders: availableOrders.filter((o) => o.id !== deliveryId),
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to accept delivery';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  updateDeliveryStatus: (deliveryId: string, status: DeliveryStatus) => {
    const { currentDelivery } = get();
    if (currentDelivery?.id !== deliveryId) return;

    // TODO: Update status in Firestore
    // await updateDoc(doc(db, 'deliveries', deliveryId), {
    //   status,
    //   statusHistory: arrayUnion({ status, changedAt: serverTimestamp() }),
    // });

    set({
      currentDelivery: {
        ...currentDelivery,
        status,
      },
    });
  },

  completeDelivery: async (
    deliveryId: string,
    proof?: Partial<ProofOfDelivery>,
  ) => {
    const { currentDelivery } = get();
    if (currentDelivery?.id !== deliveryId) return;

    set({ isLoading: true, error: null });
    try {
      // TODO: Update delivery in Firestore to 'delivered'
      // await updateDoc(doc(db, 'deliveries', deliveryId), {
      //   status: 'delivered',
      //   actualDeliveryTime: serverTimestamp(),
      //   proofOfDelivery: proof,
      // });

      set({ currentDelivery: null });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to complete delivery';
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  declineDelivery: (deliveryId: string) => {
    const { availableOrders } = get();
    set({
      availableOrders: availableOrders.filter((o) => o.id !== deliveryId),
    });
  },

  fetchAvailableOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Query Firestore for available deliveries near driver location
      // const q = query(
      //   collection(db, 'deliveries'),
      //   where('status', '==', 'pending'),
      //   orderBy('createdAt', 'desc'),
      //   limit(20),
      // );
      // const snapshot = await getDocs(q);
      // const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // set({ availableOrders: orders });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch orders';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
