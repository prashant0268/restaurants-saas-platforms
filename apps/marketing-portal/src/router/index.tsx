import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuthStore } from '../stores/authStore';
import { DashboardPage } from '../pages/DashboardPage';
import { CampaignsPage } from '../pages/CampaignsPage';
import { CampaignBuilderPage } from '../pages/CampaignBuilderPage';
import { CampaignDetailPage } from '../pages/CampaignDetailPage';
import { PromotionsPage } from '../pages/PromotionsPage';
import { PromotionDetailPage } from '../pages/PromotionDetailPage';
import { SegmentsPage } from '../pages/SegmentsPage';
import { ContentCalendarPage } from '../pages/ContentCalendarPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { ABTestingPage } from '../pages/ABTestingPage';
import { AssetLibraryPage } from '../pages/AssetLibraryPage';
import { EmailBuilderPage } from '../pages/EmailBuilderPage';
import { LoginPage } from '../pages/LoginPage';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/campaigns',
        element: <CampaignsPage />,
      },
      {
        path: '/campaigns/new',
        element: <CampaignBuilderPage />,
      },
      {
        path: '/campaigns/:id',
        element: <CampaignDetailPage />,
      },
      {
        path: '/promotions',
        element: <PromotionsPage />,
      },
      {
        path: '/promotions/:id',
        element: <PromotionDetailPage />,
      },
      {
        path: '/segments',
        element: <SegmentsPage />,
      },
      {
        path: '/calendar',
        element: <ContentCalendarPage />,
      },
      {
        path: '/analytics',
        element: <AnalyticsPage />,
      },
      {
        path: '/ab-testing',
        element: <ABTestingPage />,
      },
      {
        path: '/assets',
        element: <AssetLibraryPage />,
      },
      {
        path: '/email-builder',
        element: <EmailBuilderPage />,
      },
    ],
  },
]);
