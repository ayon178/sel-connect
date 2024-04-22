'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BiSolidLockOpen } from 'react-icons/bi'

import loginBg from '../../../assets/login_bg.jpg'

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

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
    } else if (
      loginData.email !== 'demo@gmail.com' ||
      loginData.password !== '123456'
    ) {
      toast.error('Wrong email or password')
      setLoading(false)
      return
    }

    try {
      // Simulate successful login by setting a flag in localStorage
      setTimeout(() => {
        setLoading(false)
        window.localStorage.setItem('isAuthenticated', true)
        window.location.href = '/'
      }, 3000)
    } catch (error) {
      console.error('Error logging in:', error)
      toast.error('An error occurred. Please try again later.')
    }
  }

  return (
    <div
      style={{
        // backgroundImage: ` url(${loginBg.src})`,
        backgroundSize: 'cover',
        backdropFilter: 'blur(10px)',
        backgroundPosition: 'top ',
        backgroundRepeat: 'no-repeat',
      }}
      className=" min-h-screen flex items-center justify-center"
    >
      {/* LockOpen Icon */}
      <div
        className="relative bg-opacity-10 rounded-lg p-8 w-96"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: '8px',
        }}
      >
        <BiSolidLockOpen
          size={62}
          color="#732318"
          className="mx-auto bg-white rounded-full p-2 border-4 border-gray-400 absolute -top-8 left-1/2 transform -translate-x-1/2"
        />

        <h1 className="text-3xl font-bold text-center text-white my-6">
          Login to Continue
        </h1>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full px-4 py-2 rounded-lg border border-white bg-opacity-20  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-white bg-opacity-20  placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center text-white">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-white font-bold">
            Forgot password?
          </a>
        </div>
        <button
          onClick={handleLogin}
          className={`w-full bg-primary hover:bg-[#72190d] text-white transition-all delay-75  rounded-lg focus:outline-none py-2 ${
            loading ? 'flex justify-center items-center' : ''
          }`}
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
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
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            'Login'
          )}
        </button>
      </div>
    </div>
  )
}
