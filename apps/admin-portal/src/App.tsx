import { Outlet, RouterProvider } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { router } from './router';

export const AppLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
