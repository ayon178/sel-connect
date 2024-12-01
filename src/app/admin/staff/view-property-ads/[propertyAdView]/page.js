'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { getOfferById } from '@/functions/api'
import React, { useEffect, useState } from 'react'

const PropertyAdView = ({ params }) => {
  const { propertyAdView } = params
  const [propertyAd, setPropertyAd] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOfferById(propertyAdView)
      setPropertyAd(res)
    }
    fetchData()
  }, [propertyAdView])

  return (
    <div className=" mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Property Offers'} />
            <p className="text-sm text-slate-500 mb-5 md:mb-14">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <div className="shadow-lg rounded-2xl overflow-hidden">
              <div className="w-full rounded-xl h-96 overflow-hidden h4">
                <img src={propertyAd?.img_url} alt="" className='h-full w-full object-cover'/>
              </div>

              <h1 className="text-center text-2xl text-primary font-semibold py-4 cursor-pointer">
                {propertyAd?.title}
              </h1>

              <p className="text-sm text-gray-600 px-5 md:px-16 text-justify pb-8">
                {propertyAd?.desc}
              </p>
            </div>

            {/* <div className="text-center mt-5">
              <button className=" bg-primary w-56 text-white px-8 text-sm font-semibold py-2 rounded-3xl">
                Claim Offer
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyAdView
