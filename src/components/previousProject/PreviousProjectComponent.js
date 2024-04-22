import { useRouter } from 'next/navigation'
import React from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '@/assets/common-side.PNG'

// image import
import imageOne from '../../assets/previous_project/1.jpg'
import imageTwo from '../../assets/previous_project/2.jpg'
import imageThree from '../../assets/previous_project/3.jpg'
import imageFour from '../../assets/previous_project/4.jpg'

const services = [
  {
    image: imageOne.src,
    title: 'SEL Nirbana Bhaban',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
  {
    image: imageTwo.src,
    title: 'SEL Nirbana Bhaban',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
  {
    image: imageThree.src,
    title: 'SEL Nirbana Bhaban',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
  {
    image: imageFour.src,
    title: 'SEL Nirbana Bhaban',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  },
]

const PreviousProjectComponent = () => {
  const router = useRouter()

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Previous Project'} />
            <p className="text-sm mb-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            {/* Service div */}
            <div className="max-w-[50rem] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {services.map((service, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      router.push(`/previous-project/${index + 1}`)
                    }
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </div>
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
      className="rounded-md w-62 p-2 pb-5"
    >
      <div className="rounded-md w-full h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full" />
      </div>
      <h1 className="text-md text-center mt-4 font-bold text-tertiaryText">
        {title}
      </h1>
    </div>
  )
}

export default PreviousProjectComponent
