import React from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '@/assets/common-side.PNG'
import interior from '@/assets/interior_design/interior.jpeg'
import interior2 from '@/assets/interior_design/interior-2.png'
import interior3 from '@/assets/interior_design/interior-3.png'
import interior4 from '@/assets/interior_design/interior-4.png'

const InteriorDesignComponent = () => {
  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between items-start gap-10">
        <div className="w-[55rem] mt-10">
          <CustomHeading firstText={'Interior Design'} />
          <p className="text-sm mb-8">
            Transforming your home with world-class interior services
          </p>

          {/* images */}
          <div className="">
            <img className="rounded-lg" src={interior.src} alt="" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <img className="rounded-lg" src={interior2.src} alt="" />
            <img className="rounded-lg" src={interior3.src} alt="" />
            <img className="rounded-lg" src={interior4.src} alt="" />
          </div>
        </div>

        <div className="max-w-[30rem] sticky top-24 hidden md:flex">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default InteriorDesignComponent
