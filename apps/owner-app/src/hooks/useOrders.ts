import { useEffect, useCallback } from 'react';
import { useOrderStore, OrderStatus } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook to manage live orders with real-time updates.
 * Subscribes to Firestore order changes for the restaurant.
 */
export const useOrders = () => {
  const {
    liveOrders,
    orderHistory,
    selectedOrder,
    isLoading,
    error,
    newOrdersCount,
    preparingOrdersCount,
    readyOrdersCount,
    setSelectedOrder,
    acceptOrder,
    rejectOrder,
    markPreparing,
    markReady,
    markCompleted,
    fetchLiveOrders,
    fetchOrderHistory,
  } = useOrderStore();

  const { user } = useAuthStore();

  // Subscribe to live orders on mount
  useEffect(() => {
    if (user?.restaurantId) {
      fetchLiveOrders(user.restaurantId);
    }

    // TODO: Set up Firestore onSnapshot listener for real-time updates
    // const unsubscribe = onSnapshot(
    //   query(
    //     collection(db, 'orders'),
    //     where('restaurantId', '==', user.restaurantId),
    //     where('status', 'in', ['pending', 'accepted', 'preparing', 'ready']),
    //     orderBy('createdAt', 'desc'),
    //   ),
    //   (snapshot) => {
    //     const orders = snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setLiveOrders(orders);
    //   },
    // );
    //
    // return () => unsubscribe();
  }, [user?.restaurantId, fetchLiveOrders]);

  const loadOrderHistory = useCallback(
    (period?: string) => {
      if (user?.restaurantId) {
        fetchOrderHistory(user.restaurantId, period);
      }
    },
    [user?.restaurantId, fetchOrderHistory],
  );

  const getOrdersByStatus = useCallback(
    (status: OrderStatus) => {
      return liveOrders.filter((order) => order.status === status);
    },
    [liveOrders],
  );

  return {
    liveOrders,
    orderHistory,
    selectedOrder,
    isLoading,
    error,
    newOrdersCount: newOrdersCount(),
    preparingOrdersCount: preparingOrdersCount(),
    readyOrdersCount: readyOrdersCount(),
    setSelectedOrder,
    acceptOrder,
    rejectOrder,
    markPreparing,
    markReady,
    markCompleted,
    loadOrderHistory,
    getOrdersByStatus,
  };
};
