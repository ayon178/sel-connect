import React from 'react'
import commonImage from '../../assets/common-side.PNG'
import CustomHeading from '../shared/CustomHeading'

import { RiBuilding2Line } from 'react-icons/ri'
import { GiTakeMyMoney } from 'react-icons/gi'
import { FaCoins } from 'react-icons/fa'
import { TiHome } from 'react-icons/ti'
import { useRouter } from 'next/navigation'

import green from '../../assets/my_property/SEL_GREEN_ACRES.png'
import ashabori from '../../assets/my_property/SEL_Ashabori.png'

import construction from '../../assets/feedback/construction.png'
import afterSales from '../../assets/feedback/after_sales.png'
import payment from '../../assets/feedback/payment.png'
import interior from '../../assets/feedback/interior.png'

const data = [
  {
    title: 'Construction',
    icon: construction,
    link: '/feedback/construction',
  },
  {
    title: 'After Sales',
    icon: afterSales,
    link: '/feedback/after-sales',
  },
  {
    title: 'Payment',
    icon: payment,
    link: '/feedback/payment',
  },
  {
    title: 'Interior',
    icon: interior,
    link: '/feedback/interior',
  },
]

const PropertyDetails = ({ id }) => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-primary text-xl font-semibold w-fit">
                SEL Miraj
              </h1>
              <button className="bg-primary text-white px-5 py-2 rounded-lg">
                View Design
              </button>
            </div>

            <div className="w-full bg-gray-300 py-2 flex items-center overflow-hidden justify-center rounded-lg">
              <img
                src={id == 0 ? green.src : ashabori.src}
                alt=""
                className="w-60 rounded-lg"
              />
            </div>

            <div className="mt-10">
              <div className="mt-5 overflow-x-auto">
                {/* row */}
                <div className="flex items-center mt-3 border-b border-red-200 pb-1">
                  <div className="w-1/4">
                    <p className="text-primary">Divison</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-700">Dhaka</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-primary">Ownership</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-700">Company Owner</p>
                  </div>
                </div>
                {/* row */}
                <div className="flex items-center mt-3 border-b border-red-200 pb-1">
                  <div className="w-1/4">
                    <p className="text-primary">Area</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-700">Lalbag</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-primary">Property Type</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-700">Commercial Space</p>
                  </div>
                </div>
                {/* row */}
                <div className="flex items-center mt-3 border-b border-red-200 pb-1">
                  <div className="w-1/4">
                    <p className="text-primary">Address</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-700">Azimpur Road</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-primary">Property ID</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-700">5475454095686254</p>
                  </div>
                </div>
                {/* row */}
                <div className="flex items-center mt-3 border-b border-red-200 pb-1">
                  <div className="w-1/4">
                    <p className="text-primary">Level</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-700">1</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-primary">Web Link</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-700">www.google.com</p>
                  </div>
                </div>
                {/* row */}
                <div className="flex items-center mt-3 ">
                  <div className="w-1/4">
                    <p className="text-primary">Unit Number</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-700">1A</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="mt-10">
            <div className="flex justify-center">
              <CustomHeading firstText="Send Your Feedback" />
            </div>

            <div className="mt-3 grid grid-cols-4 gap-5">
              {data.map((item, index) => (
                <div
                  onClick={() => router.push(item.link)}
                  style={{
                    boxShadow: '1px 2px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  key={index}
                  className="flex flex-col items-center gap-4 mt-5 p-5 rounded-xl cursor-pointer"
                >
                  <div className=" text-primary p-3 rounded-md">
                    <img className="w-[50px]" src={item.icon.src} alt="" />
                  </div>
                  <h1 className="text-md font-semibold">{item.title}</h1>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push('/feedback')}
              className="bg-primary text-white px-5 py-2 rounded-lg w-full mt-10"
            >
              Feedback History
            </button>
          </div>
        </div>
        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
