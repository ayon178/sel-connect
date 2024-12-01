'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaUser } from 'react-icons/fa6'
import { IoMdLock } from 'react-icons/io'
import { MdAdminPanelSettings } from 'react-icons/md'
import Image from 'next/image'

import loginBg from '../../../assets/login_bg.jpg'
import { login } from '@/functions/api'
import logo from '../../../assets/logo.jpg'

export default function Login() {
  const [role, setRole] = useState('user')
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = value => {
    setRole(value)
    setIsOpen(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = async () => {
    setLoading(true)
    if (loginData.email === '' || loginData.password === '') {
      toast.error('Please fill in all fields')
      setLoading(false)
      return
    } else {
      const user = await login({ ...loginData, role })

      if (user.error) {
        toast.error(user.error)
        setLoading(false)
        return
      }
      setUserData(user.user)
      window.localStorage.setItem(
        'selConnect',
        JSON.stringify({
          user_id: user.user.user_id,
          role: role,
          type: user.user.type,
          sub: user.user.sub,
        })
      )

      setTimeout(() => {
        if (role === 'admin') {
          if (user.user.type === '2') {
            window.location.href = '/admin/sales'
          } else if (user.user.type === '3') {
            window.location.href = '/admin/marketing'
          } else if (user.user.type === '4') {
            window.location.href = '/admin/construction'
          } else if (user.user.type === '5') {
            window.location.href = '/admin/accounts'
          } else if (user.user.type === '6') {
            window.location.href = '/admin/after-sales'
          } else if (user.user.type === '8') {
            window.location.href = '/admin/legal'
          } else if (user.user.type === '7') {
            window.location.href = '/admin/interior'
          } else if (user.user.type === '9') {
            window.location.href = '/admin/hr'
          } else if (user.user.type === '10') {
            window.location.href = '/admin/staff'
          } else {
            toast.error('The interface is not available for this user type')
            setLoading(false)
            window.localStorage.removeItem('selConnect')
          }
        } else {
          window.location.href = '/'
        }
      }, 3000)
    }
  }

  return (
    <div
      style={{
        backgroundImage: ` url(${loginBg.src})`,
        backgroundSize: 'cover',
        backdropFilter: 'blur(10px)',
        backgroundPosition: 'top ',
        backgroundRepeat: 'no-repeat',
      }}
      className=" min-h-screen flex items-center justify-center px-5"
    >
      {/* LockOpen Icon */}
      <div
        className="relative bg-opacity-10 shadow-lg border-slate-100 border-[1px] rounded-lg p-8 w-96 xl:w-[30rem]"
        style={{
          backgroundColor: 'white',
          backdropFilter: '8px',
        }}
      >
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="mx-auto mb-4 xl:w-[120px]"
        />
        <div className="mb-4">
          <label htmlFor="email" className="flex items-center gap-2 mb-2">
            <FaUser className="text-primary xl:text-md" />
            <span className="text-primary text-sm xl:text-md">User Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-opacity-20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary xl:py-3 xl:text-md"
            onChange={handleChange}
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="flex items-center gap-2 mb-2">
            <IoMdLock className="text-primary xl:text-md" />
            <span className="text-primary text-sm xl:text-md">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-opacity-20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary xl:py-3 xl:text-md"
            onChange={handleChange}
          />
        </div>

        {/* Role selection dropdown */}
        <div className="mb-4 relative">
          <label htmlFor="role" className="flex items-center gap-2 mb-2">
            <MdAdminPanelSettings className="text-primary xl:text-md" />
            <span className="text-primary text-sm xl:text-md">
              Please select your user type here
            </span>
          </label>
          <div
            className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary xl:py-3 xl:text-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {role === 'user' ? 'User' : 'Admin'}
          </div>
          {isOpen && (
            <ul className="absolute left-0 w-full mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-20">
              <li
                className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                onClick={() => handleSelect('user')}
              >
                User
              </li>
              <li
                className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                onClick={() => handleSelect('admin')}
              >
                Admin
              </li>
            </ul>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogin}
            className={`w-full bg-primary hover:bg-[#72190d] text-white transition-all delay-75 rounded-lg focus:outline-none py-2 md:w-2/3 xl:py-3 xl:text-md ${
              loading ? 'flex justify-center items-center' : ''
            }`}
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
