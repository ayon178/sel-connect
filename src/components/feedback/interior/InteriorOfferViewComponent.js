import CustomHeading from '@/components/shared/CustomHeading'
import React from 'react'
import commonImage from '@/assets/common-side.PNG'

// image import
import imageOne from '../../../assets/interior_offer/interior_offer_1.png'
import imageTwo from '../../../assets/interior_offer/interior_offer_2.png'

const InteriorOfferViewComponent = ({ dynamicId }) => {
  
  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Offer View'} />
            <p className="text-sm mb-8 mt-2 text-center sm:text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <div className="max-w-[600px] mx-auto mt-5">
              <img
                className="rounded-lg"
                src={dynamicId === '1' ? imageOne.src : imageTwo.src}
                alt=""
              />
              <h1 className="text-center mt-4 mb-6 text-primary text-2xl font-semibold">
                {dynamicId === '1' ? 'Discount' : 'Offer for SEL'}
              </h1>
              <div className="border border-gray-400 rounded-xl flex items-center justify-center">
                <h1 className="px-10 py-3 text-lg text-black font-semibold">
                  Giving 10% off
                </h1>
              </div>
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

export default InteriorOfferViewComponent
