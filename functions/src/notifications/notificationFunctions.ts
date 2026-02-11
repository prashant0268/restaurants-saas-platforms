import * as functions from 'firebase-functions';
import { db, messaging } from '../index';

export const sendPushNotification = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { userId, title, body, data: notificationData } = data;

  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) {
    throw new functions.https.HttpsError('not-found', 'User not found');
  }

  const user = userDoc.data()!;
  const tokens = user.fcmTokens ?? [];

  if (tokens.length === 0) {
    functions.logger.info(`No FCM tokens for user ${userId}`);
    return { success: false, reason: 'no_tokens' };
  }

  const message = {
    notification: { title, body },
    data: notificationData ?? {},
    tokens,
  };

  const response = await messaging.sendEachForMulticast(message);

  // Clean up invalid tokens
  const invalidTokens: string[] = [];
  response.responses.forEach((resp, idx) => {
    if (!resp.success && resp.error?.code === 'messaging/registration-token-not-registered') {
      invalidTokens.push(tokens[idx]);
    }
  });

  if (invalidTokens.length > 0) {
    const validTokens = tokens.filter((t: string) => !invalidTokens.includes(t));
    await db.collection('users').doc(userId).update({ fcmTokens: validTokens });
  }

  // Save notification record
  await db.collection('notifications').add({
    userId,
    type: notificationData?.type ?? 'system',
    channel: 'push',
    title,
    body,
    isRead: false,
    data: notificationData ?? {},
    createdAt: new Date(),
  });

  functions.logger.info(`Push notification sent to user ${userId}: ${response.successCount} success, ${response.failureCount} failures`);
  return { success: true, sent: response.successCount };
});

export const sendOrderNotification = functions.firestore
  .document('orders/{orderId}')
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status === after.status) return;

    const statusMessages: Record<string, { title: string; body: string }> = {
      confirmed: {
        title: 'Order Confirmed',
        body: `Your order #${after.orderNumber} has been confirmed by ${after.restaurantName}`,
      },
      preparing: {
        title: 'Order Being Prepared',
        body: `${after.restaurantName} is preparing your order #${after.orderNumber}`,
      },
      ready: {
        title: 'Order Ready',
        body: `Your order #${after.orderNumber} is ready for pickup!`,
      },
      out_for_delivery: {
        title: 'Out for Delivery',
        body: `Your order #${after.orderNumber} is on its way!`,
      },
      delivered: {
        title: 'Order Delivered',
        body: `Your order #${after.orderNumber} has been delivered. Enjoy!`,
      },
      cancelled: {
        title: 'Order Cancelled',
        body: `Your order #${after.orderNumber} has been cancelled.`,
      },
    };

    const notification = statusMessages[after.status];
    if (!notification) return;

    // Notify customer
    const userDoc = await db.collection('users').doc(after.customerId).get();
    if (!userDoc.exists) return;

    const user = userDoc.data()!;
    const tokens = user.fcmTokens ?? [];
    if (tokens.length === 0) return;

    await messaging.sendEachForMulticast({
      notification,
      data: {
        type: `order_${after.status}`,
        orderId: change.after.id,
        orderNumber: after.orderNumber,
      },
      tokens,
    });

    // Save notification record
    await db.collection('notifications').add({
      userId: after.customerId,
      type: `order_${after.status}`,
      channel: 'push',
      title: notification.title,
      body: notification.body,
      isRead: false,
      data: { orderId: change.after.id },
      createdAt: new Date(),
    });

    functions.logger.info(`Order notification sent for ${change.after.id}: ${after.status}`);
  });
