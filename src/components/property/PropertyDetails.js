import React from 'react'
import commonImage from '../../assets/common-side.PNG'
import CustomHeading from '../shared/CustomHeading'

import { RiBuilding2Line } from 'react-icons/ri'
import { GiTakeMyMoney } from 'react-icons/gi'
import { FaCoins } from 'react-icons/fa'
import { TiHome } from 'react-icons/ti'

const data = [
  {
    title: 'Construction',
    icon: <RiBuilding2Line size={40} />,
  },
  {
    title: 'After Sales',
    icon: <GiTakeMyMoney size={40} />,
  },
  {
    title: 'Payment',
    icon: <FaCoins size={40} />,
  },
  {
    title: 'Interior',
    icon: <TiHome size={40} />,
  },
]

const PropertyDetails = () => {
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

            <img
              src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
              alt=""
              className="w-full rounded-lg"
            />

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
                  onClick={() =>
                    (window.location.href = '/feedback/custom-feedback')
                  }
                  style={{
                    boxShadow: '1px 2px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  key={index}
                  className="flex flex-col items-center gap-4 mt-5 p-5 rounded-xl"
                >
                  <div className=" text-primary p-3 rounded-md">
                    {item.icon}
                  </div>
                  <h1 className="text-md font-semibold">{item.title}</h1>
                </div>
              ))}
            </div>

            <button
              onClick={() => (window.location.href = '/feedback')}
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
