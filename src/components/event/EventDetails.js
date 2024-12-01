'use client'

import React, { useEffect, useState } from 'react'
import { SlCalender } from 'react-icons/sl'
import { FiClock } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import commonImage from '@/assets/common-side.PNG'
import CustomHeading from '../shared/CustomHeading'
import { getEventById } from '@/functions/api'
import { formatDateFromTimestamp } from '@/helper/helper'

const EventDetails = ({ dynamicId }) => {
  const router = useRouter()
  const [singleEvent, setSingleEvent] = useState({})

  useEffect(() => {
    // get single event
    const fetchSingleEvent = async () => {
      const eventList = await getEventById(dynamicId)
      setSingleEvent(eventList)
    }

    fetchSingleEvent()
  }, [dynamicId])
  return (
    <div className="container mx-auto my-5 md:my-10 px-5">
      <div className="flex justify-between items-start gap-10">
        <div className="sm:w-[55rem] w-full">
          {/* <CustomHeading firstText={'Event Details'} />
          <p className="text-sm mb-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
            doloribus magni voluptatum
          </p> */}

          <div className="max-w-[800px] mx-auto">
            <div
              style={{
                boxShadow:
                  '0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 15px rgba(0, 0, 0, 0.1)',
              }}
              className="px-3 sm:px-7 mt-10 py-5 rounded-lg"
            >
              <h1 className="text-tertiaryText text-xl font-semibold">
                {singleEvent?.title}
              </h1>
              <div className="mt-5 flex">
                <div className="flex items-center mr-16">
                  <SlCalender className="inline-block mr-2 text-lg sm:text-2xl text-primary" />
                  <span className="text-primary font-semibold text-sm sm:text-xl">
                    {formatDateFromTimestamp(singleEvent?.event_date)}
                  </span>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <FiClock className="inline-block mr-2 text-lg sm:text-2xl text-primary" />
                  <span className="text-primary font-semibold text-sm sm:text-xl">
                    {singleEvent?.event_time}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <button className="bg-red-200 mt-4 sm:mt-0 text-primary w-full sm:w-auto rounded-3xl px-5 py-1">
                  {singleEvent?.event_type}
                </button>
              </div>
            </div>

            <div className="border px-4 py-4 rounded-xl mt-4 border-gray-400 ">
              <h1 className=" mb-2 uppercase font-semibold text-sm">
                Event Description
              </h1>

              <p>{singleEvent?.desc}</p>
            </div>

            {singleEvent?.reply && (
              <div className="border px-4 py-4 rounded-xl mt-4 border-gray-400 ">
                <h1 className=" mb-2 uppercase font-semibold text-sm">
                  You replied : {singleEvent?.reply}
                </h1>
              </div>
            )}

            <h1 className="text-md sm:text-xl mt-10 mb-4 font-semibold text-center">
              Do you want to attend this event?
            </h1>

            <div className="mb-3 w-full md:col-span-2">
              <input
                type="text"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                placeholder="Type Your Text"
                name="eventTitle"
              />
            </div>

            <div className="flex items-center  mx-auto gap-5 justify-between mt-5 mb-9">
              <button
                onClick={() => router.push('/event')}
                className="bg-red-200 w-1/2 text-black font-semibold rounded-3xl px-5 py-2"
              >
                No
              </button>
              <button
                onClick={() => router.push('/event')}
                className="bg-blue-200 text-black font-semibold w-1/2 rounded-3xl px-5 py-2"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[30rem] hidden md:flex md:sticky top-6">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default EventDetails
