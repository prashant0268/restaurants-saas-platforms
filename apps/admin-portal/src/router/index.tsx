import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { RestaurantsPage } from '../pages/RestaurantsPage';
import { RestaurantDetailPage } from '../pages/RestaurantDetailPage';
import { UsersPage } from '../pages/UsersPage';
import { DriversPage } from '../pages/DriversPage';
import { OrdersPage } from '../pages/OrdersPage';
import { OrderDetailPage } from '../pages/OrderDetailPage';
import { FinancialPage } from '../pages/FinancialPage';
import { ContentPage } from '../pages/ContentPage';
import { SupportPage } from '../pages/SupportPage';
import { SupportDetailPage } from '../pages/SupportDetailPage';
import { SettingsPage } from '../pages/SettingsPage';
import { SystemHealthPage } from '../pages/SystemHealthPage';
import { LoginPage } from '../pages/LoginPage';
import { AppLayout } from '../App';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'restaurants',
        element: <RestaurantsPage />,
      },
      {
        path: 'restaurants/:id',
        element: <RestaurantDetailPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'drivers',
        element: <DriversPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'orders/:id',
        element: <OrderDetailPage />,
      },
      {
        path: 'financial',
        element: <FinancialPage />,
      },
      {
        path: 'content',
        element: <ContentPage />,
      },
      {
        path: 'support',
        element: <SupportPage />,
      },
      {
        path: 'support/:id',
        element: <SupportDetailPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'system-health',
        element: <SystemHealthPage />,
      },
    ],
  },
]);
