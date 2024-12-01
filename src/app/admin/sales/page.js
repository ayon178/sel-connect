'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FaUsers } from 'react-icons/fa'

import bgImage from '../../../assets/login_bg.jpg'

const cardsData = [
  {
    title: 'Current Clients',
    icon: <FaUsers />,
    link: '/admin/sales/current-clients',
  },
  {
    title: 'Create Client ID',
    icon: <FaUsers />,
    link: '/admin/sales/create-client',
  },
  {
    title: 'View Prperty Ads',
    icon: <FaUsers />,
    link: '/admin/sales/view-property-ads',
  },
  {
    title: 'Current Property List',
    icon: <FaUsers />,
    link: '/admin/sales/property-list',
  },
  {
    title: 'HR Notification',
    icon: <FaUsers />,
    link: '/admin/sales/hr-notification',
  },
]

const Sales = () => {
  const router = useRouter()

  const handleCardClick = link => {
    router.push(link)
  }

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
        Create new client ID for easy after sales services and achieve higher
        client satisfaction
      </p>
      <button
        onClick={() => router.push('/admin/sales/create-client')}
        className="bg-slate-300 border-slate-400 shadow-lg text-slate-600 border-[1px] rounded-lg text-xl xl:text-2xl px-4 xl:px-6 py-4 xl:py-4"
      >
        Create New Client
      </button>
    </div>
  )
}

export default Sales
