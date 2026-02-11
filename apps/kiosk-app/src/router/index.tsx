import { createBrowserRouter } from 'react-router-dom';
import { KioskLayout } from '../components/layout/KioskLayout';
import { IdleScreen } from '../pages/IdleScreen';
import { MenuPage } from '../pages/MenuPage';
import { ItemDetailPage } from '../pages/ItemDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <KioskLayout />,
    children: [
      {
        index: true,
        element: <IdleScreen />,
      },
      {
        path: 'menu',
        element: <MenuPage />,
      },
      {
        path: 'item/:itemId',
        element: <ItemDetailPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'confirmation/:orderNumber',
        element: <ConfirmationPage />,
      },
    ],
  },
]);
