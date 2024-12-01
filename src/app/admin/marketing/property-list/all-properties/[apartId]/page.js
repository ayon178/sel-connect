'use client'

import React, { useEffect, useState } from 'react'

import { MdHomeWork } from 'react-icons/md'
import { IoSearch } from 'react-icons/io5'

import CustomHeading from '@/components/shared/CustomHeading'

import {
  getPropertyByApartIdAdminWithOwner,
} from '@/functions/api'
import Loader from '@/components/shared/Loader'
import { useRouter } from 'next/navigation'
import EditProperty from '@/components/popup/EditProperty'

const AllProperties = ({ params }) => {
  const [editPopup, setEditPopup] = useState(false)
  const id = params.apartId
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [filteredProperties, setFilteredProperties] = useState([])
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('available')
  const [selectedProperty, setSelectedProperty] = useState({})
  const [refetch, setRefetch] = useState(Math.random())

  useEffect(() => {
    setLoading(true)
    const retriveData = async () => {
      const data = await getPropertyByApartIdAdminWithOwner(id, activeTab)
      setProperties(data)
      setLoading(false)
    }
    retriveData()
  }, [id, activeTab, refetch])

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
    <>
      <div className=" mx-auto my-10 px-5">
        <div className="flex justify-center mb-8">
          <CustomHeading firstText="Property" secondText="List" />
        </div>
        <div className="flex max-w-[55rem] focus-within:border-primary mx-auto border border-gray-300 items-center rounded-md ">
          <input
            className="px-4 py-2  text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 xl:py-3 xl:text-md"
            type="text"
            placeholder="Search Properties..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <IoSearch className="w-5 h-5 text-gray-500 mr-4" />
        </div>

        <div className="flex justify-center mt-8">
          <div
            className="inline-flex rounded-md shadow-sm border-gray-300 rounded-s-lg overflow-hidden"
            role="group"
          >
            <button
              onClick={() => setActiveTab('available')}
              type="button"
              className={`${
                activeTab === 'available' ? 'bg-[#fdddd6] ' : 'bg-white'
              } px-4 py-2 w-44 text-sm  border  hover:bg-gray-100 hover:text-primary focus:z-10 text-slate-700 font-semibold  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              Available Properties
            </button>
            <button
              onClick={() => setActiveTab('all')}
              type="button"
              className={`${
                activeTab === 'all' ? 'bg-[#fdddd6] ' : 'bg-white'
              } px-4 py-2 w-44 text-sm  border  hover:bg-gray-100 hover:text-primary focus:z-10 text-slate-700 font-semibold  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
            >
              All Properties
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center mb-4">
          {loading && <Loader />}
        </div>

        <h1 className="text-right text-slate-700 font-semibold mb-2 text-xs">
          {properties.length} Properties found
        </h1>

        <div className="flex justify-between gap-10 flex-col md:flex-row">
          {' '}
          <div className="md:w-[55rem] w-full order-2 md:order-1">
            <div className="grid grid-cols-1 gap-4">
              {filteredProperties?.map((property, index) => (
                <div
                  onClick={() => setSelectedProperty(property)}
                  key={index}
                  className="cursor-pointer"
                >
                  <PropertyCard
                    id={id}
                    property={property}
                    setEditPopup={setEditPopup}
                    router={router}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {editPopup && (
        <EditProperty
          data={selectedProperty}
          setOpenPopup={setEditPopup}
          setRefetch={setRefetch}
        />
      )}
    </>
  )
}

const PropertyCard = ({ property, setEditPopup, id, router }) => {
  return (
    <>
      <div
        style={{
          boxShadow:
            '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
        }}
        className=" rounded-2xl  p-3"
      >
        <div className="md:flex gap-4 items-center">
          <div
            onClick={() =>
              router.push(
                `/admin/marketing/property-list/all-properties/${id}/details/${property.id}`
              )
            }
            className="rounded-md bg-gray-300 p-2 h-full w-full md:w-1/3 flex items-center justify-center overflow-hidden"
          >
            <img
              src={property.img_url}
              alt=""
              className="w-auto h-52 rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center w-full md:w-2/3 gap-2 mt-2">
            <div className="flex justify-center md:justify-end">
              <button
                onClick={() => setEditPopup(true)}
                className="bg-white z-50 px-4 py-1 hover:text-white hover:bg-primary  border border-primary text-primary rounded-md"
              >
                Edit Property
              </button>
            </div>
            <div
              className="md:-mt-10"
              onClick={() =>
                router.push(
                  `/admin/marketing/property-list/all-properties/${id}/details/${property.id}`
                )
              }
            >
              <h1 className="text-lg text-primary font-semibold">
                {property.name}
              </h1>
              <p className="text-sm text-gray-600">
                Address: {property.address}
              </p>

              <p className="text-sm text-gray-600">
                Property Type: {property.property_type}
              </p>
              <p className="text-sm text-gray-600">Level: {property.level}</p>
              <p className="text-sm text-gray-600">
                Unit Number: {property.unit_number}
              </p>

              <div className="w-full md:flex gap-4 items-center">
                <button className="bg-red-100 font-semibold text-sm md:w-1/2 w-full mb-2 md:mb-0 px-4 py-2 rounded-md flex items-center justify-between">
                  <span>Commercial Space</span>{' '}
                  <MdHomeWork className="inline-block text-primary text-xl" />
                </button>
                <button className="bg-yellow-100 font-semibold text-sm  md:w-1/2 w-full px-4 py-2 rounded-md flex items-center justify-between">
                  <span>Company Owner</span>{' '}
                  <MdHomeWork className="inline-block text-primary text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllProperties
