'use client'

import Loader from '@/components/shared/Loader'
import {
  addNotification,
  addPreviousProject,
  getAdminsBySub,
  loggedInAdmin,
} from '@/functions/api'
import { fileUploader } from '@/helper/helper'
import React, { useEffect, useState } from 'react'
import 'react-dropzone-uploader/dist/styles.css' // Import styles from the library
import Dropzone from 'react-dropzone-uploader'
import CustomHeading from '@/components/shared/CustomHeading'
import toast from 'react-hot-toast'

const SendNotification = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [allSubAdmins, setAllSubAdmins] = useState([])
  const [images, setImages] = useState([])
  const [imageToUpload, setImageToUpload] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState('')

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
      const res = await getAdminsBySub('1')
      setAllSubAdmins(res)

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

    if (!formData.title || !formData.description || !imageToUpload.length) {
      return toast.error('Please fill all the fields')
    }

    setLoading(true)
    const urls = await Promise.all(
      imageToUpload.map(image => retriveFileUrl(image))
    )

    // current timestamp
    const timestamp = new Date().getTime()

    const dataToSubmit = {
      client: selectedAdmin,
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
          <div className="bg-[#FFDED7] w-fit mx-auto flex items-center justify-center p-3 rounded-lg">
            <select
              onChange={e => setSelectedAdmin(e.target.value)}
              className="outline-none bg-[#FFDED7] "
            >
              <option value="" disabled selected>
                Select Admin
              </option>
              {allSubAdmins.map(admin => {
                return <option value={admin.email}>{admin.name}</option>
              })}
            </select>
          </div>
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
              <form className="flex w-full flex-col items-center justify-center mt-5">
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
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SendNotification
