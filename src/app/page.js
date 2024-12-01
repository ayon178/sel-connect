'use client'

import Service from '@/components/home/Service'
import Loader from '@/components/shared/Loader'
import Navbar from '@/components/shared/Navbar'
import MainSlider from '@/components/slider/MainSlider'
// import gsap from 'gsap'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(true)
      const authenticated = window.localStorage.getItem('selConnect')
      if (!authenticated) {
        window.location.href = '/auth/login'
        return
      }
      const parsed = JSON.parse(authenticated)

      if (parsed.role === 'admin') {
        if (parsed.type === '2') {
          window.location.href = '/admin/sales'
        } else if (parsed.type === '3') {
          window.location.href = '/admin/marketing'
        } else if (parsed.type === '4') {
          window.location.href = '/admin/construction'
        } else if (parsed.type === '5') {
          window.location.href = '/admin/accounts'
        } else if (parsed.type === '6') {
          window.location.href = '/admin/after-sales'
        } else if (parsed.type === '8') {
          window.location.href = '/admin/legal'
        } else if (parsed.type === '7') {
          window.location.href = '/admin/interior'
        } else if (parsed.type === '9') {
          window.location.href = '/admin/hr'
        } else if (parsed.type === '10') {
          window.location.href = '/admin/staff'
        }
        setIsLoading(false)
      }
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <MainSlider />
          <main>
            <Service />
          </main>
        </>
      )}
    </>
  )
}
