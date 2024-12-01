import { createFeedbackNote } from '@/functions/api'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'

const EditInteriorFeedPopup = ({ setOpenPopup, data, setRefetch }) => {
  const [loading, setLoading] = useState(false)
  const [feedData, setFeedData] = useState({
    start_date: data.start_date || '',
    target_date: data.target_date || '',
    progress: data.progress || '',
    intProjectValuation: data.intProjectValuation || '',
    payment_status: data.payment_status || 'Allotment Deed',
    reply: data.reply || '',
    service_status: data.service_status || 'pending',
    handover_date: data.handover_date || '',
    materials: data.materials || '',
    notes: data.notes || '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFeedData({ ...feedData, [name]: value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const timeStamp = new Date().getTime()
    const dataToSubmit = {
      ...feedData,
      feedback_id: data.feedback_id,
      type: '7',
      feedback_note_id: String(timeStamp),
    }

    const res = await createFeedbackNote(dataToSubmit)
    if (res) {
      setRefetch(Math.random())
      toast.success('Feedback updated successfully')
      setOpenPopup(false)
    }
    setLoading(false)
  }

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
                  Start Date
                </label>
                <input
                  value={feedData.start_date}
                  onChange={handleChange}
                  type="date"
                  name="start_date"
                  placeholder="Start Date"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 py-2 mt-1 w-full"
                />
              </div>

              <div className="w-full">
                <label htmlFor="" className="text-sm text-primary">
                  Target Date
                </label>
                <input
                  value={feedData.target_date}
                  onChange={handleChange}
                  type="date"
                  name="target_date"
                  placeholder="Target Date"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 py-2 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Progress
                </label>
                <select
                  onChange={handleChange}
                  value={feedData.progress}
                  name="progress"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                >
                  <option selected value="0">
                    Select Progress
                  </option>
                  <option value="20">Agreement Completed</option>
                  <option value="40">Design Completed</option>
                  <option value="60">Setup in process</option>
                  <option value="80">Finishing in process</option>
                  <option value="100">Handover Completed</option>
                </select>
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Interior Project Valuation
                </label>
                <input
                  onChange={handleChange}
                  value={feedData.intProjectValuation}
                  type="text"
                  name="intProjectValuation"
                  placeholder="Interior Project Valuation"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Handover Date
                </label>
                <input
                  value={feedData.handover_date}
                  onChange={handleChange}
                  type="date"
                  name="handover_date"
                  placeholder="Handover Date"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 py-2 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Materials
                </label>
                <input
                  onChange={handleChange}
                  value={feedData.materials}
                  type="text"
                  name="materials"
                  placeholder="Materials"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Payment Status
                </label>
                <select
                  onChange={handleChange}
                  value={feedData.payment_status}
                  name="payment_status"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                >
                  <option value="Allotment Deed">Allotment Deed</option>
                  <option value="Loan Papers">Loan Papers</option>
                  <option value="Registration Process">
                    Registration Process
                  </option>
                  <option value="Other Papers">Other Papers</option>
                </select>
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Admin Feedback
                </label>
                <input
                  readOnly
                  disabled
                  value={feedData.reply}
                  type="text"
                  name="reply"
                  placeholder="Admin Feedback"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Service Status
                </label>
                <select
                  onChange={handleChange}
                  value={feedData.service_status}
                  name="service_status"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Notes
                </label>
                <input
                  onChange={handleChange}
                  value={feedData.notes}
                  type="text"
                  name="notes"
                  placeholder="Notes"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-10">
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="bg-primary mt-6 text-white border-[2px] border-primary hover:bg-[#44140e] w-full px-4 py-2 rounded-lg font-semibold"
              >
                {loading ? 'Loading...' : 'Update'}
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

export default EditInteriorFeedPopup
