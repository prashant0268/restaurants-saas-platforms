import { createBrowserRouter, Navigate } from 'react-router-dom';
import { KitchenLayout } from '../components/layout/KitchenLayout';
import { KitchenViewPage } from '../pages/KitchenViewPage';
import { OrderCardPage } from '../pages/OrderCardPage';
import { StationFilterPage } from '../pages/StationFilterPage';
import { SettingsPage } from '../pages/SettingsPage';
import { LoginPage } from '../pages/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <KitchenLayout />,
    children: [
      {
        index: true,
        element: <KitchenViewPage />,
      },
      {
        path: 'order/:orderId',
        element: <OrderCardPage />,
      },
      {
        path: 'stations',
        element: <StationFilterPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
