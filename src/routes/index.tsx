import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import PageLoading from '@/components/page-loading';

const Login = lazy(() => import('@/pages/login'));
const Home = lazy(() => import('@/pages/home'));

function Routes(): JSX.Element {
  const element = useRoutes([
    { path: '/', element: <Navigate to='/home' /> },
    { path: 'login', element: <Login /> },
    { path: 'home', element: <Home /> },
  ]);

  return <Suspense fallback={<PageLoading />}>{element}</Suspense>;
}

export default Routes;
