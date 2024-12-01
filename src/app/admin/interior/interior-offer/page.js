'use client'

import React, { useEffect, useState } from 'react'
import { getInteriorOffers } from '@/functions/api'
import { useRouter } from 'next/navigation'
import CustomHeading from '@/components/shared/CustomHeading'

const Offer = () => {
  const router = useRouter()
  const [offer, setOffer] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInteriorOffers()
        setOffer(response)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className=" mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Interior'} secondText={'Offers'} />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
              {offer?.map((service, index) => (
                <div
                  key={index}
                  onClick={() =>
                    router.push(`/admin/interior/interior-offer/${service.id}`)
                  }
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ServiceCard = ({ service }) => {
  const { title, img_url } = service
  return (
    <div className="cursor-pointer rounded-xl w-full sm:w-72 p-2 pb-5">
      <div className="rounded-xl overflow-hidden h-44">
        <img src={img_url} alt={title} className="w-full h-full object-cover" />
      </div>

      <div
        style={{
          boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
        }}
        className="rounded-xl px-2 py-3 mt-3"
      >
        <h1 className="text-md text-center  font-bold text-primary">{title}</h1>
      </div>
    </div>
  )
}

export default Offer
