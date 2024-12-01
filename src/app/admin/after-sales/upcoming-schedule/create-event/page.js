'use client'

import ClientSearchPopup from '@/components/popup/ClientSearchPopup'
import SelectPropertyPopup from '@/components/popup/SelectPropertyPopup'
import CustomHeading from '@/components/shared/CustomHeading'
import Loader from '@/components/shared/Loader'
import { createEvent, getClientBySearch, loggedInAdmin } from '@/functions/api'
import { convertTo12HourFormat } from '@/helper/helper'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoSearch } from 'react-icons/io5'
import { MdHomeWork } from 'react-icons/md'

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    title: '',
    description: '',
  })
  // ==============================
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [clientSelected, setClientSelected] = useState(null)
  const [handleSearchPopup, setHandleSearchPopup] = useState(false)
  const [searchedClient, setSearchedClient] = useState(null)

  const [allClient, setAllClient] = useState(false)

  const [propertyPopup, setPropertyPopup] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    let user_id
    if (typeof window !== 'undefined') {
      user_id = window.localStorage.getItem('selConnect')
      if (!user_id) {
        window.location.href = '/auth/login'
        return
      }
    }
    const parsedUser = JSON.parse(user_id)

    const fetchData = async () => {
      const { user } = await loggedInAdmin(parsedUser.user_id)
      setCurrentUser(user)
    }
    fetchData()
  }, [])

  const handleSearch = async () => {
    const fetchData = await getClientBySearch(searchText)
    if (!fetchData.user) {
      toast.error('No client found')
      return
    }
    setHandleSearchPopup(false)
    setSearchedClient(fetchData.user)
    setAllClient(false)
    setSelectedProperty(null)
  }
  // ==============================

  // Function to handle the change of input fields
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (
      formData.title === '' ||
      formData.description === '' ||
      formData.date === '' ||
      formData.time === ''
    ) {
      toast.error('Please fill all the fields')
      return
    }

    setLoading(true)

    // current timestamp
    const timestamp = new Date().getTime()
    let client
    if (clientSelected) {
      client = clientSelected.email
    } else if (allClient) {
      client = '1'
    } else if (selectedProperty) {
      client = selectedProperty.id
    }

    const dataToSubmit = {
      admin_id: currentUser.user_id,
      client,
      client_id: clientSelected?.client_id || '',
      client_name: clientSelected?.name || '',
      desc: formData.description,
      event_date: String(
        new Date(formData.date + ' ' + formData.time).getTime() / 1000
      ),
      event_id: String(timestamp),
      event_time: convertTo12HourFormat(formData.time),
      event_type: 'After sales',
      reply: '',
      title: formData.title,
    }

    const res = await createEvent(dataToSubmit)
    setLoading(false)
    if (res) {
      toast.success('Event created successfully')
      setFormData({ date: '', time: '', title: '', description: '' })
    }
  }

  // Function to render the date input with a placeholder
  const renderDateInput = () => {
    return formData.date ? (
      <input
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        type="date"
        className="mt-1 block w-full bg-[#E6E6E6] px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-md xl:py-3"
      />
    ) : (
      <input
        name="date"
        value={formData.date}
        onClick={() => setFormData({ ...formData, date: 'Date Not Selected' })}
        type="text"
        placeholder="Select Date"
        onFocus={() => setFormData({ ...formData, date: '' })}
        className="mt-1 bg-[#E6E6E6] block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-md xl:py-3"
      />
    )
  }

  // Function to render the time input with a placeholder
  const renderTimeInput = () => {
    return formData.time ? (
      <input
        name="time"
        value={formData.time}
        onChange={handleInputChange}
        type="time"
        className="mt-1 block w-full px-3 py-2 border bg-[#E6E6E6] border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-md xl:py-3"
      />
    ) : (
      <input
        name="time"
        value={formData.time}
        onClick={() => setFormData({ ...formData, time: 'Time Not Selected' })}
        type="text"
        placeholder="Select Time"
        onFocus={() => setFormData({ ...formData, time: '' })}
        className="mt-1 bg-[#E6E6E6] block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-md xl:py-3"
      />
    )
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-5 relative">
          <div className="flex justify-center mb-8">
            <CustomHeading firstText="Create" secondText="Event" rev={true} />
          </div>

          {!allClient && (
            <div className="flex max-w-[55rem]  mx-auto justify-end mt-5">
              <button
                onClick={() => {
                  setAllClient(true)
                  setClientSelected(false)
                  setSearchedClient(null)
                  setSelectedProperty(null)
                }}
                className="text-white bg-primary rounded-lg px-4 py-[.3rem] mb-3 xl:py-2"
              >
                Select All Clients
              </button>
            </div>
          )}

          {(!clientSelected || allClient) && (
            <div className="mx-auto">
              <div
                onClick={() => setHandleSearchPopup(true)}
                className="flex max-w-[55rem] focus-within:border-primary mx-auto border border-gray-300 items-center rounded-md "
              >
                <input
                  className="px-4 py-2  text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 xl:py-3"
                  type="text"
                  placeholder="Search..."
                />
                <IoSearch className="w-5 h-5 text-gray-500 mr-4" />
              </div>
            </div>
          )}

          {
            // ============================
            searchedClient && (
              <div className="grid  max-w-[55rem]  mx-auto grid-cols-1 gap-4 mt-4">
                <div
                  onClick={() => {
                    setClientSelected(searchedClient)
                    setSearchedClient(null)
                  }}
                  className="flex shadow-md items-center border p-4 rounded-md relative"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-300 rounded-full relative">
                      <img
                        src={searchedClient.img || PLACEHOLDER}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                      <span
                        className={`absolute top-0 right-1 block w-4 h-4 rounded-full ${
                          searchedClient.status === '1'
                            ? 'bg-green-500'
                            : 'bg-gray-400'
                        }`}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-lg mb-1 text-primary font-semibold">
                      {searchedClient.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>User Id:</strong> {searchedClient.client_id}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Phone:</strong> {searchedClient.phone}
                    </div>
                  </div>
                </div>
              </div>
            )
            // ============================
          }

          {selectedProperty && (
            <div
              style={{
                boxShadow:
                  '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
              }}
              className="max-w-[55rem] mt-3 mx-auto rounded-2xl p-3 mb-14"
            >
              <div className="md:flex gap-4 items-center">
                <div className="rounded-md bg-gray-300 p-2 h-full w-full md:w-1/3 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedProperty.img_url}
                    alt=""
                    className="w-auto h-32 rounded-md"
                  />
                </div>
                <div className="flex flex-col w-full md:w-2/3 gap-2 mt-2">
                  <h1 className="text-lg text-primary font-semibold">
                    {selectedProperty.name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Address: {selectedProperty.address}
                  </p>

                  <p className="text-sm text-gray-600">
                    Property Type: {selectedProperty.property_type}
                  </p>
                  <p className="text-sm text-gray-600">
                    Level: {selectedProperty.level}
                  </p>
                  <p className="text-sm text-gray-600">
                    Unit Number: {selectedProperty.unit_number}
                  </p>
                </div>
              </div>
            </div>
          )}

          {(clientSelected || allClient) && (
            <div className="bg-[#FFDED7] max-w-[55rem] mx-auto px-5 py-2 xl:py-3 rounded-lg mt-5">
              <h1 className="text-slate-700">
                <span className="font-bold">Client:</span>{' '}
                {clientSelected?.name || 'All'}
              </h1>
            </div>
          )}

          {(clientSelected || selectedProperty || allClient) && (
            <>
              <div className="max-w-[55rem] mx-auto mt-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="w-full">
                    {/* event date */}
                    {renderDateInput()}
                  </div>
                  <div className="w-full">
                    {/* event time */}
                    {renderTimeInput()}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      value={
                        formData.date ? formData.date : 'Date Not Selected'
                      }
                      className="mt-1 block w-full px-3 py-2 text-slate-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-md bg-[#FFDED7] xl:py-3"
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      value={
                        formData.date ? formData.time : 'Time Not Selected'
                      }
                      className="mt-1 block w-full px-3 py-2 text-slate-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-md bg-[#FFDED7] xl:py-3"
                      disabled
                    />
                  </div>

                  <div className="w-full col-span-2">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Event Title"
                      className="mt-1 bg-[#E6E6E6] block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-md xl:py-3"
                    />
                  </div>

                  <div className="w-full col-span-2">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Event Description"
                      className="mt-1 bg-[#E6E6E6] block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-md xl:py-3"
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-10">
                  <button
                    onClick={handleSubmit}
                    className="bg-primary rounded-full py-2 px-10 text-white xl:py-3 xl:px-32"
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="fixed bottom-2 right-2">
            <button
              onClick={() => {
                setPropertyPopup(true)
                setClientSelected(null)
              }}
              className="text-white flex items-center gap-2 bg-primary rounded-lg px-4 py-[.3rem] xl:py-2"
            >
              <MdHomeWork className="inline-block text-white text-xl" />
              <span>Property</span>
            </button>
          </div>
        </div>
      )}

      {handleSearchPopup && (
        <ClientSearchPopup
          setOpenPopup={setHandleSearchPopup}
          setSearchText={setSearchText}
          searchText={searchText}
          func={handleSearch}
        />
      )}

      {propertyPopup && (
        <SelectPropertyPopup
          setOpenPopup={setPropertyPopup}
          setSelectedProperty={setSelectedProperty}
          func={() => {
            setSearchedClient(null)
            setClientSelected(null)
            setPropertyPopup(false)
            setAllClient(false)
          }}
        />
      )}
    </>
  )
}

export default CreateEvent
