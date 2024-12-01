import { createFeedbackNote } from '@/functions/api'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'

const EditAfterSalesFeedPopup = ({ setOpenPopup, data, setRefetch }) => {
  const [loading, setLoading] = useState(false)
  const [feedData, setFeedData] = useState({
    reply: data.reply || '',
    service_status: data.service_status || 'pending',
    handover_date: data.handover_date || '',
    address: data.address || '',
    technician: data.technician || '',
    materials: data.materials || '',
    supplier: data.supplier || '',
    service_start_time: data.service_start_time || '',
    service_end_time: data.service_end_time || '',
    material_use_status: data.material_use_status || '',
    update: data.update || '',
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
      type: '6',
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

              <div className="w-full ">
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
                  Handover Date
                </label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="handover_date"
                  placeholder="Handover Date"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 py-2 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Address
                </label>
                <input
                  readOnly
                  disabled
                  value={feedData.address}
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Technician
                </label>
                <input
                  onChange={handleChange}
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
                  Supplier
                </label>
                <input
                  onChange={handleChange}
                  value={feedData.supplier}
                  type="text"
                  name="supplier"
                  placeholder="Supplier"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Service Start Time
                </label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="service_start_time"
                  placeholder="Service Start Time"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 py-2 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Service End Time
                </label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="service_end_time"
                  placeholder="Service End Time"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 py-2 mt-1 w-full"
                />
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Material Use Status
                </label>
                <select
                  onChange={handleChange}
                  value={feedData.material_use_status}
                  name="material_use_status"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                >
                  <option value="used">Used</option>
                  <option value="not_used">Not Used</option>
                </select>
              </div>

              <div className="w-full mt-2">
                <label htmlFor="" className="text-sm text-primary">
                  Update
                </label>
                <input
                  onChange={handleChange}
                  value={feedData.update}
                  type="text"
                  name="update"
                  placeholder="Update"
                  className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                />
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

export default EditAfterSalesFeedPopup
