'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FiClock } from 'react-icons/fi'
import { SlCalender } from 'react-icons/sl'
import { IoSearch } from 'react-icons/io5'
import { BiSolidCalendarEvent } from 'react-icons/bi'
import { getFutureEvents } from '@/functions/api'
import Loader from '@/components/shared/Loader'
import { formatDateFromTimestamp } from '@/helper/helper'

const UpcomingSchedule = () => {
  const [scheduleData, setScheduleData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFutureEvents()
      setScheduleData(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const filter = searchText.toLowerCase()
    const filtered = scheduleData.filter(data =>
      Object.values(data).some(value =>
        String(value).toLowerCase().includes(filter)
      )
    )
    setFilteredData(filtered)
  }, [searchText, scheduleData])

  return (
    <div className="p-5">
      <div className="flex justify-center mb-8">
        <CustomHeading firstText="Upcoming" secondText="Schedule" rev={true} />
      </div>

      <div className="flex max-w-[55rem] focus-within:border-primary mx-auto border border-gray-300 items-center rounded-md ">
        <input
          className="px-4 py-2  text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 xl:py-3"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <IoSearch className="w-5 h-5 text-gray-500 mr-4" />
      </div>
      <div className="flex max-w-[55rem] mx-auto items-center mt-5">
        <div
          onClick={() =>
            router.push('/admin/after-sales/upcoming-schedule/create-event')
          }
          className="bg-primary w-2/3 xl:py-2 mx-auto flex items-center justify-center gap-3 py-1 rounded-full cursor-pointer"
        >
          <BiSolidCalendarEvent className="w-5 h-5 text-white" />
          <h1 className="text-white text-lg">Create Event</h1>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-[800px] mx-auto mt-10">
          <div className="grid grid-cols-1 gap-5">
            {filteredData?.map((item, i) => (
              <div
                key={i}
                // onClick={() => router.push(`/user/notification/${item.noti_id}`)}
              >
                <NotificationCard notification={item} />
              </div>
            ))}
          </div>
        </div>
      )}
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
      <h1 className="text-primary text-lg font-semibold">
        {notification?.title}
      </h1>
      <p className="text-sm text-gray-700 mt-2 text-justify pb-4">
        {notification?.desc}
      </p>

      <div className="sm:flex items-center justify-between border-t-[1.5px] border-slate-600">
        <div className="mt-5 flex">
          <div className="flex items-center mr-16">
            <SlCalender className="inline-block mr-2 text-md text-primary" />
            <span className="text-primary font-semibold text-sm">
              {formatDateFromTimestamp(notification?.event_date)}
            </span>
          </div>
          <div className="flex items-center whitespace-nowrap">
            <FiClock className="inline-block mr-2 text-md text-primary" />
            <span className="text-primary font-semibold text-sm">
              {notification?.event_time}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingSchedule
