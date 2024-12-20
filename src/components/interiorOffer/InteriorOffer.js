'use client'

import React from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '../../assets/common-side.PNG'
import { useRouter } from 'next/navigation'

// image import
import imageOne from '../../assets/interior_offer/interior_offer_1.png'
import imageTwo from '../../assets/interior_offer/interior_offer_2.png'

const services = [
  {
    image: imageOne.src,
    title: 'Discount',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
  {
    image: imageTwo.src,
    title: 'Offer For SEL',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
]

const InteriorOffer = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Interior Offers'} />
            <p className="text-sm mb-0 sm:mb-8 mt-2 text-center sm:text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() =>
                    router.push(`/user/interior-offer/${index + 1}`)
                  }
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[30rem] hidden md:flex">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

const ServiceCard = ({ service }) => {
  const { image, title, description } = service
  return (
    <div className="cursor-pointer rounded-xl w-72 p-2 pb-5">
      <div className="rounded-xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-auto" />
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

export default InteriorOffer
