import { lazy } from 'react'
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import App from '~/App'
import AppContent from '~/containers/app-content/AppContent'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { authRoutes } from '~/router/constants/authRoutes'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { tutorRouter } from '~/router/routes/tutorRouter'
import { errorRouter } from '~/router/routes/errorRouter'
import { studentRouter } from '~/router/routes/studentRouter'
import { guestRouter } from '~/router/routes/guestRouter'
import { authRouter } from '~/router/routes/authRouter'
import { home } from '~/router/constants/crumbs'

const HomeRoute = lazy(() => import('~/router/helpers/HomeRoute'))
const Logout = lazy(() => import('~/pages/logout/Logout'))
const GeneralInfoTest = lazy(
  () => import('~/pages/general-info-test/GeneralInfoTest')
) // TODO: remove this route

export const routerConfig = (
  <Route
    element={<App />}
    errorElement={<Navigate to={errorRoutes.notFound.path} />}
    path={guestRoutes.home.route}
  >
    <Route element={<AppContent />} handle={{ crumb: home }}>
      <Route element={<HomeRoute />} index />
      <Route element={<GeneralInfoTest />} path={'general-info-test'} />{' '}
      {/* TODO: remove this route */}
      {guestRouter}
      {authRouter}
      {tutorRouter}
      {studentRouter}
      <Route path={guestRoutes.error.route}>{errorRouter}</Route>
      <Route element={<Logout />} path={authRoutes.accountMenu.logout.route} />
    </Route>
  </Route>
)

export const router = createBrowserRouter(
  createRoutesFromElements(routerConfig)
)
