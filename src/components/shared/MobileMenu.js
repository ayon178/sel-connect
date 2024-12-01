'use client'

import gsap from 'gsap'
import Link from 'next/link'
import React, { forwardRef } from 'react'
import { IoMdClose } from 'react-icons/io'

const MobileMenu = forwardRef((props, ref) => {
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
      className={`h-screen bg-primary w-screen absolute top-0 left-0 z-50 md:hidden ${
        props.isOpen ? 'block' : 'hidden'
      }`}
      ref={ref}
    >
      <ul className="flex flex-col items-center gap-6 text-primaryText w-full h-full justify-center">
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
            href="/offer"
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
        <li>
          <button className="bg-white text-primary font-semibold px-3 py-1 rounded-md">
            Log Out
          </button>
        </li>
      </ul>
      <IoMdClose
        className="text-primaryText absolute top-5 right-4 text-3xl"
        onClick={props.closeMenu}
      />
    </div>
  )
})

MobileMenu.displayName = 'MobileMenu'

export default MobileMenu
