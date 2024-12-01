import React, { useEffect, useState } from 'react'
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
import { getPropertyById } from '@/functions/api'

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
  const [property, setProperty] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPropertyById(id)
      setProperty(data)
    }
    fetchData()
  }, [id])

  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between gap-10 flex-col md:flex-row">
        <div className="md:w-[55rem] w-full order-2 md:order-1">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-primary text-xl font-semibold w-fit">
                {property?.name}
              </h1>
              <button className="bg-primary text-white px-5 py-2 rounded-lg">
                View Design
              </button>
            </div>

            <div className="w-full bg-gray-300 py-2 flex items-center overflow-hidden justify-center rounded-lg">
              <img src={property.img_url} alt="" className="w-60 rounded-lg" />
            </div>

            <div className="mt-10">
              <div className="mt-5 overflow-x-auto">
                {/* row */}
                <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-primary">Divison</p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-gray-700 whitespace-nowrap">
                      {property.division}
                    </p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-primary">Ownership</p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-gray-700 whitespace-nowrap">
                      {property.owner_type}
                    </p>
                  </div>
                </div>
                {/* row */}
                <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-primary">Area</p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-gray-700 whitespace-nowrap">
                      {property.area}
                    </p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-primary whitespace-nowrap">
                      Property Type
                    </p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-gray-700 whitespace-nowrap">
                      {property.property_type}
                    </p>
                  </div>
                </div>
                {/* row */}
                <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-primary">Address</p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-gray-700">{property.address}</p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-primary whitespace-nowrap">
                      Property ID
                    </p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-gray-700">{property.id}</p>
                  </div>
                </div>
                {/* row */}
                <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-primary">Level</p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-gray-700 whitespace-nowrap">
                      {property.level}
                    </p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-primary whitespace-nowrap">Web Link</p>
                  </div>
                  <div className="md:w-1/4 w-1/2">
                    <p className="text-gray-700 whitespace-nowrap">
                      {property.web_link}
                    </p>
                  </div>
                </div>
                {/* row */}
                <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                  <div className="w-1/4">
                    <p className="text-primary whitespace-nowrap">
                      Unit Number
                    </p>
                  </div>
                  <div className="w-1/4 -ml-5 md:ml-0">
                    <p className="text-gray-700 whitespace-nowrap">
                      {property.unit_number}
                    </p>
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

            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-5">
              {data.map((item, index) => (
                <div
                  onClick={() => {
                    if (typeof item.link === 'string') {
                      router.push(`${item.link}?id=${id}`)
                    } else {
                      console.error('Invalid link:', item.link)
                    }
                  }}
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
              onClick={() => router.push('/user/feedback')}
              className="bg-primary text-white px-5 py-2 rounded-lg w-full mt-10"
            >
              Feedback History
            </button>
          </div>
        </div>
        <div className="max-w-[30rem] order-1 md:order-2">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
