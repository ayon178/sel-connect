'use client'

import React, { useEffect, useState } from 'react'

import { getOfferById } from '@/functions/api'
import CustomHeading from '@/components/shared/CustomHeading'

const PropertyOfferView = ({ params }) => {
  const id = params.offerView
  const [offer, setOffer] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOfferById(id)
      setOffer(data)
    }
    fetchData()
  }, [id])

  return (
    <div className=" mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Property Offer'} />
            {/* <p className="text-sm text-slate-500 mb-5 md:mb-14">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p> */}

            <div className="shadow-lg rounded-2xl overflow-hidden text-center mt-5">
              <img src={offer?.img_url} alt="" className="w-full" />

              <h1 className="text-center text-2xl text-primary font-semibold py-4 cursor-pointer">
                {offer?.title}
              </h1>

              <p className="text-sm text-gray-600 px-5 md:px-16 text-justify pb-8">
                {offer?.desc}
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

export default PropertyOfferView
