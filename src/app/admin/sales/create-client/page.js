'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { fileUploader } from '@/helper/helper'
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth'
import React, { useState } from 'react'
import { FaPencilAlt, FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdAddPhotoAlternate } from 'react-icons/md'

import { createUser } from '@/functions/api'
import toast from 'react-hot-toast'
import axios from 'axios'
import { auth } from '../../../../../config/firebase.init'

const CreateClientPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    phone_2: '',
    email: '',
    email_2: '',
    password: '',
    client_id: '',
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageToUpload, setImageToUpload] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = event => {
    const file = event.target.files[0]
    if (file) {
      setImageToUpload(file)
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (formData.phone.length !== 11) {
      toast.error('Phone number must be 11 digits')
      return
    }
    if (
      formData.name === '' ||
      formData.phone === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.client_id === ''
    ) {
      toast.error('Please fill all the required fields')
      return
    }
    setLoading(true)
    let cretedUser = null
    try {
      // Signup with email and password in firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      const user = userCredential.user
      cretedUser = user

      let imageUrl = ''
      if (imageToUpload) {
        imageUrl = await fileUploader(imageToUpload)
      }

      const dataToSubmit = {
        approval: '1',
        img: imageUrl,
        status: '1',
        ...formData,
        user_id: user.uid,
      }

      // Save data to database
      const response = await createUser(dataToSubmit)
      if (response) {
        toast.success('Client Created Successfully')

        const BASE_URL = 'https://sel-connect-75f27484fc90.herokuapp.com'
        // Send email to user
        const res = await axios.post(`${BASE_URL}/send-email`, {
          recipient: formData.email,
          subject: 'Your account has been created successfully',
          message: `Dear ${formData.name}, 
          Your account has been created successfully in SEL Connect App. Welcome to our Digital Property Service Management app where we ensure you will get on time maintenance services for your properties with SEL. 

          You can find & download the app in Play Store here: https://play.google.com/store/apps/details?id=com.sel.selconnect
          You can use the web version of the app here: https://www.selconnect.com.bd

          To enter the app, use your login credentials from here: 
          User Email ID: <strong>${formData.email}</strong><br/> Password : <strong>${formData.password}</strong>
          
          SEL believes in upgrading the quality of services. Through this App, we hope to support you better with after sales services, for all your properties with SEL. 

          Thank you and stay tuned.`,
        })

        // Send sms to user
        const res2 = await axios.post(`${BASE_URL}/send-sms-sel-connect`, {
          recipient: `88${formData.phone}`,
          message: `Dear ${formData.name}, Your account has been created successfully in SEL Connect App. Welcome to our Digital Property Service Management app where we ensure you get smooth maintenance services for your properties with SEL. 
          You can find & download the app in Play Store here: https://play.google.com/store/apps/details?id=com.sel.selconnect
          You can use the web version of the app here: https://www.selconnect.com.bd

          To enter the app, use your login credentials from here: 
          User Email ID: ${formData.email} Password : ${formData.password}

          SEL believes in upgrading the quality of services. Through this App, we hope to support you better in after sales services, for all your properties with SEL. Thank you.`,
        })

        setFormData({
          name: '',
          phone: '',
          phone_2: '',
          email: '',
          email_2: '',
          password: '',
          client_id: '',
        })
        setSelectedImage(null)
        setImageToUpload(null)
        setLoading(false)
        window.location.reload()
      } else {
        toast.error('Failed to create user')
      }
    } catch (error) {
      console.error(error)
      toast.error('Please change the email or phone number and try again.')
      // delete the user from firebse auth
      if (cretedUser) {
        await deleteUser(cretedUser)
          .then(() => {
            console.log('User deleted successfully')
          })
          .catch(deleteError => {
            console.error('Error deleting user:', deleteError)
          })
      }

      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 xl:p-8">
      <div className="flex justify-center my-5 xl:my-8">
        <CustomHeading firstText="Create" secondText="Client ID" />
      </div>
      <div className="flex flex-col items-center">
        <label className="w-24 h-24 xl:w-28 xl:h-28 border-2 border-gray-300 border-dashed rounded-full flex justify-center items-center cursor-pointer relative">
          {selectedImage ? (
            <>
              <img
                src={selectedImage}
                alt="Profile"
                className="rounded-full w-full h-full object-cover"
              />
              <div className="bg-white flex items-center justify-center w-7 h-7 xl:w-8 xl:h-8 absolute bottom-0 left-2 rounded-full border-2 border-slate-700 z-10">
                <FaPencilAlt size={20} className="text-slate-700 " />
              </div>
            </>
          ) : (
            <MdAddPhotoAlternate className="text-gray-400 w-12 h-12 xl:w-14 xl:h-14" />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        <h1 className="text-primary my-3 font-semibold xl:text-lg">
          Add Picture
        </h1>
      </div>

      <div className="max-w-[60rem] mx-auto mt-10 px-5 xl:mt-12 xl:px-8">
        <form className="flex w-full flex-col items-center justify-center mt-10 xl:mt-12">
          <div className="grid gap-3 md:grid-cols-2 w-full xl:gap-4">
            <div className="mb-3 w-full md:col-span-2">
              <input
                type="text"
                className="border border-gray-300 text-gray-900 text-sm xl:text-base rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5 xl:p-3"
                placeholder="Full Name *"
                name="name"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="grid gap-3 md:grid-cols-2 w-full xl:gap-4">
              <div className="mb-3 w-full">
                <input
                  type="phone"
                  className="border border-gray-300 text-gray-900 text-sm xl:text-base rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5 xl:p-3"
                  placeholder="Primary Phone *"
                  name="phone"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 w-full">
                <input
                  type="phone"
                  className="border border-gray-300 text-gray-900 text-sm xl:text-base rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5 xl:p-3"
                  placeholder="Secondary Phone"
                  name="phone_2"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 w-full xl:gap-4">
            <div className="w-full md:col-span-2">
              <input
                type="email"
                className="border border-gray-300 text-gray-900 text-sm xl:text-base rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5 xl:p-3"
                placeholder="Primary Email *"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:col-span-2">
              <input
                type="email"
                className="border border-gray-300 text-gray-900 text-sm xl:text-base rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5 xl:p-3"
                placeholder="Secondary Email"
                name="email_2"
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:col-span-2 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="border border-gray-300 text-gray-900 text-sm xl:text-base rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5 xl:p-3"
                placeholder="Password *"
                name="password"
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </div>
            </div>

            <div className="w-full md:col-span-2">
              <input
                type="text"
                className="border border-gray-300 text-gray-900 text-sm xl:text-base rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5 xl:p-3"
                placeholder="Client ID *"
                name="client_id"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex mt-3 justify-center w-full md:col-span-2">
            <button
              onClick={handleSubmit}
              className={`px-10 w-72 rounded-3xl bg-primary text-white text-sm font-medium xl:text-base ${
                loading
                  ? 'flex justify-center items-center py-2'
                  : 'py-2.5 xl:py-3'
              }`}
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 xl:w-7 xl:h-7 text-gray-500 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateClientPage
