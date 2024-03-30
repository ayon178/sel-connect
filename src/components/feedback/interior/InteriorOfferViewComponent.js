import CustomHeading from '@/components/shared/CustomHeading'
import React from 'react'
import commonImage from '@/assets/common-side.PNG'

const InteriorOfferViewComponent = ({ dynamicId }) => {
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Offer View'} />
            <p className="text-sm mb-8 mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <div className="max-w-[600px] mx-auto mt-5">
              <img
                className="rounded-lg"
                src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
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

        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default InteriorOfferViewComponent
