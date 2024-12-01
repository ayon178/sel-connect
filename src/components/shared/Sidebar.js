'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { SlHome } from 'react-icons/sl'
import { SiCoinmarketcap } from 'react-icons/si'
import { LuBadgeDollarSign } from 'react-icons/lu'
import { FaRegUser } from 'react-icons/fa'

import { IoExitOutline } from 'react-icons/io5'

import logo from '../../assets/logo_white.svg'
import { getSidebarOptions } from '@/utils/constant'

export default function Sidebar({ show, setter }) {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Access localStorage after hydration
    const storedUser =
      typeof window !== 'undefined' && window.localStorage.getItem('selConnect')
    setUser(storedUser ? JSON.parse(storedUser) : null)
  }, [])

  const optionArray = getSidebarOptions(user?.type, user?.sub)

  const pathname = usePathname()

  // Define our base class
  // Define our base class with a minimum width for larger devices
  const className =
    'bg-[#5D2629] w-[250px] md:min-w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:sticky md:top-0 top-14 bottom-0 left-0 z-40 md:max-h-screen overflow-y-auto md:overflow-y-hidden'

  // Append class based on state of sidebar visiblity
  const appendClass = show ? ' ml-0' : ' ml-[-250px] md:ml-0'

  // Clickable menu items
  const MenuItem = ({ icon, name, route, index }) => {
    // Check if the pathname includes the route
    const isActive = pathname.includes(route)

    // Highlight menu item based on currently displayed route
    const colorClass = isActive
      ? 'bg-[#874B4D] text-white mx-3 rounded-lg'
      : 'text-white hover:text-gray-500  mx-3'

    return (
      <Link
        href={route}
        onClick={() => {
          setter(oldVal => !oldVal)
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-2 my-1 ${colorClass} ${
          index === optionArray?.length - 1
            ? 'border-b-[1px]'
            : 'border-b-[1px]'
        }  border-b-slate-400 pb-3`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
    )
  }

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter(oldVal => !oldVal)
      }}
    />
  )

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="p-2 flex">
          <Link
            href="/admin"
            className="flex justify-center w-full border-b-gray-400 pb-3 pt-1 border-b-[1px]"
          >
            {/*eslint-disable-next-line*/}
            <img src={logo.src} alt="Company Logo" width={80} height={80} />
          </Link>
        </div>
        <div className="flex flex-col mt-4">
          {optionArray?.length > 0 &&
            optionArray.map((option, index) => {
              return (
                <MenuItem
                  key={index}
                  name={option.title}
                  route={option.path}
                  icon={option.icon}
                  index={index}
                />
              )
            })}
        </div>
        <div
          onClick={() => {
            window.localStorage.removeItem('selConnect')
            router.push('/auth/login')
          }}
          className="flex items-center justify-between px-10 absolute w-full bottom-5 text-white cursor-pointer hover:bg-[#874B4D] hover:rounded-lg py-2"
        >
          <h1>Log Out</h1>
          <IoExitOutline size={20} />
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  )
}
