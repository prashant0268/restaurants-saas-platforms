import * as functions from 'firebase-functions';
import { db } from '../index';

// Placeholder for payment processing - integrate with Stripe/Square in production
export const processPayment = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { orderId, paymentMethod, amount } = data;

  const orderRef = db.collection('orders').doc(orderId);
  const order = await orderRef.get();

  if (!order.exists) {
    throw new functions.https.HttpsError('not-found', 'Order not found');
  }

  // TODO: Integrate with Stripe/Square payment gateway
  // For now, simulate successful payment
  const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  await orderRef.update({
    'payment.status': 'captured',
    'payment.transactionId': transactionId,
    'payment.paidAt': new Date(),
    updatedAt: new Date(),
  });

  functions.logger.info(`Payment processed for order ${orderId}: ${transactionId}`);
  return { success: true, transactionId };
});

export const processRefund = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { orderId, amount, reason } = data;

  const orderRef = db.collection('orders').doc(orderId);
  const order = await orderRef.get();

  if (!order.exists) {
    throw new functions.https.HttpsError('not-found', 'Order not found');
  }

  const orderData = order.data()!;
  if (orderData.payment?.status !== 'captured') {
    throw new functions.https.HttpsError('failed-precondition', 'Payment has not been captured');
  }

  // TODO: Process refund through payment gateway
  const refundId = `ref_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  await orderRef.update({
    'payment.status': 'refunded',
    'payment.refundedAt': new Date(),
    'payment.refundAmount': amount ?? orderData.total,
    status: 'refunded',
    updatedAt: new Date(),
  });

  functions.logger.info(`Refund processed for order ${orderId}: ${refundId}`);
  return { success: true, refundId };
});
