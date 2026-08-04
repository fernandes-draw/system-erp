import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import DashboardPage from '../../features/dashboard/DashboardPage';
import KanbanPage from '../../features/kanban/KanbanPage'; // Importe a nova página
import Login from '../../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
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
        path: 'kanban', // Adiciona o caminho da URL /kanban
        element: <KanbanPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}