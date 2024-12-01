import { createFeedbackNote } from '@/functions/api'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'

const EditAccountsFeedPopup = ({ setOpenPopup, data, setRefetch }) => {
  const [loading, setLoading] = useState(false)
  const [feedData, setFeedData] = useState({
    service_status: data.service_status || 'pending',
    reply: data.reply || '',
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
      type: '5',
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

              <div className="w-full">
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

export default EditAccountsFeedPopup
