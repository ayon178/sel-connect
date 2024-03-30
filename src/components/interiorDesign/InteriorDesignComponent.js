import React from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '@/assets/common-side.PNG'

const InteriorDesignComponent = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <CustomHeading firstText={'Interior Design'} />
          <p className="text-sm mb-8">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
            doloribus magni voluptatum
          </p>

          {/* images */}
          <div className="">
            <img
              className="rounded-lg"
              src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
              alt=""
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <img
              className="rounded-lg"
              src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
              alt=""
            />
            <img
              className="rounded-lg"
              src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
              alt=""
            />
          </div>
        </div>

        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default InteriorDesignComponent
