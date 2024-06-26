import React from 'react'
import commonImage from '../../assets/common-side.PNG'
import CustomHeading from '../shared/CustomHeading'
import { useRouter } from 'next/navigation'

import { FiClock } from 'react-icons/fi'
import { SlCalender } from 'react-icons/sl'

const Notification = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-20">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <CustomHeading firstText="Notifications" />

          <p className="text-gray-500 mt-2 text-sm ">
            Stay updated with notifications
          </p>

          <div className="max-w-[800px] mx-auto mt-10">
            <div className="grid grid-cols-1 gap-5">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    onClick={() => router.push(`/notification/${i + 1}`)}
                  >
                    <NotificationCard />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

const NotificationCard = ({ notification }) => {
  return (
    <div
      style={{
        boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.1)',
      }}
      className=" bg-white px-7 py-4 rounded-2xl cursor-pointer"
    >
      <h1 className="text-slate-800 text-lg font-semibold">Admin replied</h1>
      <p className="text-sm text-gray-700 mt-2 text-justify">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
        possimus voluptate sapiente vero accusantium excepturi nobis. Tenetur
        provident dolorem dolorum, sit, delectus nemo iste officia
      </p>

      <div className="flex items-center justify-between">
        <div className="mt-5 flex">
          <div className="flex items-center mr-16">
            <SlCalender className="inline-block mr-2 text-md text-primary" />
            <span className="text-primary font-semibold text-sm">
              21/01/2024
            </span>
          </div>
          <div className="flex items-center">
            <FiClock className="inline-block mr-2 text-md text-primary" />
            <span className="text-primary font-semibold text-sm">3:30 PM</span>
          </div>
        </div>
        <button className="bg-red-200 text-primary rounded-3xl px-5 py-1">
          Account
        </button>
      </div>
    </div>
  )
}

export default Notification
