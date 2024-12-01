'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { getInteriorOfferById } from '@/functions/api'
import React, { useEffect, useState } from 'react'

const InteriorOfferView = ({ params }) => {
  const { interiorOfferView } = params
  const [offer, setOffer] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInteriorOfferById(interiorOfferView)
        setOffer(response)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [interiorOfferView])

  return (
    <div className=" mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Offer View'} />

            <div className="max-w-[600px] mx-auto mt-5">
              <div className="rounded-xl overflow-hidden w-[100%] md:w-[600px] h-96 bg-gray-200">
                <img
                  className="rounded-lg w-full h-full object-cover"
                  src={offer?.img_url}
                  alt=""
                />
              </div>
              <h1 className="text-center mt-4 mb-6 text-primary text-2xl font-semibold">
                {offer?.title}
              </h1>
              <div className="border border-gray-400 rounded-xl flex items-center justify-center">
                <h1 className="px-10 py-3 text-lg text-black font-semibold">
                  {offer?.desc}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteriorOfferView
