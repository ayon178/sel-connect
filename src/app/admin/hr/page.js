'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import bgImage from '../../../assets/login_bg.jpg'

const Hr = () => {
  const router = useRouter()

  return (
    <div
      className="flex flex-col items-center justify-center px-5 xl:px-10"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <h1 className="text-2xl xl:text-4xl font-semibold text-slate-600 mb-2 text-center">
        Welcome to SEL Connect Admin Console
      </h1>
      <p className="w-full sm:w-1/2 text-center text-slate-600 font-medium mb-6 xl:mb-10 xl:text-lg">
        Send notification to admin
      </p>
      <button
        onClick={() => router.push('/admin/hr/send-notification')}
        className="bg-slate-300 border-slate-400 shadow-lg text-slate-600 border-[1px] rounded-lg text-xl xl:text-2xl px-4 xl:px-6 py-4 xl:py-4"
      >
        Send Notification
      </button>
    </div>
  )
}

export default Hr
