'use client'

import gsap from 'gsap'
import Link from 'next/link'
import React, { forwardRef } from 'react'
import { IoMdClose } from 'react-icons/io'

const AdminMobileMenu = forwardRef((props, ref) => {
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
      className="h-screen bg-primary w-screen absolute top-0 left-0 z-20 md:hidden"
      ref={ref}
    >
      <ul className="flex flex-col items-center gap-6 text-primaryText w-full h-full justify-center">
        <li>
          <Link
            href="/"
            onMouseEnter={handleMenuItemHover}
            onMouseLeave={handleMenuItemLeave}
          >
            Home
          </Link>
        </li>

        <li>
          <button className="bg-white text-primary font-semibold px-3 py-1 rounded-md">
            Register Now
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

AdminMobileMenu.displayName = 'AdminMobileMenu'

export default AdminMobileMenu
