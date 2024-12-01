'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { FiClock } from 'react-icons/fi'
import { SlCalender } from 'react-icons/sl'
import { getAllNotifications } from '@/functions/api'
import CustomHeading from '@/components/shared/CustomHeading'
import { formatTimeStampToDayMonthYear } from '@/helper/helper'

const Notification = () => {
  const router = useRouter()
  const [notification, setNotification] = useState([])

  useEffect(() => {
    // get all notifications
    const fetchNotification = async () => {
      const notificationList = await getAllNotifications()
      setNotification(notificationList)
    }
    fetchNotification()
  }, [])

  return (
    <div className=" mx-auto my-10 md:my-20 px-5">
      <div className="flex  items-center flex-col">
        <CustomHeading firstText="Notifications" />

        <p className="text-gray-500 mt-2 text-sm ">
          Stay updated with notifications
        </p>

        <div className="w-[55rem] mx-auto mt-10">
          <div className="grid grid-cols-1 gap-5 w-full">
            {notification?.map((item, i) => (
              <div
                key={i}
                onClick={() =>
                  router.push(`/admin/hr/notification-history/${item.noti_id}`)
                }
              >
                <NotificationCard notification={item} />
              </div>
            ))}
          </div>
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
      <h1 className="text-slate-800 text-lg font-semibold">
        {notification?.title}
      </h1>
      <p className="text-sm text-gray-700 mt-2 text-justify">
        {notification?.desc}
      </p>

      <div className="sm:flex items-center justify-between">
        <div className="mt-5 flex">
          <div className="flex items-center mr-16">
            <SlCalender className="inline-block mr-2 text-md text-primary" />
            <span className="text-primary font-semibold text-sm">
              {formatTimeStampToDayMonthYear(notification?.noti_id)}
            </span>
          </div>
          {/* <div className="flex items-center whitespace-nowrap">
            <FiClock className="inline-block mr-2 text-md text-primary" />
            <span className="text-primary font-semibold text-sm">3:30 PM</span>
          </div> */}
        </div>
        <button className="bg-red-200 text-primary rounded-3xl px-5 py-1 w-full sm:w-auto mt-4 sm:mt-0">
          {notification?.notification_type || 'N/A'}
        </button>
      </div>
    </div>
  )
}

export default Notification