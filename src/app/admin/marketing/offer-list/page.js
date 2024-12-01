'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import CustomHeading from '@/components/shared/CustomHeading'
import { getAllOffers } from '@/functions/api'
import Loader from '@/components/shared/Loader'

const OfferComponent = () => {
  const router = useRouter()
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const retriveOffers = async () => {
      const res = await getAllOffers()
      setOffers(res)
      setLoading(false)
    }
    retriveOffers()
  }, [])

  return (
    <div className=" mx-auto my-10 px-5">
      <div className="flex justify-between items-start gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Offers'} />

            {loading ? (
              <Loader />
            ) : (
              <div className="max-w-[1100px] mx-auto mt-10">
                <div className="grid grid-cols-1 gap-8">
                  {offers?.map((offer, i) => (
                    <div
                      onClick={() =>
                        router.push(`/admin/marketing/offer-list/${offer.id}`)
                      }
                      key={i}
                      className="shadow-lg rounded-2xl overflow-hidden"
                    >
                      <div className="w-full max-h-[300px]  rounded-xl overflow-hidden h4">
                        <img
                          src={offer.img_url}
                          alt=""
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <h1 className="text-center text-2xl text-primary font-semibold py-4 cursor-pointer">
                        {offer.title}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferComponent
