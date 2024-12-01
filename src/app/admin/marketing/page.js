'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { SiCoinmarketcap } from 'react-icons/si'

import bgImage from '../../../assets/login_bg.jpg'

const cardsData = [
  {
    title: 'Create Offer',
    icon: <SiCoinmarketcap />,
    link: '/admin/marketing/create-offer',
  },
  {
    title: 'Property List',
    icon: <SiCoinmarketcap />,
    link: '/admin/marketing/property-list',
  },
  {
    title: 'Offer List',
    icon: <SiCoinmarketcap />,
    link: '/admin/marketing/offer-list',
  },
  {
    title: 'Property Create',
    icon: <SiCoinmarketcap />,
    link: '/admin/marketing/property-create',
  },
  {
    title: 'PDF View',
    icon: <SiCoinmarketcap />,
    link: '/admin/marketing/pdf-view',
  },
]

const Marketing = () => {
  const router = useRouter()

  const handleCardClick = link => {
    router.push(link)
  }

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center px-5 xl:px-10"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Keep this as is or adjust as needed
        }}
      >
        <div className="flex flex-col items-center justify-center px-5 xl:px-10 mt-3">
          <h1 className="text-2xl xl:text-4xl font-semibold text-slate-600 mb-2 text-center">
            Welcome to SEL Connect Admin Console
          </h1>
          <p className="w-full sm:w-1/2 text-center text-slate-600 font-medium mb-6 xl:mb-10 xl:text-lg">
            Create new client ID for easy after sales services and achieve
            higher client satisfaction
          </p>
          <button
            onClick={() => router.push('/admin/marketing/property-create')}
            className="bg-slate-300 border-slate-400 shadow-lg text-slate-600 border-[1px] rounded-lg text-xl xl:text-2xl px-4 xl:px-6 py-4 xl:py-4"
          >
            Create New Property
          </button>
        </div>
      </div>
    </div>
  )
}

export default Marketing
