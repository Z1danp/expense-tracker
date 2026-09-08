import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import AppShell from '../layout/AppShell';
import Dashboard from '../features/dashboard/pages/Dashboard';
import Actions from '../features/actions/pages/Actions';
import Report from '../features/report/pages/Report';
import Logs from '../features/log/pages/Logs';
import Config from '../features/config/pages/Config';

export const router = createBrowserRouter([
  // rute auth
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
//   route utama aplikasi
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'actions', element: <Actions /> },
      { path: 'report', element: <Report /> },
      { path: 'look', element: <Logs /> },
      { path: 'config', element: <Config /> },
    ],
  },
]);
