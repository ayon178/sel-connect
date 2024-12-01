import React from 'react'
import { GrWheelchairActive } from 'react-icons/gr'
import { MdPendingActions } from 'react-icons/md'
import { VscFeedback } from 'react-icons/vsc'

const Statistics = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-12 bg-gray-100 px-4 py-20 lg:px-20">
      <div className="flex w-72">
        <div className="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
          <div className="p-3">
            <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-blue-800 to-blue-950 text-center text-white shadow-lg">
              <VscFeedback className="mt-4 h-7 w-16" />
            </div>
            <div className="pt-1 text-right">
              <p className="text-sm font-light capitalize">Total Requests</p>
              <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
                {data.totalFeedback}
              </h4>
            </div>
          </div>
          <hr className="opacity-50" />
          {/* <div className="p-4">
            <p className="font-light">
              <span className="text-sm font-bold text-green-600">+22% </span>vs last
              month
            </p>
          </div> */}
        </div>
      </div>
      <div className="flex w-72">
        <div className="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
          <div className="p-3">
            <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-center text-white shadow-lg">
              <GrWheelchairActive className="mt-4 h-7 w-16" />
            </div>
            <div className="pt-1 text-right">
              <p className="text-sm font-light capitalize">
                Completed Requests
              </p>
              <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
                {data.totalCompleteThisMonth}
              </h4>
            </div>
          </div>
          <hr className="opacity-50" />
          {/* <div className="p-4">
            <p className="font-light">
              <span className="text-sm font-bold text-green-600">+3% </span>vs last
              month
            </p>
          </div> */}
        </div>
      </div>
      <div className="flex w-72">
        <div className="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
          <div className="p-3">
            <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-800 text-center text-white shadow-lg">
              <MdPendingActions className="mt-4 h-7 w-16" />
            </div>
            <div className="pt-1 text-right">
              <p className="text-sm font-light capitalize">Process Requests</p>
              <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
                {data.totalPendingThisMonth}
              </h4>
            </div>
          </div>
          <hr className="opacity-50" />
          {/* <div className="p-4">
            <p className="font-light">
              <span className="text-sm font-bold text-red-600">-3% </span>vs
              last month
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Statistics
