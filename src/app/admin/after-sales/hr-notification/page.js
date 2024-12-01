'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { formatTimeStampToDayMonthYear } from '@/helper/helper'

const scheduleData = [
  {
    title: 'What is Event',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus perferendis ex sequi eum quam alias animi repellendus consectetur nesciunt ducimus.',
    notification_type: 'Feedback',
    noti_id: '1696712980256',
  },
  {
    title: 'What is Event',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus perferendis ex sequi eum quam alias animi repellendus consectetur nesciunt ducimus.',
    notification_type: 'Feedback',
    noti_id: '1696712980256',
  },
  {
    title: 'What is Event',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus perferendis ex sequi eum quam alias animi repellendus consectetur nesciunt ducimus.',
    notification_type: 'Feedback',
    noti_id: '1696712980256',
  },
  {
    title: 'What is Event',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus perferendis ex sequi eum quam alias animi repellendus consectetur nesciunt ducimus.',
    notification_type: 'Feedback',
    noti_id: '1696712980256',
  },
]

const HrNotification = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')

  return (
    <div className="p-5">
      <div className="flex justify-center mb-8">
        <CustomHeading firstText="" secondText="Notification" rev={true} />
      </div>

      <div className="max-w-[55rem] mx-auto mt-10">
        <div className="grid grid-cols-1 gap-5">
          {scheduleData?.map((item, i) => (
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
        {formatTimeStampToDayMonthYear('1696712980256')}
      </h1>
      <p className="text-md text-gray-700 mt-2 text-justify pb-4">
        Meeting at Azimpur
      </p>
    </div>
  )
}

export default HrNotification
