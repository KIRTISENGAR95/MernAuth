import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedIn} = useContext(AppContext)
  
  const sendVerificationEmail = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send verification email')
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(backendUrl + '/api/auth/logout')
      if (data.success) {
        setIsLoggedIn(false)
        setUserData(null)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed')
    }
  }

  console.log('User verification status:', userData?.isAccountVerified); // Debug log

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="Logo" className='w-28 sm:w-32'/>

      {userData ?
      <div className='relative'>
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer group'>
          {userData.name[0].toUpperCase()}
          <div className='absolute hidden group-hover:block right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50'>
            <ul className='list-none m-0'>
              {!userData.isAccountVerified && 
                <li onClick={sendVerificationEmail} className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm'>Verify Email</li>
              }
              <li onClick={logout} className='px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm'>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    
    : <button onClick={()=>navigate('/login')}
    className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>
      Login 
      <img src={assets.arrow_icon} alt="Arrow" className='w-4 h-4'/>
    </button>
    }
      
    </div>
  )
}

export default Navbar
