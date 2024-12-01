'use client'

import React, { useEffect, useState } from 'react'
import { SlCalender } from 'react-icons/sl'
import { FiClock } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import commonImage from '@/assets/common-side.PNG'
import CustomHeading from '../shared/CustomHeading'
import { getAllEvents } from '@/functions/api'
import { formatDateFromTimestamp } from '@/helper/helper'

const EventComponent = () => {
  const router = useRouter()
  const [events, setEvents] = useState([])

  useEffect(() => {
    // get events
    const fetchEvents = async () => {
      const eventsList = await getAllEvents()
      setEvents(eventsList)
    }

    fetchEvents()
  }, [])

  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between items-start gap-10">
        <div className="w-[55rem] mt-10">
          <CustomHeading firstText={'Events'} />
          <p className="text-sm mb-0 sm:mb-8">
            Discover what&apos;s happening around
          </p>

          {/* one item in a row */}
          <div className=" mx-auto">
            <div className="grid grid-cols-1">
              {/* Array 4 items map */}
              {events?.map((item, index) => (
                <div
                  onClick={() => router.push(`/user/event/${item.event_id}`)}
                  key={index}
                  style={{
                    boxShadow:
                      '0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 15px rgba(0, 0, 0, 0.1)',
                  }}
                  className=" px-7 sm:flex justify-between py-5 rounded-lg"
                >
                  <div>
                    <h1 className="text-tertiaryText text-xl font-semibold">
                      {item?.title}
                    </h1>
                    <div className="mt-2 sm:mt-5 flex">
                      <div className="flex items-center mr-auto sm:mr-16">
                        <SlCalender className="inline-block mr-2 text-lg text-primary" />
                        <span className="text-primary font-semibold text-sm">
                          {formatDateFromTimestamp(item?.event_date)}
                        </span>
                      </div>
                      <div className="flex items-center whitespace-nowrap">
                        <FiClock className="inline-block mr-2 text-lg text-primary" />
                        <span className="text-primary font-semibold text-sm">
                          {item?.event_time}
                        </span>
                      </div>
                    </div>
                    <h1 className="mt-6 sm:mt-4 text-sm text-slate-700">
                      {item?.desc}
                    </h1>
                  </div>

                  <div className="text-right mt-4 sm:mt-0">
                    <button className="bg-red-200 w-full sm:w-auto text-primary rounded-3xl px-5 py-1">
                      {item?.event_type}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[30rem] hidden md:flex md:sticky top-14">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default EventComponent
