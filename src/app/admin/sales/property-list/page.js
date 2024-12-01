'use client'

import React, { useEffect, useState } from 'react'

import { MdHomeWork } from 'react-icons/md'
import { IoSearch } from 'react-icons/io5'

import { useRouter } from 'next/navigation'
// import { getPropertiesByOwnerId } from '@/functions/api'
import CustomHeading from '@/components/shared/CustomHeading'

// import image from '../../../assets/SEL_GREEN_ACRES.png'
import { getAllApartmentList } from '@/functions/api'
import Loader from '@/components/shared/Loader'

const PropertyList = () => {
  const router = useRouter()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [filteredProperties, setFilteredProperties] = useState([])

  useEffect(() => {
    setLoading(true)
    const retriveData = async () => {
      const data = await getAllApartmentList()
      setProperties(data)
      setLoading(false)
    }
    retriveData()
  }, [])

  useEffect(() => {
    const filter = searchText.toLowerCase()
    const filtered = properties.filter(property =>
      Object.values(property).some(value =>
        String(value).toLowerCase().includes(filter)
      )
    )
    setFilteredProperties(filtered)
  }, [searchText, properties])

  return (
    <div className=" mx-auto my-10 px-5">
      {' '}
      {/* 1 */}
      <div className="flex justify-center mb-8 mt-14">
        <CustomHeading firstText="Property" secondText="List" />
      </div>
      <div className="flex max-w-[55rem] focus-within:border-primary mx-auto border border-gray-300 items-center rounded-md ">
        <input
          className="px-4 py-2 xl:text-base xl:px-6 xl:py-3 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
          type="text"
          placeholder="Search Properties..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <IoSearch className="w-5 h-5 text-gray-500 mr-4" />
      </div>
      <div className="flex justify-center items-center mb-8">
        {loading && <Loader />}
      </div>
      <div className="flex justify-between gap-10 flex-col md:flex-row">
        {' '}
        <div className="md:w-[55rem] w-full order-2 md:order-1">
          {' '}
          {/* 3 */}
          <div className="grid grid-cols-1 gap-4">
            {filteredProperties?.map((property, index) => (
              <div
                key={index}
                onClick={() =>
                  router.push(
                    `/admin/sales/property-list/all-properties/${property.id}`
                  )
                }
                className="cursor-pointer"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
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
            {property.name}
          </h1>
          <p className="text-sm text-gray-600">Address: {property.address}</p>
          <p className="text-sm text-gray-600">Area: {property.area}</p>

          <p className="text-sm text-gray-600">
            Property Type: {property.property_type}
          </p>
          <p className="text-sm text-gray-600">
            Owner Type: {property.owner_type}
          </p>
          <p className="text-sm text-gray-600">Web Link: {property.web_link}</p>

          {/* <div className="w-full md:flex gap-4 items-center">
            <button className="bg-red-100 font-semibold text-sm md:w-1/2 w-full mb-2 md:mb-0 px-4 py-2 rounded-md flex items-center justify-between">
              <span>Commercial Space</span>{' '}
              <MdHomeWork className="inline-block text-primary text-xl" />
            </button>
            <button className="bg-yellow-100 font-semibold text-sm  md:w-1/2 w-full px-4 py-2 rounded-md flex items-center justify-between">
              <span>Company Owner</span>{' '}
              <MdHomeWork className="inline-block text-primary text-xl" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default PropertyList
