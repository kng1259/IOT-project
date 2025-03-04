import LandingPage from '../pages/LandingPage/LandingPage'
import Dashboard from '../pages/Dashboard/Dashboard'
import ConfigPage from '../pages/ConfigPage/ConfigPage'
import ReportPage from '../pages/ReportPage/ReportPage'

import LoginPage from '../pages/Login/Login'
import RegisterPage from '../pages/Register/Register'

const routes = [
  {
    component: LandingPage,
    path: '/',
    layout: 'none'
  },
  {
    component: Dashboard,
    path: '/dashboard',
    layout: 'primary'
  },
  {
    component: ConfigPage,
    path: '/config',
    layout: 'primary'
  },
  {
    component: ReportPage,
    path: '/report',
    layout: 'primary'
  },
  {
    component: LoginPage,
    path: '/login',
    layout: 'none'
  },
  {
    component: RegisterPage,
    path: '/register',
    layout: 'none'
  }
]

export default routes
