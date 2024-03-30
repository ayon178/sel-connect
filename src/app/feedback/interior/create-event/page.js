'use client'

import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import Navbar from '@/components/shared/Navbar'
import CreateEventComponent from '@/components/feedback/interior/CreateEventComponent'

const CreateEvent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingStartTime, setLoadingStartTime] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authenticated = window.localStorage.getItem('isAuthenticated')
      if (!authenticated) {
        window.location.href = '/auth/login'
        return
      }

      const navbar = document.querySelector('#navbar')
      const text = document.querySelectorAll('.text_color')
      const button = document.querySelectorAll('.register_button')
      const timeline = gsap.timeline({ paused: true })

      timeline.to(navbar, {
        backdropFilter: 'blur(10px)',
        duration: 0.1,
        ease: 'power3.inOut',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 0,
        paddingBottom: '.8rem',
        paddingTop: '.8rem',
      })

      timeline.to(text, {
        color: '#1F2937',
        ease: 'power3.inOut',
      })

      timeline.to(button, {
        backgroundColor: '#732318',
        color: '#fff',
        ease: 'power3.inOut',
      })

      setLoadingStartTime(performance.now())
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      const scrollListener = () => {
        if (window.scrollY === 0) {
          timeline.reverse()
        } else {
          timeline.play()
        }
      }

      window.addEventListener('scroll', scrollListener)

      return () => {
        window.removeEventListener('scroll', scrollListener)
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const loadingEndTime = performance.now()
      const loadingTime = loadingEndTime - loadingStartTime
      console.log(`Loading time: ${loadingTime} ms`)
    }
  }, [isLoading, loadingStartTime])

  return (
    <>
      <Navbar />
      <CreateEventComponent />
    </>
  )
}

export default CreateEvent
