import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const EditFeedback = ({ setOpenPopup, data }) => {
  const [feedData, setFeedData] = useState({
    service_status: data.service_status || '',
    handover_date: data.handover_date || '',
    technician: data.technician || '',
    materials: data.materials || '',
  })

  console.log('feedData:', feedData)
  return (
    <div className="popup_wrapper">
      <div className="popup_content popup_content_feedback popup_bg">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-800">
            Edit Feedback
          </h1>

          {/* Cross icon */}
          <div
            onClick={() => setOpenPopup(false)}
            className="bg-primary cursor-pointer absolute top-2 right-2 rounded-full p-1"
          >
            <RxCross2 className="text-xl text-white cursor-pointer " />
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="w-full">
                <label htmlFor="" className="text-sm text-primary">
                  Service Status
                </label>
                <select
                  value={feedData.service_status}
                  name="service_status"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="w-full">
                <label htmlFor="" className="text-sm text-primary">
                  Handover Date
                </label>
                <input
                  type="date"
                  name="handover_date"
                  placeholder="Handover Date"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 py-2 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Technician
                </label>
                <input
                  value={feedData.technician}
                  type="text"
                  name="technician"
                  placeholder="Technician"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Materials
                </label>
                <input
                  value={feedData.materials}
                  type="text"
                  name="materials"
                  placeholder="Materials"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-10">
              <button
                // onClick={func}
                className="bg-white mt-6 text-primary border-[2px] border-primary w-full px-4 py-2 rounded-lg font-semibold"
              >
                Send
              </button>
              <button
                onClick={() => setOpenPopup(false)}
                className="bg-white mt-6 text-primary border-[2px] border-primary w-full px-2 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditFeedback
