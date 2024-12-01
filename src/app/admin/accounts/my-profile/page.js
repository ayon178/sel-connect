'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import React, { useEffect, useState } from 'react'
import { GoPencil } from 'react-icons/go'
import { MdOutlineHomeWork } from 'react-icons/md'
import { HiHomeModern } from 'react-icons/hi2'
import Switch from '@/components/shared/Switch'
import { useRouter } from 'next/navigation'
import { getCurrentAdminData, getStorage } from '@/functions/api'
import toast from 'react-hot-toast'

const placeholder =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm1XBi0Axlc_t4jSZYj7E_rNhZtGMVTKFfFA&usqp=CAU'

const Profile = () => {
  const [userData, setUserData] = useState({})
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const userId = getStorage('selConnect')
    if (!userId) {
      router.push('/auth/login')
    }

    const parsed = JSON.parse(userId)

    const fetchUserData = async () => {
      const user = await getCurrentAdminData(parsed.user_id)
      if (user.user) {
        setUserData(user.user)
      } else {
        toast.error(user.error)
      }
      setLoading(false)
    }

    fetchUserData()
  }, [router])

  return (
    <>
      <div className="w-full md:w-[600px] xl:w-[1000px] mx-auto my-5 px-5">
        <div className="flex justify-center my-5">
          <CustomHeading firstText="Profile" />
        </div>
        <div
          // style={{
          //   boxShadow:
          //     '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.2)',
          // }}
          className="flex items-center justify-center rounded-xl"
        >
          <div className="w-[100px] relative">
            <img
              src={userData?.img || placeholder}
              alt=""
              className="rounded-full w-full h-full object-cover"
            />
            <div className="absolute top-1 right-2 h-5 w-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {/* <div>
            <h1 className="text-primary text-2xl font-semibold">
              Monirul Hossein Miraj
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Lorem ipsum dolor sit amet
            </p>
          </div> */}
        </div>

        {/* <div className="flex justify-center my-4">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">Approval: </h1>
            <Switch enabled={Number(userData?.approval)} />
          </div>
        </div> */}

        {loading ? (
          <div className="text-center mt-5">Loading...</div>
        ) : (
          <>
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
            <div className="sm:flex gap-5 items-center justify-between mt-5">
              <div
                onClick={() =>
                  router.push(
                    `/admin/accounts/my-profile/edit/${userData?.user_id}`
                  )
                }
                className={`flex cursor-pointer border border-slate-200 rounded-lg w-full items-center gap-2 shadow-md p-4 justify-center mt-2 sm:mt-5 ${
                  userData?.sub === '0' ? 'sm:w-1/2' : ''
                }`}
              >
                <GoPencil className="text-primary text-xl" />
                <button className="btn-primary">Edit Profile</button>
              </div>
              {userData?.sub === '0' && (
                <div className="flex cursor-pointer border border-slate-200 rounded-lg w-full sm:w-1/2 items-center gap-2 shadow-md p-4 justify-center mt-2 sm:mt-5">
                  <MdOutlineHomeWork className="text-primary text-xl" />
                  <button className="btn-primary">Assign Property</button>
                </div>
              )}
            </div>
            <div className="flex gap-5 items-center justify-between">
              <div
                onClick={() => router.push(`/admin/accounts/property-list`)}
                className="flex border cursor-pointer border-slate-200 rounded-lg w-full items-center gap-2 shadow-md p-4 justify-center mt-2 sm:mt-5"
              >
                <HiHomeModern className="text-primary text-xl" />
                <button className="btn-primary">All Properties</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Profile
