'use client'

import React, { useEffect, useState } from 'react'
import commonImage from '../../assets/common-side.PNG'

import { useRouter } from 'next/navigation'
import { getPropertyById } from '@/functions/api'

const FlatDetailsComponent = ({ dynamicId }) => {
  const router = useRouter()
  const [property, setProperty] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPropertyById(dynamicId)
      setProperty(data)
    }
    fetchData()
  }, [dynamicId])

  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between items-start gap-10 flex-col md:flex-row">
        <div className="md:w-[55rem] w-full order-2 md:order-1">
          <div className="max-w-[900px] mx-auto">
            <div className="w-full bg-gray-300 py-2 flex items-center overflow-hidden justify-center rounded-lg">
              <img src={property.img_url} alt="" className="w-60 rounded-lg" />
            </div>
            <div className="flex items-center justify-center mt-5">
              <h1 className="text-primary text-xl font-semibold w-fit">
                {property?.name}
              </h1>
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

            <div className="flex items-center justify-center mt-5">
              <button className="bg-primary text-white px-5 py-2 rounded-lg">
                View Design
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[30rem] order-1 md:order-2 hidden md:flex">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default FlatDetailsComponent
