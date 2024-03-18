import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import recruiterRoutes from './components/recruiter/RecruiterRoutes';
import applicantRoutes from './components/applicant/ApplicantRoute'
import { JwtLoginForApplicant } from './views/sessions/JwtLoginForApplicant';
import {  JwtRegisterForApplicant } from './views/sessions/JwtRegisterForApplicant';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));


// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));


const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      ...recruiterRoutes,
      ...applicantRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      },
      //childern routes
      {
        path: '/components/applicant/ApplicantRoute',
        element: <applicantRoutes />,
        auth: authRoles.applicant
      },
      {
        path: '/components/recruiter/RecruiterRoutes',
        element: <recruiterRoutes />,
        auth: authRoles.recruiter
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/signinForApplicant', element: <JwtLoginForApplicant/> },
  { path: '/session/signupForApplicant', element: < JwtRegisterForApplicant/> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
