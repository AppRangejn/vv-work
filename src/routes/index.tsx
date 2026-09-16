import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage';
import PartnerPage from '../pages/PartnerPage';
import ContactsPage from '../pages/ContactsPage';
import RouteErrorBoundary from '../components/Common/RouteErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'partners',
        element: <Navigate to="/partners/all" replace />,
      },
      {
        path: 'partners/:slug',
        element: <PartnerPage />,
      },
      {
        path: 'contacts',
        element: <ContactsPage />,
      },
      {
        path: 'контакти',
        element: <Navigate to="/contacts" replace />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);