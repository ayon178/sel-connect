import {
  getAllApartmentList,
  getApartmentByAdmin,
  getPropertiesByOwnerId,
  getPropertyByApartId,
} from '@/functions/api'
import React, { useEffect, useState } from 'react'

import { RxCross2 } from 'react-icons/rx'
import Loader from '../shared/Loader'

const SalesPropertyPopup = ({ setOpenPopup, user_id }) => {
  const [properties, setProperties] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedProperties, setSelectedProperties] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const retrieveData = async () => {
      const data = await getPropertiesByOwnerId(user_id)
      setProperties(data)
      setLoading(false)
    }
    retrieveData()
  }, [])

  // useEffect(() => {
  //   if (selectedId) {
  //     setLoading(true)
  //     const retrieveData = async () => {
  //       const data = await getPropertyByApartId(selectedId)
  //       setSelectedProperties(data)
  //       setLoading(false)
  //     }
  //     retrieveData()
  //   }
  // }, [selectedId])

  return (
    <>
      <div className="popup_wrapper">
        <div className="popup_content popup_content_property popup_bg">
          <div className="">
            <h1 className="text-2xl mb-5 font-semibold text-gray-800">
              {/* {!selectedId ? 'Apartments' : 'Property List'} */}
              Property List
            </h1>

            {/* Cross icon */}
            <div
              onClick={() => setOpenPopup(false)}
              className="bg-primary cursor-pointer absolute top-2 right-2 rounded-full p-1"
            >
              <RxCross2 className="text-xl text-white cursor-pointer " />
            </div>

            {loading ? (
              <Loader />
            ) : (
              <>
                {properties.length === 0 ? (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-gray-500">No properties found</p>
                  </div>
                ) : (
                  <div>
                    {!selectedId ? (
                      <div className="grid grid-cols-1 gap-4">
                        {properties.map((property, index) => (
                          <div
                            key={index}
                            // onClick={() => {
                            //   setSelectedId(property.id)
                            // }}
                            className="cursor-pointer"
                          >
                            <PropertyCard
                              property={property}
                              selectedId={selectedId}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {selectedProperties.map((property, index) => (
                          <div key={index} className="cursor-pointer">
                            <PropertyCard
                              property={property}
                              selectedId={selectedId}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const PropertyCard = ({ property, selectedId }) => {
  return (
    <div
      style={{
        boxShadow:
          '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
      }}
      className=" rounded-2xl p-3"
    >
      <div className="md:flex gap-4 items-center">
        <div className="rounded-md bg-gray-300 p-2 h-full w-full md:w-1/3 flex items-center justify-center overflow-hidden">
          <img
            src={property.img_url}
            alt=""
            className="w-auto h-32 rounded-md"
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
          {selectedId && (
            <>
              <p className="text-sm text-gray-600">Level: {property.level}</p>
              <p className="text-sm text-gray-600">
                Unit Number: {property.unit_number}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesPropertyPopup
