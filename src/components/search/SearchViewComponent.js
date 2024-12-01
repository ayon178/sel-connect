'use client'

import React, { useEffect, useState } from 'react'

import { MdHomeWork } from 'react-icons/md'

import commonImage from '../../assets/common-side.PNG'
import CustomHeading from '../shared/CustomHeading'
import { useRouter } from 'next/navigation'
import { getPropertyByApartId } from '@/functions/api'

const SearchViewComponent = ({ dynamicId }) => {
  const router = useRouter()
  const [properties, setProperties] = useState([])

  useEffect(() => {
    let id
    if (typeof window !== 'undefined') {
      id = window.localStorage.getItem('selConnect')
      if (!id) {
        router.push('/auth/login')
      }
    }
    const fetchProperty = async () => {
      const propertyList = await getPropertyByApartId(dynamicId)
      setProperties(propertyList)
    }
    fetchProperty()
  }, [dynamicId])

  return (
    <div className="container mx-auto my-10 px-5">
      {' '}
      {/* 1 */}
      <CustomHeading firstText="Flat List" />
      <p className="text-gray-500 mb-5 text-xs md:text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
        hic!
      </p>
      <div className="flex justify-between items-start gap-10 flex-col md:flex-row">
        {' '}
        {/* 2 */}
        <div className="md:w-[55rem] w-full order-2 md:order-1">
          {' '}
          {/* 3 */}
          <div className="grid grid-cols-1 gap-4">
            {properties.map((property, index) => (
              <div
                key={index}
                onClick={() =>
                  router.push(`/user/search/flat-details/${property.id}`)
                }
                className="cursor-pointer"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[30rem] sticky top-24 order-1 md:order-2 hidden md:flex">
          {/* 4 */}
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

const PropertyCard = ({ property }) => {
  return (
    <div
      style={{
        boxShadow:
          '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
      }}
      className=" rounded-2xl  p-3"
    >
      <div className="md:flex gap-4 items-center">
        {' '}
        {/* 5 */}
        <div className="rounded-md bg-gray-300 p-2 h-full w-full md:w-1/3 flex items-center justify-center overflow-hidden">
          {/* 6 */}
          <img
            src={property.img_url}
            alt=""
            className="w-auto h-52 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full md:w-2/3 gap-2 mt-2">
          {/* 7 */}
          <h1 className="text-lg text-primary font-semibold">
            {property.title}
          </h1>
          <p className="text-sm text-gray-600">Address: {property.address}</p>

          <p className="text-sm text-gray-600">
            Property Type: {property.property_type}
          </p>
          <p className="text-sm text-gray-600">Level: {property.level}</p>
          <p className="text-sm text-gray-600">
            Unit Number: {property.unit_number}
          </p>

          <div className="w-full md:flex gap-4 items-center">
            {/* 8 */}
            <button className="bg-red-100 font-semibold text-sm md:w-1/2 w-full mb-2 md:mb-0 px-4 py-2 rounded-md flex items-center justify-between">
              {/* 9 */}
              <span>Commercial Space</span>{' '}
              <MdHomeWork className="inline-block text-primary text-xl" />
            </button>
            <button className="bg-yellow-100 font-semibold text-sm  md:w-1/2 w-full px-4 py-2 rounded-md flex items-center justify-between">
              {/* 10 */}
              <span>Company Owner</span>{' '}
              <MdHomeWork className="inline-block text-primary text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchViewComponent
