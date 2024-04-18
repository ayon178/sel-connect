import React from 'react'
import { SlCalender } from 'react-icons/sl'
import { FiClock } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import commonImage from '@/assets/common-side.PNG'
import CustomHeading from '../shared/CustomHeading'

const EventComponent = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <CustomHeading firstText={'Events'} />
          <p className="text-sm mb-8">Discover what&apos;s happening around</p>

          {/* one item in a row */}
          <div className="max-w-[800px] mx-auto">
            <div className="grid grid-cols-1">
              {/* Array 4 items map */}
              {Array(4)
                .fill()
                .map((item, index) => (
                  <div
                    onClick={() => router.push(`/event/${index + 1}`)}
                    key={index}
                    style={{
                      boxShadow:
                        '0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 15px rgba(0, 0, 0, 0.1)',
                    }}
                    className=" px-7 mt-10 flex justify-between py-5 rounded-lg"
                  >
                    <div>
                      <h1 className="text-tertiaryText text-xl font-semibold">
                        Test
                      </h1>
                      <div className="mt-5 flex">
                        <div className="flex items-center mr-16">
                          <SlCalender className="inline-block mr-2 text-lg text-primary" />
                          <span className="text-primary font-semibold text-sm">
                            21/01/2024
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FiClock className="inline-block mr-2 text-lg text-primary" />
                          <span className="text-primary font-semibold text-sm">
                            3:30 PM
                          </span>
                        </div>
                      </div>
                      <h1 className="mt-4 text-sm text-slate-700">Test</h1>
                    </div>

                    <div className="text-right">
                      <button className="bg-red-200 text-primary rounded-3xl px-5 py-1">
                        Account
                      </button>
                    </div>
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

export default EventComponent
