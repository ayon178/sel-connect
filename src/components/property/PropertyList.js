import React from 'react'

import { MdHomeWork } from 'react-icons/md'

import commonImage from '../../assets/common-side.PNG'
import CustomHeading from '../shared/CustomHeading'

const img =
  'https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150749.jpg?w=740&t=st=1704012228~exp=1704012828~hmac=2d11dad894f5a971aa326103a462df14764112186057effe8190effe8855859e'
const propertiesData = [
  {
    image: img,
    title: 'SEL Miraj',
    address: 'Azimpur Road',
    level: '1',
    unit: '1A',
    area: 'Dhanmondi',
  },
  {
    image: img,
    title: 'SEL Miraj',
    address: 'Azimpur Road',
    level: '1',
    unit: '1A',
    area: 'Dhanmondi',
  },
  {
    image: img,
    title: 'SEL Miraj',
    address: 'Azimpur Road',
    level: '1',
    unit: '1A',
    area: 'Dhanmondi',
  },
]

const PropertyList = () => {
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
              <PropertyCard property={property} key={index} />
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
      onClick={() => (window.location.href = '/search/details')}
      style={{
        boxShadow:
          '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.2)',
      }}
      className=" rounded-md  p-3"
    >
      <div className="flex gap-4 items-center">
        <div className="rounded-md overflow-hidden">
          <img src={property.image} alt="" className="w-full h-36" />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <h1 className="text-lg text-primary font-semibold">
            {property.title}
          </h1>
          <p className="text-sm text-gray-600">Address: {property.address}</p>
          <p className="text-sm text-gray-600">Area: {property.area}</p>

          <p className="text-sm text-gray-600">Level: {property.level}</p>
          <p className="text-sm text-gray-600">Unit: {property.unit}</p>
        </div>
      </div>
      <div className="w-full flex gap-4 items-center mt-4">
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
  )
}

export default PropertyList
