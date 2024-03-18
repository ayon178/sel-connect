'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import MobileMenu from './MobileMenu'
import gsap from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'

import { FaUserCircle } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

const Navbar = () => {
  const refMobile = useRef(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    gsap.from(refMobile.current, {
      xPercent: -100,
    })

    if (typeof window !== 'undefined') {
      const auth = window.localStorage.getItem('isAuthenticated')
      if (!auth) {
        window.location.href = '/auth/login'
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

  return (
    <div
      id="navbar"
      className="bg-primary shadow-md z-50 p-2 sticky top-0 w-screen"
    >
      <div className="z-50 container  px-4 md:px-10 py-0 mx-auto flex flex-row justify-between">
        <Link href="/#" className="font-semibold text-2xl flex items-center">
          {/* <FaHospitalAlt className="text-4xl mr-2" />
        <div className="flex flex-col">
          <h1 className="inline-block text-[.6rem] font-extrabold">
            The Royal
          </h1>
          <h1 className="inline-block text-[.6rem] -my-5 font-extrabold">
            Melbourne
          </h1>
          <h1 className="inline-block text-[.6rem] font-extrabold">Hospital</h1>
        </div> */}
          {/* <Image
            src={logo}
            alt="Royal Melbourne Hospital"
            width={40}
            height={40}
            className="py-1"
          /> */}
          <h1 className="text-2xl text_color text-secondaryText py-1 font-semibold">
            SEL Connect
          </h1>
        </Link>
        <ul className="flex-row items-center gap-9 text-sm font-semibold text_color text-secondaryText hidden md:flex">
          <li>
            <Link
              href="/#"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              href="/interior-offer"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Offer
            </Link>
          </li>
          <li>
            <Link
              href="/notification"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Notification
            </Link>
          </li>
          <li>
            <Link
              href="/event"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Event
            </Link>
          </li>
          <li>
            <Link
              href="/interior-design"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Interior Design
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
        </ul>
        <BiMenuAltRight
          className="text-primaryText text-4xl md:hidden"
          onClick={openMenu}
        />

        <MobileMenu ref={refMobile} closeMenu={closeMenu} />
      </div>
    </div>
  )
}

export default Navbar
