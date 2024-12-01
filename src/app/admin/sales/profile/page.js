'use client'

import React, { useEffect, useState } from 'react'
import { GoPencil } from 'react-icons/go'
import { MdOutlineHomeWork } from 'react-icons/md'
import { useRouter, useSearchParams } from 'next/navigation'
import { getStorage, getUserByIdNew } from '@/functions/api'
import toast from 'react-hot-toast'
import CustomHeading from '@/components/shared/CustomHeading'
import Loader from '@/components/shared/Loader'
import SalesPropertySelect from '@/components/popup/SalesPropertySelect'
import SalesPropertyPopup from '@/components/popup/SalesPropertyPopup'
import { IoMdArrowBack } from 'react-icons/io'

const placeholder =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1XBi0Axlc_t4jSZYj7E_rNhZtGMVTKFfFA&usqp=CAU'

const Profile = () => {
  const [userData, setUserData] = useState({})
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const [loading, setLoading] = useState(false)

  const [openPopup, setOpenPopup] = useState(false)
  const [assignedPopup, setAssignedPopup] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const user = getStorage('selConnect')
    if (!user) {
      router.push('/auth/login')
    }

    // const parsed = JSON.parse(user)

    if (!userId) {
      toast.error('Please select a client to view profile', {
        id: 'no-user-id',
      })
      setLoading(false)
      return
    }

    const fetchUserData = async () => {
      const user = await getUserByIdNew(userId)
      if (user.user) {
        setUserData(user.user)
      } else {
        toast.error(user.error)
      }
      setLoading(false)
    }

    fetchUserData()
  }, [])

  return (
    <>
      <div className="w-full xl:w-[1000px] mx-auto my-5 px-5">
        <div className="flex justify-center my-5 mt-14">
          <CustomHeading firstText="Profile" />
        </div>
        <div className="flex items-center justify-center rounded-xl">
          <div className="w-[100px] relative">
            <img
              src={userData?.img || placeholder}
              alt=""
              className="rounded-full w-full h-full object-cover"
            />
            <div className="absolute top-1 right-2 h-5 w-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div
              onClick={() => router.back()}
              className="flex items-center gap-1 cursor-pointer bg-gray-300 w-fit px-6 py-1 rounded-lg text-primary"
            >
              <IoMdArrowBack size={20} className="font-bold" />
            </div>
            <div
              style={{
                boxShadow:
                  '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.2)',
              }}
              className=" rounded-xl bg-[#FFEFEC] p-5 mt-6 w-full"
            >
              {/* row */}
              <div className="block sm:flex items-center justify-between mt-3 border-b border-red-200 pb-2">
                <div className="w-full sn:w-1/4">
                  <p className="text-primary font-semibold text-sm">Name</p>
                </div>
                <div className="w-full sn:w-1/4">
                  <p className="text-gray-700 text-sm">{userData?.name}</p>
                </div>
              </div>
              {/* row */}
              <div className="block sm:flex items-center justify-between mt-3 border-b border-red-200 pb-2">
                <div className="w-full sn:w-1/4">
                  <p className="text-primary font-semibold text-sm">
                    Primary Phone
                  </p>
                </div>
                <div className="w-full sn:w-1/4">
                  <p className="text-gray-700 text-sm">
                    {userData?.phone || 'N/A'}
                  </p>
                </div>
              </div>
              {/* row */}
              <div className="block sm:flex mt-2 items-center justify-between border-b border-red-200 pb-2">
                <div className="w-full sn:w-1/4">
                  <p className="text-primary font-semibold text-sm">
                    Secondary Phone
                  </p>
                </div>
                <div className="w-full sn:w-1/4">
                  <p className="text-gray-700 text-sm">
                    {userData?.phone_2 || 'N/A'}
                  </p>
                </div>
              </div>
              {/* row */}
              <div className="block sm:flex mt-2 items-center justify-between border-b border-red-200 pb-2">
                <div className="w-full sn:w-1/4">
                  <p className="text-primary font-semibold text-sm">
                    Primary Email
                  </p>
                </div>
                <div className="w-full sn:w-1/4">
                  <p className="text-gray-700 text-sm">
                    {userData?.email || 'N/A'}
                  </p>
                </div>
              </div>
              {/* row */}
              <div className="block sm:flex mt-2 items-center justify-between border-b border-red-200 pb-2">
                <div className="w-full sn:w-1/4">
                  <p className="text-primary font-semibold text-sm">
                    Secondary Email
                  </p>
                </div>
                <div className="w-full sn:w-1/4">
                  <p className="text-gray-700 text-sm">
                    {userData?.email_2 || 'N/A'}
                  </p>
                </div>
              </div>
              {/* row */}
              <div className="block sm:flex mt-2 items-center justify-between">
                <div className="w-full sn:w-1/4">
                  <p className="text-primary font-semibold text-sm">
                    Client ID
                  </p>
                </div>
                <div className="w-full sn:w-1/4">
                  <p className="text-gray-700 text-sm">
                    {userData?.client_id || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="sm:flex flex-wrap gap-3 items-center justify-center mt-5">
              <div
                onClick={() => {
                  if (!userData?.user_id) {
                    toast.error('Please select a client first')
                    return
                  }
                  router.push(`/admin/sales/profile/edit/${userData.user_id}`)
                }}
                className="flex cursor-pointer border border-slate-200 rounded-lg w-full sm:w-[48%] items-center gap-2 shadow-md p-4 justify-center mt-2 sm:mt-5"
              >
                <GoPencil className="text-primary text-xl" />
                <button className="btn-primary">Edit Profile</button>
              </div>
              <div
                onClick={() => {
                  if (!userData?.user_id) {
                    toast.error('Please select a client first')
                    return
                  }
                  setOpenPopup(true)
                }}
                className="flex cursor-pointer border border-slate-200 rounded-lg w-full sm:w-[48%] items-center gap-2 shadow-md p-4 justify-center mt-2 sm:mt-5"
              >
                <MdOutlineHomeWork className="text-primary text-xl" />
                <button className="btn-primary">Assign Property</button>
              </div>

              <div
                onClick={() => {
                  if (!userData?.user_id) {
                    toast.error('Please select a client first')
                    return
                  }
                  setAssignedPopup(true)
                }}
                className="flex cursor-pointer border border-slate-200 rounded-lg w-full sm:w-[48%] items-center gap-2 shadow-md p-4 justify-center mt-2 sm:mt-5"
              >
                <MdOutlineHomeWork className="text-primary text-xl" />
                <button className="btn-primary">Assigned Property</button>
              </div>
            </div>
          </>
        )}
      </div>
      {openPopup && (
        <SalesPropertySelect
          setOpenPopup={setOpenPopup}
          user_id={userData?.user_id}
        />
      )}

      {assignedPopup && (
        <SalesPropertyPopup
          setOpenPopup={setAssignedPopup}
          user_id={userData?.user_id}
        />
      )}
    </>
  )
}

export default Profile
