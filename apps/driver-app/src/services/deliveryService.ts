import type {
  DeliveryAssignment,
  DeliveryStatus,
  DriverEarnings,
  ProofOfDelivery,
  GeoPoint,
} from '@restaurants/types';

/**
 * Service for managing delivery operations with Firestore.
 * All methods are stubs that should be connected to Firebase.
 */

/**
 * Fetches available delivery assignments near the driver's location.
 */
export const fetchAvailableDeliveries = async (
  driverLocation: GeoPoint,
  radiusKm: number = 10,
): Promise<DeliveryAssignment[]> => {
  // TODO: Query Firestore for pending deliveries within radius
  // Use GeoFirestore or geohash-based queries for location filtering
  // const q = query(
  //   collection(db, 'deliveries'),
  //   where('status', '==', 'pending'),
  //   orderBy('createdAt', 'desc'),
  //   limit(20),
  // );
  // const snapshot = await getDocs(q);
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log('fetchAvailableDeliveries:', driverLocation, radiusKm);
  return [];
};

/**
 * Accepts a delivery assignment for the current driver.
 */
export const acceptDelivery = async (
  deliveryId: string,
  driverId: string,
  driverName: string,
): Promise<DeliveryAssignment> => {
  // TODO: Update delivery in Firestore
  // await updateDoc(doc(db, 'deliveries', deliveryId), {
  //   status: 'accepted',
  //   driverId,
  //   driverName,
  //   updatedAt: serverTimestamp(),
  //   statusHistory: arrayUnion({
  //     status: 'accepted',
  //     changedAt: Timestamp.now(),
  //   }),
  // });
  console.log('acceptDelivery:', deliveryId, driverId);
  throw new Error('Not implemented');
};

/**
 * Updates the status of a delivery.
 */
export const updateDeliveryStatus = async (
  deliveryId: string,
  status: DeliveryStatus,
  location?: GeoPoint,
  note?: string,
): Promise<void> => {
  // TODO: Update delivery status in Firestore
  // await updateDoc(doc(db, 'deliveries', deliveryId), {
  //   status,
  //   updatedAt: serverTimestamp(),
  //   statusHistory: arrayUnion({
  //     status,
  //     changedAt: Timestamp.now(),
  //     location,
  //     note,
  //   }),
  // });
  console.log('updateDeliveryStatus:', deliveryId, status);
};

/**
 * Completes a delivery with optional proof.
 */
export const completeDelivery = async (
  deliveryId: string,
  proof?: Partial<ProofOfDelivery>,
): Promise<void> => {
  // TODO: Mark delivery as delivered in Firestore
  // await updateDoc(doc(db, 'deliveries', deliveryId), {
  //   status: 'delivered',
  //   actualDeliveryTime: serverTimestamp(),
  //   proofOfDelivery: proof
  //     ? { ...proof, timestamp: Timestamp.now() }
  //     : null,
  //   updatedAt: serverTimestamp(),
  // });
  console.log('completeDelivery:', deliveryId, proof);
};

/**
 * Fetches delivery history for a driver.
 */
export const fetchDeliveryHistory = async (
  driverId: string,
  limit: number = 20,
  lastDocId?: string,
): Promise<DeliveryAssignment[]> => {
  // TODO: Query Firestore for completed deliveries
  // const constraints = [
  //   where('driverId', '==', driverId),
  //   where('status', 'in', ['delivered', 'cancelled']),
  //   orderBy('updatedAt', 'desc'),
  //   firestoreLimit(limit),
  // ];
  // if (lastDocId) {
  //   const lastDoc = await getDoc(doc(db, 'deliveries', lastDocId));
  //   constraints.push(startAfter(lastDoc));
  // }
  // const q = query(collection(db, 'deliveries'), ...constraints);
  // const snapshot = await getDocs(q);
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log('fetchDeliveryHistory:', driverId, limit, lastDocId);
  return [];
};

/**
 * Fetches earnings summary for a driver.
 */
export const fetchDriverEarnings = async (
  driverId: string,
  period: 'daily' | 'weekly' | 'monthly',
  date: string,
): Promise<DriverEarnings | null> => {
  // TODO: Query Firestore for earnings document
  // const earningsId = `${driverId}_${period}_${date}`;
  // const earningsDoc = await getDoc(doc(db, 'driverEarnings', earningsId));
  // return earningsDoc.exists() ? earningsDoc.data() as DriverEarnings : null;
  console.log('fetchDriverEarnings:', driverId, period, date);
  return null;
};

/**
 * Subscribes to real-time delivery assignment updates.
 */
export const subscribeToDelivery = (
  deliveryId: string,
  onUpdate: (delivery: DeliveryAssignment) => void,
): (() => void) => {
  // TODO: Set up Firestore real-time listener
  // const unsubscribe = onSnapshot(
  //   doc(db, 'deliveries', deliveryId),
  //   (snapshot) => {
  //     if (snapshot.exists()) {
  //       onUpdate({ id: snapshot.id, ...snapshot.data() } as DeliveryAssignment);
  //     }
  //   },
  // );
  // return unsubscribe;
  console.log('subscribeToDelivery:', deliveryId);
  return () => {
    // cleanup
  };
};

/**
 * Subscribes to available delivery requests in real time.
 */
export const subscribeToAvailableDeliveries = (
  driverLocation: GeoPoint,
  onUpdate: (deliveries: DeliveryAssignment[]) => void,
): (() => void) => {
  // TODO: Set up Firestore real-time listener for pending deliveries
  // const q = query(
  //   collection(db, 'deliveries'),
  //   where('status', '==', 'pending'),
  //   orderBy('createdAt', 'desc'),
  //   limit(20),
  // );
  // const unsubscribe = onSnapshot(q, (snapshot) => {
  //   const deliveries = snapshot.docs.map(doc => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   })) as DeliveryAssignment[];
  //   onUpdate(deliveries);
  // });
  // return unsubscribe;
  console.log('subscribeToAvailableDeliveries:', driverLocation);
  return () => {
    // cleanup
  };
};
