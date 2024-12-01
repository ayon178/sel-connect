'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { getAllOffers } from '@/functions/api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PropertyAds = () => {
  const router = useRouter()
  const [propertyOffer, setPropertyOffer] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllOffers()
      setPropertyOffer(res)
    }
    fetchData()
  }, [])

  return (
    <div className=" mx-auto my-10 px-5">
      <div className="flex justify-between items-start gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Property'} secondText={'Ads'} />
            {/* <p className="text-sm text-slate-500 mb-5 md:mb-14">
              Unlock Exclusive Deals: Explore Our Offers
            </p> */}

            <div className="max-w-[800px] mx-auto">
              <div className="grid grid-cols-1 gap-8">
                {propertyOffer?.map((offer, i) => (
                  <div
                    onClick={() =>
                      router.push(`/admin/staff/view-property-ads/${offer.id}`)
                    }
                    key={i}
                    className="shadow-lg rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="w-full rounded-xl h-96 overflow-hidden h4">
                      <img
                        src={offer?.img_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-center text-2xl text-primary font-semibold py-4 cursor-pointer">
                      {offer?.title}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyAds
