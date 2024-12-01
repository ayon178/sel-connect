import { useEffect, useState } from 'react'
import commonImage from '../../../../assets/common-side.PNG'
import 'react-dropzone-uploader/dist/styles.css' // Import styles from the library
import Dropzone from 'react-dropzone-uploader'
import CustomHeading from '@/components/shared/CustomHeading'
import { useSearchParams } from 'next/navigation'
import { addFeedback, loggedInUser } from '@/functions/api'
import { fileUploader } from '@/helper/helper'
import toast from 'react-hot-toast'
import { OPTIONS } from '@/utils/constant'

const GeneralFeed = ({ page, index }) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [currentUser, setCurrentUser] = useState({})

  const [images, setImages] = useState([])
  const [imageToUpload, setImageToUpload] = useState([])
  const [formData, setFormData] = useState({
    title: OPTIONS[index],
    description: '',
  })

  useEffect(() => {
    let user_id
    if (typeof window !== 'undefined') {
      user_id = window.localStorage.getItem('selConnect')
      if (!user_id) {
        window.location.href = '/auth/login'
        return
      }
    }

    const fetchData = async () => {
      const { user } = await loggedInUser(user_id)
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
    if (formData.title === '' || formData.description === '') {
      toast.error('Please fill all the fields')
      return
    }

    const urls = await Promise.all(
      imageToUpload.map(image => retriveFileUrl(image))
    )

    // current timestamp
    const timestamp = new Date().getTime()
    const type =
      page === 'construction'
        ? '1'
        : page === 'interior'
        ? '4'
        : page === 'afterSales'
        ? '3'
        : '2'
    const dataToSubmit = {
      feedback_id: timestamp,
      ...formData,
      img: urls,
      property_id: id,
      type,
      sender_id: currentUser.email,
      user_name: currentUser.name,
    }

    const res = await addFeedback(dataToSubmit)
    if (res) toast.success('Feedback submitted successfully')
  }

  return (
    <div className="container mx-auto my-10 md:my-20 px-5 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="w-full md:w-[55rem]">
          <div className="flex justify-center text-center sm:text-start">
            <CustomHeading firstText="Construction Custom Feedback" />
          </div>
          <p className="text-gray-500 mt-2 text-sm text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptates, aspernatur.
          </p>
          <div className="flex max-w-[900px] mx-auto mt-5 flex-col md:flex-row items-center md:items-start">
            <Dropzone
              onChangeStatus={handleChangeStatus}
              accept="image/*"
              multiple
              styles={{
                dropzone: {
                  border: '2px dashed',
                  borderRadius: '8px',
                  padding: '2rem', // Adjusted padding for smaller screens
                  marginTop: '1rem',
                  marginBottom: '2rem',
                  width: '100%', // Full width on small screens
                  maxWidth: '24rem', // Maximum width limit
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
            {images.length > 0 && (
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
            )}
          </div>

          <div className="w-full mx-auto">
            <form className="flex w-full flex-col items-center justify-center mt-10">
              <div className="grid gap-3 md:grid-cols-2 w-full">
                <div className="mb-3 w-full md:col-span-2">
                  <input
                    type="text"
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                    placeholder="Tiles (Bath & Kitchen)"
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="mb-3 w-full md:col-span-2">
                <textarea
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                  type="text"
                  placeholder="Description"
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="flex mt-3 justify-center w-full md:col-span-2">
                <button
                  onClick={handleSubmit}
                  className="px-10 w-72 py-2.5 rounded-3xl bg-primary text-white text-sm font-medium"
                >
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="md:max-w-[30rem] hidden md:flex">
          <img src={commonImage.src} className="w-full" alt="Common Side" />
        </div>
      </div>
    </div>
  )
}

export default GeneralFeed
