import { useRouter } from 'next/navigation'
import React from 'react'
import imageOne from '../../assets/home/gallery.jpg'
import imageTwo from '../../assets/home/previous_project.jpg'
import imageThree from '../../assets/home/offer.jpg'

const services = [
  {
    image: imageOne,
    title: 'Design Gallery',
    description: 'Explore Inspiring Home Designs: Your Design Gallery',
    link: '/interior-design',
  },
  {
    image: imageTwo,
    title: 'Previous Project',
    description: 'Discover Our Portfolio: Previous Home Design Projects',
    link: '/previous-project',
  },
  {
    image: imageThree,
    title: 'Interior Offers',
    description: 'Exclusive Deals Await: Interior Offers for Your Dream Home',
    link: '/interior-offer',
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
            Transforming your home with world-class interior services.
          </p>
        </div>
      </div>

      {/* Service div */}
      <div className="max-w-[60rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {services.map((service, index) => (
            <ServiceCard router={router} service={service} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Service

const ServiceCard = ({ service, router }) => {
  const { image, title, description } = service
  return (
    <div
      onClick={() => router.push(service.link)}
      style={{
        boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
      }}
      className="rounded-md w-72 p-2 pb-5 cursor-pointer"
    >
      <div className="rounded-md overflow-hidden h-36">
        <img src={image.src} alt={title} className="w-full h-auto" />
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
