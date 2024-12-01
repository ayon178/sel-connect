'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import imageOne from '../../assets/home/gallery.jpg'
import imageTwo from '../../assets/home/previous_project.jpg'
import imageThree from '../../assets/home/offer.jpg'

const services = [
  {
    image: imageOne,
    title: 'Design Gallery',
    description: 'Explore Inspiring Home Designs: Your Design Gallery',
    link: '/user/interior-design',
  },
  {
    image: imageTwo,
    title: 'Previous Project',
    description: 'Discover Our Portfolio: Previous Home Design Projects',
    link: '/user/previous-project',
  },
  {
    image: imageThree,
    title: 'Interior Offers',
    description: 'Exclusive Deals Await: Interior Offers for Your Dream Home',
    link: '/user/interior-offer',
  },
]

const Service = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto my-20 px-4">
      {/* Text header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          View Our <span className="text-primary">Interior</span> Services
        </h1>
        <p className="mt-2 text-gray-600 text-sm">
          Transforming your home with world-class interior services.
        </p>
      </div>

      {/* Service div */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {services.map((service, index) => (
          <ServiceCard service={service} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Service

const ServiceCard = ({ service }) => {
  const { image, title, description, link } = service
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(link)}
      className="rounded-md p-2 pb-5 cursor-pointer"
      style={{
        boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
        maxWidth: '320px',
        margin: 'auto',
      }}
    >
      <div className="rounded-md overflow-hidden h-36">
        {/* Use next/image for optimized image loading */}
        <Image
          src={image.src}
          alt={title}
          width={320}
          height={144}
          layout="responsive"
        />
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
