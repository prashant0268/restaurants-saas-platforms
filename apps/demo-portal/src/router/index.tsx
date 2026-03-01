import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CustomerAppPage } from '../pages/CustomerAppPage';
import { OwnerDashboardPage } from '../pages/OwnerDashboardPage';
import { SocialMediaPage } from '../pages/SocialMediaPage';
import { MenuBuilderPage } from '../pages/MenuBuilderPage';
import { FireTVPage } from '../pages/FireTVPage';
import { OtherProductsPage } from '../pages/OtherProductsPage';
import { PricingPage } from '../pages/PricingPage';
import { ContractPage } from '../pages/ContractPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { CustomerPitchPage } from '../pages/CustomerPitchPage';

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
        path: 'customer-pitch',
        element: <CustomerPitchPage />,
      },
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'customer-app',
        element: <CustomerAppPage />,
      },
      {
        path: 'owner-dashboard',
        element: <OwnerDashboardPage />,
      },
      {
        path: 'social-media',
        element: <SocialMediaPage />,
      },
      {
        path: 'menu-builder',
        element: <MenuBuilderPage />,
      },
      {
        path: 'fire-tv',
        element: <FireTVPage />,
      },
      {
        path: 'other-products',
        element: <OtherProductsPage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      {
        path: 'contract',
        element: <ContractPage />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
      {
        path: 'confirmation',
        element: <ConfirmationPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
