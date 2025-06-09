
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

function App() {

  const { authUser } = useContext(AuthContext);
  return (
    <>
       <div className="bg-[url('/bgImage.svg')] bg-contain">
       <Toaster/>
        <Routes>
          <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
          <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
        </Routes>
       </div>
    </>
  )
}

export default App
