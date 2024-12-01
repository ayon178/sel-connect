'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { getPropertyById } from '@/functions/api'
import React, { useEffect, useState } from 'react'

const PropertyDetails = ({ params }) => {
  const id = params.propertyView

  const [property, setProperty] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPropertyById(id)
      setProperty(data)
    }
    fetchData()
  }, [id])

  return (
    <div className="p-5">
      <div className="flex justify-center mb-8">
        <CustomHeading firstText="Property" secondText="List" />
      </div>

      <div className="md:w-[55rem] mx-auto w-full order-2 md:order-1">
        <div className="max-w-[900px] mx-auto">
          <div className="w-full bg-gray-300 py-2 flex items-center overflow-hidden justify-center rounded-lg">
            <img src={property.img_url} alt="" className="w-60 rounded-lg" />
          </div>

          <h1 className="text-primary text-xl font-semibold mt-6 pb-2 mb-4 w-fit border-b-primary border-b-2">
            {property?.name}
          </h1>

          <div className="">
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
                  <p className="text-gray-700">
                    {property.address}
                  </p>
                </div>
                <div className="md:w-1/4 w-1/2">
                  <p className="text-primary whitespace-nowrap">Property ID</p>
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
                  <p className="text-primary whitespace-nowrap">Unit Number</p>
                </div>
                <div className="w-1/4 -ml-5 md:ml-0">
                  <p className="text-gray-700 whitespace-nowrap">
                    {property.unit_number}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button className="bg-primary font-semibold text-sm text-white w-full mb-2 md:mb-0 px-4 py-2 rounded-md flex items-center justify-center mt-14">
            Show Layout Design
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
