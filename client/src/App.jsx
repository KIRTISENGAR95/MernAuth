import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EmailVerify from './pages/EmailVerify'
import Home from './pages/home.jsx'
import Login from './pages/Login.jsx'
// import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        {/* <Route path='/reset-password' element={<ResetPassword/>}/> */}
      </Routes>
    </div>
  )
}

export default App