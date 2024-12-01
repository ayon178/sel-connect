'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '@/assets/common-side.PNG'

import imageOne from '../../assets/offer/interior_offer_1.png'
import imageTwo from '../../assets/offer/interior_offer_2.png'

const OfferComponent = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between items-start gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center mt-14 justify-start">
            <CustomHeading firstText={'Offers'} />
            <p className="text-sm text-slate-500 mb-5 md:mb-14">
              Unlock Exclusive Deals: Explore Our Offers
            </p>

            <div className="max-w-[800px] mx-auto">
              <div className="grid grid-cols-1 gap-8">
                {Array(2)
                  .fill()
                  .map((_, i) => (
                    <div
                      onClick={() =>
                        router.push(`/user/offer/property-offer/${i + 1}`)
                      }
                      key={i}
                      className="shadow-lg rounded-2xl overflow-hidden"
                    >
                      <div className="w-full rounded-xl overflow-hidden h4">
                        <img
                          src={i === 1 ? imageOne.src : imageTwo.src}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                      <h1 className="text-center text-2xl text-primary font-semibold py-4 cursor-pointer">
                        {i === 1 ? 'Eid Discount' : 'Discount'}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[30rem] sticky top-24 hidden md:flex">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default OfferComponent
