'use client'

import AssignPropertyFromAdmin from '@/components/popup/AssignPropertyFromAdmin'
import CustomHeading from '@/components/shared/CustomHeading'
import Loader from '@/components/shared/Loader'
import { getAllApartmentList, updateApartmentList } from '@/functions/api'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdHomeWork } from 'react-icons/md'

const AdminId = ({ params }) => {
  const id = params.adminId
  const [apartments, setApartments] = useState([])
  const [openPopup, setOpenPopup] = useState(false)
  const [selectedApartment, setSelectedApartment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [clickLoader, setClickLoader] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllApartmentList()
      setApartments(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleAssignProperty = async () => {
    setClickLoader(true)
    const isUpdated = await updateApartmentList(
      'sub_con',
      selectedApartment,
      id
    )

    if (isUpdated) {
      toast.success('Property assigned successfully')
    } else {
      toast.error('Failed to assign property')
    }
    setClickLoader(false)
    setOpenPopup(false)
  }

  return (
    <>
      <div className="p-5">
        <div className="flex justify-center mb-8">
          <CustomHeading firstText="Apartment" secondText="List" />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-[800px] mx-auto flex justify-between gap-10 flex-col md:flex-row">
            <div className="md:w-[55rem] w-full order-2 md:order-1">
              <div className="grid grid-cols-1 gap-4">
                {apartments.map((property, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setOpenPopup(true)
                      setSelectedApartment(property.id)
                    }}
                    className="cursor-pointer"
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {openPopup && (
        <AssignPropertyFromAdmin
          setOpenPopup={setOpenPopup}
          func={handleAssignProperty}
          clickLoader={clickLoader}
          setLoading={setLoading}
        />
      )}
    </>
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
      <div className="md:flex gap-4 ">
        <div className="rounded-md bg-gray-300 p-2 h-full w-full md:w-1/3 flex items-center justify-center overflow-hidden">
          <img
            src={property.img_url}
            alt=""
            className="w-auto h-52 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full md:w-2/3 gap-2 mt-2">
          <h1 className="text-lg text-primary font-semibold">
            {property.name}
          </h1>
          <p className="text-sm text-gray-600">Address: {property.address}</p>

          <p className="text-sm text-gray-600">
            Property Type: {property.property_type}
          </p>
          <p className="text-sm text-gray-600">
            Owner Type: {property.owner_type}
          </p>
          <p className="text-sm text-gray-600">Area: {property.area}</p>

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

export default AdminId
