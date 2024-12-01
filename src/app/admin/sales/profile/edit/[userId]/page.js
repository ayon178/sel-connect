'use client'

import React, { useEffect, useState } from 'react'
import { FaUserAlt, FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { IoMdKey } from 'react-icons/io'
import CustomHeading from '@/components/shared/CustomHeading'
import {
  getCurrentAdminData,
  getStorage,
  getUserByIdNew,
  getUserData,
  updateClientData,
  updateUserData,
} from '@/functions/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { IoMdArrowBack } from 'react-icons/io'

const EditProfile = ({ params }) => {
  const userId = params.userId
  const [formData, setFormData] = useState({})

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)

    const fetchUserData = async () => {
      const user = await getUserByIdNew(userId)
      if (user.user) {
        setFormData(user.user)
      } else {
        toast.error(user.error)
      }
    }

    setLoading(false)
    fetchUserData()
  }, [userId])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    const update = await updateClientData(formData.email, formData)
    if (update) {
      toast.success('Profile updated successfully')
      router.back()
    } else {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="my-10  px-5">
      <div className="flex mx-auto max-w-[55rem] relative justify-center mt-14 mb-8">
        <CustomHeading firstText="Edit" secondText="Profile" />
        <div
          onClick={() => router.back()}
          className="flex cursor-pointer absolute left-0 top-1 items-center gap-1 bg-gray-300 w-fit px-6 py-1 rounded-lg text-primary"
        >
          <IoMdArrowBack size={20} className='font-bold' />
        </div>
      </div>

      <div className="flex flex-col space-y-4 w-full max-w-[55rem] mx-auto">
        <div className="flex w-full items-center gap-5">
          <div className="bg-[#FFDED7] w-12 h-12 p-4 rounded-full flex items-center justify-center">
            <FaUserAlt size={22} className="text-primary " />
          </div>
          <div className="w-full border-b-2 border-gray-300 focus-within:border-primary">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="pl-2 pr-4 py-2 w-full bg-transparent focus:outline-none text-gray-700"
              value={formData?.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-5">
          <div className="bg-[#FFDED7] w-12 h-12 p-4 rounded-full flex items-center justify-center">
            <FaPhoneAlt size={22} className="text-primary " />
          </div>
          <div className="w-full border-b-2 border-gray-300 focus-within:border-primary">
            <input
              type="phone"
              name="phone"
              placeholder="Primary Phone"
              className="pl-2 pr-4 py-2 w-full bg-transparent focus:outline-none text-gray-700"
              value={formData?.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-5">
          <div className="bg-[#FFDED7] w-12 h-12 p-4 rounded-full flex items-center justify-center">
            <FaPhoneAlt size={22} className="text-primary " />
          </div>
          <div className="w-full border-b-2 border-gray-300 focus-within:border-primary">
            <input
              type="phone"
              name="phone_2"
              placeholder="Secondary Phone"
              className="pl-2 pr-4 py-2 w-full bg-transparent focus:outline-none text-gray-700"
              value={formData?.phone_2}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-5">
          <div className="bg-[#FFDED7] w-12 h-12 p-3 rounded-full flex items-center justify-center">
            <MdEmail size={22} className="text-primary " />
          </div>
          <div className="w-full border-b-2 border-gray-300 focus-within:border-primary">
            <input
              disabled
              type="email"
              name="email"
              placeholder="Email"
              className="pl-2 pr-4 py-2 w-full bg-transparent focus:outline-none text-gray-700"
              value={formData?.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-5">
          <div className="bg-[#FFDED7] w-12 h-12 p-3 rounded-full flex items-center justify-center">
            <IoMdKey size={22} className="text-primary " />
          </div>
          <div className="w-full border-b-2 border-gray-300 focus-within:border-primary">
            <input
              type="text"
              name="client_id"
              placeholder="Client ID"
              className="pl-2 pr-4 py-2 w-full bg-transparent focus:outline-none text-gray-700"
              value={formData?.client_id}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex mt-10 justify-center w-full">
          <button
            onClick={handleSubmit}
            className="px-10 w-full py-2.5 rounded-3xl bg-primary text-white text-sm font-medium"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
