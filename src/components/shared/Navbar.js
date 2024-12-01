'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import MobileMenu from './MobileMenu'
import gsap from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'

import { FiMenu as Icon } from 'react-icons/fi'

import { FaUserCircle } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

const Navbar = ({ setter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const refMobile = useRef(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = window.localStorage.getItem('selConnect')
      if (!auth) {
        // window.location.href = '/auth/login'
        return
      } else {
        setAuthenticated(true)
        if (auth) {
          const parsed = JSON.parse(auth)
          setUser(parsed)
        }
      }
    }

    // Hide the mobile menu at the first load
    gsap.set(refMobile.current, { xPercent: -130 })
  }, [])

  const openMenu = () => {
    setIsMenuOpen(true)
    gsap.to(refMobile.current, {
      xPercent: 0,
      duration: 1.2,
      ease: 'power2.out',
    })
  }

  const closeMenu = async () => {
    await gsap.to(refMobile.current, {
      xPercent: -100,
      duration: 1.2,
      ease: 'power2.out',
    })
    setIsMenuOpen(false)
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
      <div className="z-50   px-4 md:px-10 py-0 mx-auto flex flex-row justify-between">
        <Link href="/#" className="font-semibold text-2xl flex items-center">
          <h1 className="text-2xl text_color text-secondaryText py-1 font-semibold">
            SEL Connect
          </h1>
        </Link>
        <ul className="flex-row items-center gap-9 text-xs font-semibold text_color text-secondaryText hidden md:flex">
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
              href="/user/search"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              href="/user/offer"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Offer
            </Link>
          </li>
          <li>
            <Link
              href="/user/notification"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Notification
            </Link>
          </li>
          <li>
            <Link
              href="/user/event"
              onMouseEnter={handleMenuItemHover}
              onMouseLeave={handleMenuItemLeave}
            >
              Event
            </Link>
          </li>
          <li>
            <Link
              href="/user/interior-design"
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

        <MobileMenu ref={refMobile} closeMenu={closeMenu} isOpen={isMenuOpen} />
      </div>
    </div>
  )
}

export default Navbar
