import * as admin from 'firebase-admin';

admin.initializeApp();

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
export const messaging = admin.messaging();

// Auth triggers
export { onUserCreated, onUserDeleted } from './auth/triggers';

// Order functions
export { createOrder, updateOrderStatus, cancelOrder } from './orders/orderFunctions';

// Delivery functions
export { assignDriver, updateDeliveryStatus, updateDriverLocation } from './delivery/deliveryFunctions';

// Notification functions
export { sendPushNotification, sendOrderNotification } from './notifications/notificationFunctions';

// Payment functions
export { processPayment, processRefund } from './payments/paymentFunctions';

// Analytics functions
export { aggregateDailyAnalytics, aggregateRestaurantAnalytics } from './analytics/analyticsFunctions';

// Scheduled functions
export { dailyCleanup, generateDailyReports } from './scheduled/scheduledFunctions';
