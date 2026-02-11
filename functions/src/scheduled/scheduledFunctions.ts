import * as functions from 'firebase-functions';
import { db } from '../index';

export const dailyCleanup = functions.pubsub
  .schedule('0 4 * * *')
  .timeZone('America/New_York')
  .onRun(async () => {
    // Clean up old read notifications (older than 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const oldNotifications = await db.collection('notifications')
      .where('isRead', '==', true)
      .where('createdAt', '<', thirtyDaysAgo)
      .limit(500)
      .get();

    const batch = db.batch();
    oldNotifications.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    functions.logger.info(`Daily cleanup: Deleted ${oldNotifications.size} old notifications`);

    // Clean up stale driver locations (offline for more than 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const staleLocations = await db.collection('driverLocations')
      .where('updatedAt', '<', oneDayAgo)
      .get();

    const locationBatch = db.batch();
    staleLocations.docs.forEach((doc) => {
      locationBatch.update(doc.ref, { isOnline: false });
    });
    await locationBatch.commit();

    functions.logger.info(`Daily cleanup: Set ${staleLocations.size} stale driver locations to offline`);
  });

export const generateDailyReports = functions.pubsub
  .schedule('0 6 * * *')
  .timeZone('America/New_York')
  .onRun(async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateKey = yesterday.toISOString().split('T')[0];

    // Check if daily analytics exist
    const analyticsDoc = await db.collection('analytics').doc(`daily_${dateKey}`).get();

    if (!analyticsDoc.exists) {
      functions.logger.warn(`Daily analytics for ${dateKey} not found, skipping report generation`);
      return;
    }

    const analytics = analyticsDoc.data()!;

    // Get active subscriptions count
    const activeSubscriptions = await db.collection('subscriptions')
      .where('status', '==', 'active')
      .get();

    // Get new leads count
    const newLeads = await db.collection('leads')
      .where('createdAt', '>=', yesterday)
      .where('status', '==', 'new')
      .get();

    await db.collection('analytics').doc(`report_${dateKey}`).set({
      type: 'daily_report',
      date: dateKey,
      metrics: {
        totalOrders: analytics.totalOrders,
        totalRevenue: analytics.totalRevenue,
        averageOrderValue: analytics.averageOrderValue,
        activeSubscriptions: activeSubscriptions.size,
        newLeads: newLeads.size,
      },
      generatedAt: new Date(),
    });

    functions.logger.info(`Daily report generated for ${dateKey}`);
  });
