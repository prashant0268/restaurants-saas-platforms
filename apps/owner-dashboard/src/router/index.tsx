import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { OrdersPage } from '../pages/OrdersPage';
import { OrderDetailPage } from '../pages/OrderDetailPage';
import { MenuPage } from '../pages/MenuPage';
import { EditMenuItemPage } from '../pages/EditMenuItemPage';
import { ReservationsPage } from '../pages/ReservationsPage';
import { CustomersPage } from '../pages/CustomersPage';
import { StaffPage } from '../pages/StaffPage';
import { ReviewsPage } from '../pages/ReviewsPage';
import { MarketingPage } from '../pages/MarketingPage';
import { FinancialPage } from '../pages/FinancialPage';
import { SettingsPage } from '../pages/SettingsPage';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import { LoginPage } from '../pages/LoginPage';
import { AppLayout } from '../components/layout/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:orderId', element: <OrderDetailPage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'menu/edit/:itemId', element: <EditMenuItemPage /> },
      { path: 'menu/new', element: <EditMenuItemPage /> },
      { path: 'reservations', element: <ReservationsPage /> },
      { path: 'customers', element: <CustomersPage /> },
      { path: 'staff', element: <StaffPage /> },
      { path: 'reviews', element: <ReviewsPage /> },
      { path: 'marketing', element: <MarketingPage /> },
      { path: 'financial', element: <FinancialPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'subscription', element: <SubscriptionPage /> },
    ],
  },
]);
