import * as functions from 'firebase-functions';
import { db } from '../index';

export const createOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { restaurantId, items, type, deliveryAddress, specialInstructions, paymentMethod, tip } = data;

  const orderNumber = generateOrderNumber();

  const restaurant = await db.collection('restaurants').doc(restaurantId).get();
  if (!restaurant.exists) {
    throw new functions.https.HttpsError('not-found', 'Restaurant not found');
  }
  const restaurantData = restaurant.data()!;

  const orderRef = db.collection('orders').doc();
  const order = {
    id: orderRef.id,
    orderNumber,
    restaurantId,
    restaurantName: restaurantData.name,
    customerId: context.auth.uid,
    customerName: context.auth.token.name ?? '',
    type,
    status: 'pending',
    items,
    deliveryAddress: deliveryAddress ?? null,
    specialInstructions: specialInstructions ?? '',
    payment: {
      method: paymentMethod,
      status: 'pending',
    },
    tip: tip ?? { amount: 0, currency: 'USD' },
    statusHistory: [{
      status: 'pending',
      changedAt: new Date(),
      changedBy: context.auth.uid,
    }],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await orderRef.set(order);

  functions.logger.info(`Order ${orderNumber} created for restaurant ${restaurantId}`);
  return { orderId: orderRef.id, orderNumber };
});

export const updateOrderStatus = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { orderId, status, note } = data;

  const orderRef = db.collection('orders').doc(orderId);
  const order = await orderRef.get();

  if (!order.exists) {
    throw new functions.https.HttpsError('not-found', 'Order not found');
  }

  const statusChange = {
    status,
    changedAt: new Date(),
    changedBy: context.auth.uid,
    note: note ?? '',
  };

  await orderRef.update({
    status,
    statusHistory: [...(order.data()!.statusHistory ?? []), statusChange],
    updatedAt: new Date(),
    ...(status === 'completed' ? { completedAt: new Date() } : {}),
    ...(status === 'cancelled' ? { cancelledAt: new Date(), cancellationReason: note } : {}),
  });

  functions.logger.info(`Order ${orderId} status updated to ${status}`);
  return { success: true };
});

export const cancelOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { orderId, reason } = data;
  const orderRef = db.collection('orders').doc(orderId);
  const order = await orderRef.get();

  if (!order.exists) {
    throw new functions.https.HttpsError('not-found', 'Order not found');
  }

  const orderData = order.data()!;
  if (!['pending', 'confirmed'].includes(orderData.status)) {
    throw new functions.https.HttpsError('failed-precondition', 'Order cannot be cancelled at this stage');
  }

  await orderRef.update({
    status: 'cancelled',
    cancelledAt: new Date(),
    cancellationReason: reason ?? '',
    statusHistory: [...(orderData.statusHistory ?? []), {
      status: 'cancelled',
      changedAt: new Date(),
      changedBy: context.auth.uid,
      note: reason ?? '',
    }],
    updatedAt: new Date(),
  });

  functions.logger.info(`Order ${orderId} cancelled`);
  return { success: true };
});

const generateOrderNumber = (): string => {
  const prefix = 'ORD';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};
