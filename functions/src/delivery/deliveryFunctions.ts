import * as functions from 'firebase-functions';
import { db } from '../index';

export const assignDriver = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { orderId, driverId } = data;

  const orderRef = db.collection('orders').doc(orderId);
  const order = await orderRef.get();
  if (!order.exists) {
    throw new functions.https.HttpsError('not-found', 'Order not found');
  }

  const orderData = order.data()!;

  const assignmentRef = db.collection('deliveryAssignments').doc();
  const assignment = {
    id: assignmentRef.id,
    orderId,
    orderNumber: orderData.orderNumber,
    restaurantId: orderData.restaurantId,
    restaurantName: orderData.restaurantName,
    customerId: orderData.customerId,
    customerName: orderData.customerName,
    driverId,
    status: 'assigned',
    statusHistory: [{
      status: 'assigned',
      changedAt: new Date(),
    }],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await assignmentRef.set(assignment);
  await orderRef.update({
    driverId,
    updatedAt: new Date(),
  });

  functions.logger.info(`Driver ${driverId} assigned to order ${orderId}`);
  return { assignmentId: assignmentRef.id };
});

export const updateDeliveryStatus = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { assignmentId, status, location, note } = data;

  const assignmentRef = db.collection('deliveryAssignments').doc(assignmentId);
  const assignment = await assignmentRef.get();

  if (!assignment.exists) {
    throw new functions.https.HttpsError('not-found', 'Delivery assignment not found');
  }

  const assignmentData = assignment.data()!;

  const statusChange = {
    status,
    changedAt: new Date(),
    location: location ?? null,
    note: note ?? '',
  };

  const updates: Record<string, unknown> = {
    status,
    statusHistory: [...(assignmentData.statusHistory ?? []), statusChange],
    updatedAt: new Date(),
  };

  if (status === 'picked_up') updates.actualPickupTime = new Date();
  if (status === 'delivered') updates.actualDeliveryTime = new Date();

  await assignmentRef.update(updates);

  // Sync order status
  if (status === 'picked_up') {
    await db.collection('orders').doc(assignmentData.orderId).update({
      status: 'out_for_delivery',
      updatedAt: new Date(),
    });
  } else if (status === 'delivered') {
    await db.collection('orders').doc(assignmentData.orderId).update({
      status: 'delivered',
      actualDeliveryTime: new Date(),
      updatedAt: new Date(),
    });
  }

  functions.logger.info(`Delivery ${assignmentId} status updated to ${status}`);
  return { success: true };
});

export const updateDriverLocation = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { latitude, longitude, heading, speed } = data;

  await db.collection('driverLocations').doc(context.auth.uid).set({
    driverId: context.auth.uid,
    location: { latitude, longitude },
    heading: heading ?? 0,
    speed: speed ?? 0,
    isOnline: true,
    updatedAt: new Date(),
  }, { merge: true });

  return { success: true };
});
