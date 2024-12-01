import {
  createFeedbackNote,
  createProperty,
  deleteProperty,
  updateProperty,
} from '@/functions/api'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import DeletePropertyConfirmation from './DeletePropertyConfirmation'

const EditProperty = ({ setOpenPopup, data, setRefetch }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const [activeTab, setActiveTab] = useState('edit')
  const [loading, setLoading] = useState(false)
  const [feedData, setFeedData] = useState({
    level: data.level || '',
    unit_number: data.unit_number || '',
  })

  const [addFormData, setAddFormData] = useState({
    title: data.title || '',
    level: data.level || '',
    unit_number: data.unit_number || '',
  })

  const handleAddChange = e => {
    const { name, value } = e.target
    setAddFormData({ ...addFormData, [name]: value })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFeedData({ ...feedData, [name]: value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    // const timeStamp = new Date().getTime()
    const dataToSubmit = {
      ...feedData,
      id: data.id,
    }

    const res = await updateProperty(dataToSubmit)
    if (res) {
      toast.success('Property updated successfully')
      setRefetch(Math.random())
      setOpenPopup(false)
    }
    setLoading(false)
  }

  const handleAddSubmit = async () => {
    setLoading(true)
    const timeStamp = new Date().getTime()
    const dataToSubmit = {
      ...addFormData,
      apartment_id: data.apartment_id,
      address: data.address,
      area: data.area,
      division: data.division,
      has_owner: '0',
      id: String(timeStamp),
      img_url: '',
      name: data.name,
      owner_type: data.owner_type,
      pdf_url: '',
      property_type: data.property_type,
      web_link: data.web_link,
    }

    const res = await createProperty(dataToSubmit)
    if (res) {
      toast.success('Property added successfully')
      window.location.reload()
    } else {
      toast.error('Something went wrong')
    }
  }

  const deletePropertyFunc = async () => {
    const res = await deleteProperty(data.id)
    if (res) {
      toast.success('Property deleted successfully')
      setRefetch(Math.random())
      setDeleteConfirmation(false)
    } else {
      toast.error('Something went wrong to delete the property')
    }
  }

  return (
    <>
      <div className="popup_wrapper">
        <div className="popup_content popup_content_feedback popup_bg">
          <div className="">
            <h1 className="text-2xl font-semibold text-gray-800">
              Edit Property
            </h1>

            {/* Cross icon */}
            <div
              onClick={() => setOpenPopup(false)}
              className="bg-primary cursor-pointer absolute top-2 right-2 rounded-full p-1"
            >
              <RxCross2 className="text-xl text-white cursor-pointer " />
            </div>

            <div className="mt-6">
              <div className="flex justify-center mt-4">
                <div
                  className="inline-flex mb-6 rounded-md shadow-sm border-gray-300 rounded-s-lg overflow-hidden"
                  role="group"
                >
                  <button
                    onClick={() => setActiveTab('edit')}
                    type="button"
                    className={`${
                      activeTab === 'edit' ? 'bg-[#fdddd6] ' : 'bg-white'
                    } px-4 py-2 w-36 text-sm  border  hover:bg-gray-100 hover:text-primary focus:z-10 text-slate-700 font-semibold  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
                  >
                    Edit Property
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('delete')
                      setDeleteConfirmation(true)
                    }}
                    type="button"
                    className={`${
                      activeTab === 'delete' ? 'bg-[#fdddd6] ' : 'bg-white'
                    } px-4 py-2 w-36 text-sm  border  hover:bg-gray-100 hover:text-primary focus:z-10 text-slate-700 font-semibold  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
                  >
                    Deletel Property
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('add')
                    }}
                    type="button"
                    className={`${
                      activeTab === 'add' ? 'bg-[#fdddd6] ' : 'bg-white'
                    } px-4 py-2 w-36 text-sm  border  hover:bg-gray-100 hover:text-primary focus:z-10 text-slate-700 font-semibold  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
                  >
                    Add Property
                  </button>
                </div>
              </div>

              {activeTab === 'edit' && (
                <>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="w-full">
                      <label htmlFor="" className="text-sm text-primary">
                        Level
                      </label>
                      <input
                        onChange={handleChange}
                        value={feedData.level}
                        type="text"
                        name="level"
                        placeholder="Level"
                        className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="" className="text-sm text-primary">
                        Unit Number
                      </label>
                      <input
                        onChange={handleChange}
                        value={feedData.unit_number}
                        type="text"
                        name="unit_number"
                        placeholder="Unit Number"
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
                </>
              )}

              {activeTab === 'add' && (
                <>
                  <div className="grid grid-cols-2 gap-x-4">
                    <div className="w-full mb-3">
                      <label htmlFor="" className="text-sm text-primary">
                        Property Title
                      </label>
                      <input
                        onChange={handleAddChange}
                        value={addFormData.title}
                        type="text"
                        name="title"
                        placeholder="Property Title"
                        className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="" className="text-sm text-primary">
                        Level
                      </label>
                      <input
                        onChange={handleAddChange}
                        value={addFormData.level}
                        type="text"
                        name="level"
                        placeholder="Level"
                        className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="" className="text-sm text-primary">
                      Unit Number
                    </label>
                    <input
                      onChange={handleAddChange}
                      value={addFormData.unit_number}
                      type="text"
                      name="unit_number"
                      placeholder="Unit Number"
                      className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-1 w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-10">
                    <button
                      disabled={loading}
                      onClick={handleAddSubmit}
                      className="bg-primary mt-6 text-white border-[2px] border-primary hover:bg-[#44140e] w-full px-4 py-2 rounded-lg font-semibold"
                    >
                      {loading ? 'Loading...' : 'Add'}
                    </button>
                    <button
                      onClick={() => setOpenPopup(false)}
                      className="bg-white mt-6 text-primary border-[2px] border-primary w-full px-2 py-2 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {deleteConfirmation && (
        <DeletePropertyConfirmation
          setOpenPopup={setDeleteConfirmation}
          func={deletePropertyFunc}
        />
      )}
    </>
  )
}

export default EditProperty
