import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import DashboardPage from '../../features/dashboard/DashboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '', // Rota vazia significa que renderiza no '/'
        element: <DashboardPage />,
      },
      {
        path: 'customers',
        element: <div>Página de Clientes (Em breve)</div>,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}