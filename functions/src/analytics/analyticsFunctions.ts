import * as functions from 'firebase-functions';
import { db } from '../index';

export const aggregateDailyAnalytics = functions.pubsub
  .schedule('0 2 * * *')
  .timeZone('America/New_York')
  .onRun(async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfDay = new Date(yesterday);
    endOfDay.setHours(23, 59, 59, 999);

    const ordersSnapshot = await db.collection('orders')
      .where('createdAt', '>=', yesterday)
      .where('createdAt', '<=', endOfDay)
      .get();

    let totalRevenue = 0;
    let totalOrders = 0;
    let completedOrders = 0;
    let cancelledOrders = 0;
    const restaurantMetrics: Record<string, { orders: number; revenue: number }> = {};

    ordersSnapshot.forEach((doc) => {
      const order = doc.data();
      totalOrders++;

      if (order.status === 'completed' || order.status === 'delivered') {
        completedOrders++;
        totalRevenue += order.total?.amount ?? 0;
      }
      if (order.status === 'cancelled') {
        cancelledOrders++;
      }

      if (!restaurantMetrics[order.restaurantId]) {
        restaurantMetrics[order.restaurantId] = { orders: 0, revenue: 0 };
      }
      restaurantMetrics[order.restaurantId].orders++;
      if (order.status === 'completed' || order.status === 'delivered') {
        restaurantMetrics[order.restaurantId].revenue += order.total?.amount ?? 0;
      }
    });

    const dateKey = yesterday.toISOString().split('T')[0];

    await db.collection('analytics').doc(`daily_${dateKey}`).set({
      period: 'daily',
      date: dateKey,
      totalRevenue: { amount: totalRevenue, currency: 'USD' },
      totalOrders,
      completedOrders,
      cancelledOrders,
      averageOrderValue: totalOrders > 0
        ? { amount: totalRevenue / completedOrders, currency: 'USD' }
        : { amount: 0, currency: 'USD' },
      restaurantMetrics,
      generatedAt: new Date(),
    });

    functions.logger.info(`Daily analytics generated for ${dateKey}: ${totalOrders} orders, $${totalRevenue} revenue`);
  });

export const aggregateRestaurantAnalytics = functions.pubsub
  .schedule('0 3 * * *')
  .timeZone('America/New_York')
  .onRun(async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfDay = new Date(yesterday);
    endOfDay.setHours(23, 59, 59, 999);

    const dateKey = yesterday.toISOString().split('T')[0];

    const restaurantsSnapshot = await db.collection('restaurants')
      .where('status', '==', 'active')
      .get();

    for (const restaurantDoc of restaurantsSnapshot.docs) {
      const restaurantId = restaurantDoc.id;

      const ordersSnapshot = await db.collection('orders')
        .where('restaurantId', '==', restaurantId)
        .where('createdAt', '>=', yesterday)
        .where('createdAt', '<=', endOfDay)
        .get();

      let revenue = 0;
      let totalOrders = 0;
      let completedOrders = 0;
      const itemCounts: Record<string, { name: string; quantity: number; revenue: number }> = {};

      ordersSnapshot.forEach((doc) => {
        const order = doc.data();
        totalOrders++;

        if (order.status === 'completed' || order.status === 'delivered') {
          completedOrders++;
          revenue += order.total?.amount ?? 0;

          (order.items ?? []).forEach((item: { menuItemId: string; name: string; quantity: number; totalPrice: { amount: number } }) => {
            if (!itemCounts[item.menuItemId]) {
              itemCounts[item.menuItemId] = { name: item.name, quantity: 0, revenue: 0 };
            }
            itemCounts[item.menuItemId].quantity += item.quantity;
            itemCounts[item.menuItemId].revenue += item.totalPrice?.amount ?? 0;
          });
        }
      });

      const topItems = Object.entries(itemCounts)
        .sort(([, a], [, b]) => b.quantity - a.quantity)
        .slice(0, 10)
        .map(([id, data]) => ({ menuItemId: id, ...data }));

      await db.collection('analytics').doc(`restaurant_${restaurantId}_${dateKey}`).set({
        restaurantId,
        period: dateKey,
        revenue: { amount: revenue, currency: 'USD' },
        totalOrders,
        completedOrders,
        averageOrderValue: completedOrders > 0
          ? { amount: revenue / completedOrders, currency: 'USD' }
          : { amount: 0, currency: 'USD' },
        topSellingItems: topItems,
        generatedAt: new Date(),
      });
    }

    functions.logger.info(`Restaurant analytics generated for ${dateKey}`);
  });
