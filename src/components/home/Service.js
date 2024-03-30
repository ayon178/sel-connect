import { useRouter } from 'next/navigation'
import React from 'react'

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

const Service = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto my-20">
      {/* Text header */}
      <div className="flex items-center gap-4">
        {/* <div className="bg-primary h-16 w-1"></div> */}
        <div className="text-center w-full">
          <h1 className="text-2xl font-bold text-gray-800">
            View Our <span className="text-primary">Interior</span> Services
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>

      {/* Service div */}
      <div className="max-w-[60rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {services.map((service, index) => (
            <ServiceCard service={service} key={index} />
          ))}
        </div>
        <div className="flex justify-end mr-5">
          <button
            className="bg-primary text-white mt-5 py-2 px-4 rounded-md"
            onClick={() => router.push('/previous-project')}
          >
            Previous Project
          </button>
        </div>
      </div>
    </div>
  )
}

export default Service

const ServiceCard = ({ service }) => {
  const { image, title, description } = service
  return (
    <div
      style={{
        boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
      }}
      className="rounded-md w-72 p-2 pb-5"
    >
      <div className="rounded-md overflow-hidden">
        <img src={image} alt={title} className="w-full h-auto" />
      </div>
      <h1 className="text-md text-center mt-2 font-bold text-tertiaryText">
        {title}
      </h1>
      <p className="text-[12px] mt-2 text-center text-gray-600 px-5">
        {description}
      </p>
    </div>
  )
}
