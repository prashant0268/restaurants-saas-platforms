import { createBrowserRouter } from 'react-router-dom';
import { WebsiteLayout } from '../components/layout/WebsiteLayout';
import { HomePage } from '../pages/HomePage';
import { PricingPage } from '../pages/PricingPage';
import { FeaturesPage } from '../pages/FeaturesPage';
import { ContactPage } from '../pages/ContactPage';

export const router = createBrowserRouter([
  {
    element: <WebsiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/features', element: <FeaturesPage /> },
      { path: '/pricing', element: <PricingPage /> },
      { path: '/contact', element: <ContactPage /> },
    ],
  },
]);
