import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { privacyPolicy } from '~/router/constants/crumbs'

const CookiePolicy = lazy(() => import('~/pages/cookie-policy/CookiePolicy'))
const PhotoStepTestPage = lazy(
  () => import('~/pages/test/photo-step-test/PhotoStepTestPage')
)

export const guestRouter = (
  <>
    <Route
      element={<CookiePolicy />}
      handle={{
        crumb: privacyPolicy
      }}
      path={guestRoutes.privacyPolicy.route}
    />
    <Route
      element={<PhotoStepTestPage />}
      path={guestRoutes.test.photoStep.route}
    />
  </>
)
