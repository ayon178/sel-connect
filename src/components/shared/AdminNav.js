'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import gsap from 'gsap'
import Link from 'next/link'
// import Image from 'next/image'
// import logo from '../../assets/logo.png'

import { FiMenu as Icon } from 'react-icons/fi'

import { FaUserCircle } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import AdminMobileMenu from './AdminMobileMenu'
import { getDepartmentByType } from '@/utils/constant'
import { useRouter } from 'next/navigation'
import { getStorage } from '@/functions/api'
import toast from 'react-hot-toast'

const AdminNav = ({ setter }) => {
  const refMobile = useRef(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    gsap.from(refMobile.current, {
      xPercent: -130,
    })

    if (typeof window !== 'undefined') {
      const auth = window.localStorage.getItem('selConnect')
      if (!auth) {
        // window.location.href = '/auth/login'
        return
      } else {
        setAuthenticated(true)
      }
    }
  }, [])

  const openMenu = () => {
    gsap.to(refMobile.current, {
      xPercent: 0,
      duration: 1.2,
      ease: 'power2.out',
    })
  }

  const closeMenu = () => {
    gsap.to(refMobile.current, {
      xPercent: -100,
      duration: 1.2,
      ease: 'power2.out',
    })
  }

  const handleMenuItemHover = event => {
    // Create a unique hover animation using GSAP
    gsap.to(event.target, {
      opacity: 0.8, // Reduce opacity on hover
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMenuItemLeave = event => {
    // Restore the menu item on mouse leave
    gsap.to(event.target, {
      opacity: 1, // Restore original opacity
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const [department, setDepartment] = useState('')
  const router = useRouter()

  const getDept = () => {
    const user = getStorage('selConnect')
    if (!user) {
      toast.error('Please login')
      router.push('/auth/login')
      return
    }
    const parsedUser = JSON.parse(user)
    if (parsedUser.role !== 'admin') {
      toast.error('Please login as admin to view this page')
      router.push('/auth/login')
      return
    }
    const dept = getDepartmentByType(parsedUser.type)
    setDepartment(dept)
  }

  useEffect(() => {
    getDept()
  }, [])

  function formatDepartmentName(name) {
    return name
      .toLowerCase() // Convert the whole string to lowercase
      .replace(/-/g, ' ') // Replace all hyphens with spaces
      .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
  }

  return (
    <div id="navbar" className="bg-[#FFDED7] shadow-md z-50 p-2 sticky top-0 ">
      <div className="z-50  px-4 md:px-10 py-0 mx-auto flex flex-row justify-between">
        <button
          className="text-4xl flex text-white md:hidden"
          onClick={() => {
            setter(oldVal => !oldVal)
          }}
        >
          <Icon />
        </button>

        <Link
          href="/admin"
          className="font-semibold text-2xl flex items-center"
        >
          <h1 className="text-lg text_color text-primary  font-semibold">
            Admin Console
          </h1>
        </Link>

        <h1 className="text-lg text_color text-primary font-semibold hidden md:flex">
          {formatDepartmentName(department)}
        </h1>
        {/* <ul className="flex-row items-center gap-9 text-xs font-semibold text_color text-primary hidden md:flex">
          <li>
            <Link
              href="/admin"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Home
            </Link>
          </li>

          {authenticated ? (
            <li>
              <FaUserCircle size={25} className="cursor-pointer" />
            </li>
          ) : (
            <li>
              <button className="bg-white text-primary px-3 py-2 rounded-md register_button ">
                Login
              </button>
            </li>
          )}

          <li>
            <HiDotsVertical size={25} className="cursor-pointer" s />
          </li>
        </ul> */}
        <BiMenuAltRight
          className="text-primaryText text-4xl md:hidden"
          onClick={openMenu}
        />

        <AdminMobileMenu ref={refMobile} closeMenu={closeMenu} />
      </div>
    </div>
  )
}

export default AdminNav
