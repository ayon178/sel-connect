import React from 'react'
import commonImage from '../../../assets/common-side.PNG'
import CustomHeading from '@/components/shared/CustomHeading'

import { BsPeople } from 'react-icons/bs'
import { VscFeedback } from 'react-icons/vsc'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const img =
  'https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150749.jpg?w=740&t=st=1704012228~exp=1704012828~hmac=2d11dad894f5a971aa326103a462df14764112186057effe8190effe8855859e'
const services = [
  {
    image: img,
    title: 'Interior Design',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
  {
    image: img,
    title: 'Interior Design',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
  {
    image: img,
    title: 'Interior Design',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
]

const InteriorFeedback = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Interior'} />
            <p className="text-sm mb-8 mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            {/* option cards */}
            <div className="w-full mb-20 md:w-1/2 gap-5 mx-auto flex justify-between items-center">
              <div
                onClick={() => router.push('/feedback/interior/create-event')}
                style={{
                  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
                }}
                className="flex cursor-pointer flex-col w-1/2 items-center gap-2 p-4 bg-white shadow-md rounded-xl"
              >
                <BsPeople className="text-3xl text-primary" />
                <h3 className="text-sm ">Schedule a meeting</h3>
              </div>

              <div
                onClick={() =>
                  router.push('/feedback/interior/custom-feedback')
                }
                style={{
                  boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
                }}
                className="flex cursor-pointer flex-col w-1/2 items-center gap-2 p-4 bg-white shadow-md rounded-lg"
              >
                <VscFeedback className="text-3xl text-primary" />
                <h3 className="text-sm ">Send a feedback</h3>
              </div>
            </div>

            <CustomHeading firstText={'View Out Interior Services'} />
            <p className="text-sm mb-8 mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            {/* Service div */}
            <div className="max-w-[60rem] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                {services.map((service, index) => (
                  <ServiceCard service={service} key={index} />
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                router.push('/feedback/after-sales/custom-feedback')
              }
              className="bg-primary text-white w-full flex items-center justify-between py-2 px-10 mt-10 rounded-2xl"
            >
              <span>Meeting History</span>
              <MdKeyboardArrowRight size={25} />
            </button>
          </div>
        </div>

        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

const ServiceCard = ({ service }) => {
  const { image, title, description } = service
  return (
    <div
      style={{
        boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
      }}
      className="rounded-xl w-72 p-2 pb-5"
    >
      <div className="rounded-md overflow-hidden">
        <img src={image} alt={title} className="w-full h-auto" />
      </div>
      <h1 className="text-md mt-2 font-bold text-tertiaryText">{title}</h1>
      <p className="text-[12px] mt-2 text-gray-600 pr-5">{description}</p>
    </div>
  )
}

export default InteriorFeedback
