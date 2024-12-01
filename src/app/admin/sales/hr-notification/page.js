'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { formatTimeStampToDayMonthYear } from '@/helper/helper'
import { getAllHrNotification } from '@/functions/api'

const HrNotification = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [notificationData, setNotificationData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllHrNotification()
      setNotificationData(data)
    }

    fetchData()
  }, [])

  return (
    <div className="p-5">
      <div className="flex mt-16 justify-center mb-8">
        <CustomHeading firstText="" secondText="Notification" rev={true} />
      </div>

      <div className="max-w-[55rem] mx-auto mt-10">
        <div className="grid grid-cols-1 gap-5">
          {notificationData?.map((item, i) => (
            <div
              key={i}
              //   onClick={() => router.push(`/user/notification/${item.noti_id}`)}
            >
              <NotificationCard notification={item} />
            </div>
          ))}
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
      className=" bg-red-100 px-7 py-4 rounded-2xl cursor-pointer"
    >
      <h1 className="text-slate-700 text-xl font-semibold">
        {notification?.title}
      </h1>
      <h1 className="text-md text-primary">
        {formatTimeStampToDayMonthYear(notification.noti_id)}
      </h1>
      <p className="text-md text-gray-700 mt-2 text-justify pb-4">
        {notification.desc}
      </p>
    </div>
  )
}

export default HrNotification
