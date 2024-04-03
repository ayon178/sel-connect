import React from 'react'

import { MdHomeWork } from 'react-icons/md'

import commonImage from '../../assets/common-side.PNG'
import CustomHeading from '../shared/CustomHeading'
import { useRouter } from 'next/navigation'
import green from '../../assets/my_property/SEL_GREEN_ACRES.png'
import ashabori from '../../assets/my_property/SEL_Ashabori.png'

const propertiesData = [
  {
    image: green,
    title: 'SEL GREEN ACRES',
    address: 'Plot-89/2, Road-12/A, Dhanmondi, Dhaka',
    type: 'Residential',
    floor: '8 storied building',
    flatPerFloor: '2',
    propertyId: 1,
  },
  {
    image: ashabori,
    title: 'SEL ASHABORI',
    address: 'Plot-13, Road-07, Sector-04, Uttara, Dhaka',
    type: 'Residential',
    floor: '10 ',
    flatPerFloor: '2',
    propertyId: 2,
  },
]

const PropertyList = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-10">
      <CustomHeading firstText="My Properties" />
      <p className="text-gray-500 mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
        hic!
      </p>
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="grid grid-cols-1 gap-4">
            {propertiesData.map((property, index) => (
              <div
                key={index}
                onClick={() => router.push(`/my-property/details/${index}`)}
                className="cursor-pointer"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

const PropertyCard = ({ property }) => {
  return (
    <div
      style={{
        boxShadow:
          '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)',
      }}
      className=" rounded-2xl  p-3"
    >
      <div className="flex gap-4 items-center">
        <div className="rounded-md bg-gray-300 py-2 h-full w-1/3 flex items-center justify-center overflow-hidden">
          <img src={property.image.src} alt="" className="w-auto h-52 rounded-md" />
        </div>
        <div className="flex flex-col w-2/3 gap-2 mt-2">
          <h1 className="text-lg text-primary font-semibold">
            {property.title}
          </h1>
          <p className="text-sm text-gray-600">Address: {property.address}</p>

          <p className="text-sm text-gray-600">
            Property Type: {property.type}
          </p>
          <p className="text-sm text-gray-600">
            Number of Floor: {property.floor}
          </p>
          <p className="text-sm text-gray-600">
            Flats Per Floor: {property.flatPerFloor}
          </p>

          <div className="w-full flex gap-4 items-center">
            <button className="bg-red-100 font-semibold text-sm w-1/2 px-4 py-2 rounded-md flex items-center justify-between">
              <span>Commercial Space</span>{' '}
              <MdHomeWork className="inline-block text-primary text-xl" />
            </button>
            <button className="bg-yellow-100 font-semibold text-sm w-1/2 px-4 py-2 rounded-md flex items-center justify-between">
              <span>Company Owner</span>{' '}
              <MdHomeWork className="inline-block text-primary text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyList
