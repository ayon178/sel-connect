'use client'

import Link from 'next/link'
import React, { forwardRef } from 'react'
import { IoMdClose } from 'react-icons/io'

const MobileMenu = forwardRef((props, ref) => {
  return (
    <div
      className="h-screen bg-primary w-screen absolute top-0 left-0 z-20 md:hidden"
      ref={ref}
    >
      <ul className="flex flex-col items-center gap-6 text-primaryText w-full h-full justify-center">
        <li>
          <Link href="/#" className="text-2xl">
            {' '}
            Menu 1
          </Link>
        </li>
        <li>
          <Link href="/#" className="text-2xl">
            {' '}
            Menu 2
          </Link>
        </li>
        <li>
          <Link href="/#" className="text-2xl">
            {' '}
            Menu 3
          </Link>
        </li>
        <li>
          <Link href="/#" className="text-2xl">
            {' '}
            Menu 4
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

MobileMenu.displayName = 'MobileMenu'

export default MobileMenu
