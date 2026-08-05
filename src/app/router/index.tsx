import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginForm from '../../components/authentication/LoginForm';
import DashboardPage from '../../features/dashboard/DashboardPage';
import KanbanPage from '../../features/kanban/KanbanPage';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import ProtectedRoute from '../../routes/ProtectedRoute';
import { useTheme } from '../../hooks/useTheme';

// Layout Raiz: Mantém o tema sincronizado em TODAS as telas (Login, Dashboard, etc.)
function RootLayout() {
  useTheme();
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: '',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <DashboardPage />,
          },
          {
            path: 'customers',
            element: <div>Página de Clientes (Em breve)</div>,
          },
          {
            path: 'kanban',
            element: <KanbanPage />,
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}