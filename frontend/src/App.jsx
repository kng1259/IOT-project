import PrimaryLayout from './components/Layout/PrimaryLayout'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/Login/Login'
import RegisterPage from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import ConfigPage from './pages/ConfigPage/ConfigPage'
import ReportPage from './pages/ReportPage/ReportPage'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'

const PrivateRoute = ({ user }) => {
  if (!user) return <Navigate to={'/login'} replace={true} />
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />

      {/* Auth Routes */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      <Route element={<PrivateRoute user={currentUser} />} >
        <Route element={<PrimaryLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/config' element={<ConfigPage />} />
          <Route path='/report' element={<ReportPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App