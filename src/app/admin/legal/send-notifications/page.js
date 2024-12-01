'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import React, { useEffect, useState } from 'react'
import 'react-dropzone-uploader/dist/styles.css' // Import styles from the library
import Dropzone from 'react-dropzone-uploader'
import toast from 'react-hot-toast'
import { IoSearch } from 'react-icons/io5'
import ClientSearchPopup from '@/components/popup/ClientSearchPopup'
import {
  addNotification,
  getClientBySearch,
  loggedInAdmin,
  loggedInUser,
} from '@/functions/api'
import { PLACEHOLDER } from '@/utils/constant'
import { MdHomeWork } from 'react-icons/md'
import SelectPropertyPopup from '@/components/popup/SelectPropertyPopup'
import { fileUploader } from '@/helper/helper'
import Loader from '@/components/shared/Loader'

const SendNotification = () => {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [images, setImages] = useState([])
  const [imageToUpload, setImageToUpload] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [searchText, setSearchText] = useState({
    searchText: '',
    key: 'phone',
  })
  // ============================
  const [clientSelected, setClientSelected] = useState(null)
  const [handleSearchPopup, setHandleSearchPopup] = useState(false)
  const [searchedClient, setSearchedClient] = useState(null)

  const [allClient, setAllClient] = useState(false)

  const [propertyPopup, setPropertyPopup] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  // ============================

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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleChangeStatus = ({ meta = {}, file }, status) => {
    if (status === 'done') {
      const newImages = {
        ...file,
        preview: URL.createObjectURL(file),
        meta,
      }
      setImages(prevImages => [...prevImages, newImages])

      setImageToUpload(prev => [...prev, file])
    }
    if (status === 'removed') {
      const remainingImages = images.filter(
        image => image.meta && image.meta.id !== meta.id
      )
      setImages(remainingImages)

      const remainingFiles = remainingImages.map(image => image.file)

      setImageToUpload(remainingFiles)
    }
  }

  const retriveFileUrl = async file => {
    if (file) {
      const url = await fileUploader(file)
      return url
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('formData', currentUser.user_id)
    // if (formData.title === '' || formData.description === '' || currentUser?.user_id) {
    //   toast.error('Please fill all the fields')
    //   return
    // }

    setLoading(true)
    const urls = await Promise.all(
      imageToUpload.map(image => retriveFileUrl(image))
    )

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
      client,
      noti_id: timestamp,
      image_url: urls[0],
      title: formData.title,
      desc: formData.description,
      sender_id: currentUser.user_id,
    }

    const res = await addNotification(dataToSubmit)
    setLoading(false)
    if (res) toast.success('Notification submitted successfully')
  }

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-5 relative">
          <div className="flex justify-center mb-8">
            <CustomHeading
              firstText="Send"
              secondText="Notification"
              rev={true}
            />
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
                className="text-white xl:py-2 bg-primary rounded-lg px-4 py-[.3rem] mb-3"
              >
                Select All Clients
              </button>
            </div>
          )}

          {!clientSelected && (
            <div className="mx-auto">
              <div
                onClick={() => setHandleSearchPopup(true)}
                className="flex max-w-[55rem] focus-within:border-primary mx-auto border border-gray-300 items-center rounded-md "
              >
                <input
                  className="px-4 py-2 xl:py-3 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
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

          {clientSelected ||
            (allClient && (
              <div className="bg-[#FFDED7] xl:py-3 max-w-[55rem] mx-auto px-5 py-2 rounded-lg mt-5">
                <h1 className="text-slate-700">
                  <span className="font-bold">Client:</span>{' '}
                  {clientSelected?.name || 'All'}
                </h1>
              </div>
            ))}

          {(clientSelected || selectedProperty || allClient) && (
            <>
              <div className="mx-auto max-w-[55rem]">
                <div className="flex max-w-[900px] mx-auto mt-5 flex-col md:flex-row items-center md:items-start">
                  <Dropzone
                    onChangeStatus={handleChangeStatus}
                    accept="image/*"
                    multiple
                    styles={{
                      dropzone: {
                        border: '2px dashed gray',
                        borderRadius: '8px',
                        padding: '2rem', // Adjusted padding for smaller screens
                        marginTop: '1rem',
                        marginBottom: '2rem',
                        width: '100%', // Full width on small screens
                        maxWidth: '30rem', // Maximum width limit
                        maxHeight: '18rem',
                        textAlign: 'center',
                      },
                      dropzoneActive: {
                        borderColor: '#3182ce',
                      },
                      submitButton: {
                        backgroundColor: '#f56565',
                        color: 'white',
                        padding: '0.5rem 2rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginTop: '2rem',
                      },
                    }}
                  />
                  {/* {images.length > 0 && (
                    <div className="flex flex-wrap mt-6 ml-0 md:ml-5">
                      {images.map((image, index) => (
                        <div key={index} className="m-2">
                          <img
                            src={image.preview}
                            alt={`preview-${index}`}
                            className="max-w-full max-h-32 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>

                <div className="w-full mx-auto">
                  <form className="flex w-full flex-col items-center justify-center mt-10">
                    <div className="grid gap-3 md:grid-cols-2 w-full">
                      <div className="mb-3 w-full md:col-span-2">
                        <input
                          type="text"
                          className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5 xl:py-3"
                          placeholder="Type notification title"
                          name="title"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3 w-full md:col-span-2">
                      <textarea
                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5 xl:py-3"
                        type="text"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex mt-3 justify-center w-full md:col-span-2">
                      <button
                        onClick={handleSubmit}
                        className="px-10 w-72 py-2.5 xl:py-3 rounded-3xl bg-primary text-white text-sm font-medium"
                      >
                        Send Notification
                      </button>
                    </div>
                  </form>
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
              className="text-white xl:py-2 flex items-center gap-2 bg-primary rounded-lg px-4 py-[.3rem]"
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

export default SendNotification
