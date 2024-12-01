'use client'

import { useEffect, useState } from 'react'

import 'react-dropzone-uploader/dist/styles.css' // Import styles from the library
import Dropzone from 'react-dropzone-uploader'
import toast from 'react-hot-toast'
import CustomHeading from '@/components/shared/CustomHeading'
import { fileUploader } from '@/helper/helper'
import { createPropertyOffer } from '@/functions/api'

const CreateOfferComponent = ({ page }) => {
  //   const searchParams = useSearchParams()
  //   const id = searchParams.get('id')
  //   const [currentUser, setCurrentUser] = useState({})

  const [images, setImages] = useState([])
  const [imageToUpload, setImageToUpload] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
  })

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
    if (formData.title === '' || formData.desc === '') {
      toast.error('Please fill all the fields')
      return
    }

    const urls = await Promise.all(
      imageToUpload.map(image => retriveFileUrl(image))
    )

    // current timestamp
    const timestamp = new Date().getTime()

    const dataToSubmit = {
      id: timestamp,
      ...formData,
      img_url: urls[0],
    }

    const res = await createPropertyOffer(dataToSubmit)
    if (res) toast.success('Offer created successfully')
  }

  return (
    <div className="max-w-[62rem] mx-auto mt-10 px-5">
      <div className="flex flex-col sm:flex-row justify-between gap-10">
        <div className="w-full sm:w-[55rem]">
          <div className="flex justify-center text-center sm:text-start">
            <CustomHeading
              firstText={'Add'}
              secondText="Property Offer"
              rev={true}
              className="text-lg sm:text-xl xl:text-2xl" // Adjusted for larger text size on XL screens
            />
          </div>

          <div className="flex max-w-[900px] mx-auto mt-5 flex-col md:flex-row items-center md:items-start">
            <Dropzone
              onChangeStatus={handleChangeStatus}
              accept="image/*"
              multiple
              styles={{
                dropzone: {
                  border: '2px dashed',
                  borderRadius: '8px',
                  padding: '2rem',
                  marginTop: '1rem',
                  marginBottom: '2rem',
                  width: '100%',
                  maxWidth: '30rem',
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
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:py-3 xl:text-md"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3 w-full md:col-span-2">
                <textarea
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:py-3 xl:text-md"
                  type="text"
                  placeholder="Description"
                  name="desc"
                  onChange={handleChange}
                />
              </div>
              <div className="flex mt-3 justify-center w-full md:col-span-2">
                <button
                  onClick={handleSubmit}
                  className="px-10 w-72 py-2.5 rounded-3xl bg-primary text-white text-sm font-medium xl:py-3"
                >
                  Create Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateOfferComponent
