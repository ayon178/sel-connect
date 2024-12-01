import React from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '@/assets/common-side.PNG'

// image import
import imageOne from '../../assets/previous_project/1.jpg'
import imageTwo from '../../assets/previous_project/2.jpg'
import imageThree from '../../assets/previous_project/3.png'
import imageFour from '../../assets/previous_project/4.png'

const PreviousProjectViewComponent = ({ id }) => {
  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Previous Project'} />
            <p className="text-sm mb-8 text-center sm:text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <div className="max-w-[800px] mx-auto ">
              <div className="shadow-lg w-full h-64 rounded-2xl overflow-hidden">
                <img
                  src={
                    id === '1'
                      ? imageOne.src
                      : id === '2'
                      ? imageTwo.src
                      : id === '3'
                      ? imageThree.src
                      : imageFour.src
                  }
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <h1 className=" text-2xl text-center text-primary font-semibold pt-4 pb-2 cursor-pointer">
                {'SEL Nirbana Bhaban'}
              </h1>

              <p className="text-[12px] text-center text-gray-700">
                Location: Dhaka
              </p>

              <div className="flex flex-col items-center border px-4 py-4 rounded-xl mt-4 border-gray-400 ">
                <h1 className="text-lg mb-2">Project Description</h1>
                <p className="text-sm text-gray-600 text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repellendus, dolorem inventore nobis eligendi molestias
                  dolorum necessitatibus alias voluptatem enim autem, quia optio
                  hic quae blanditiis voluptates reiciendis, nulla assumenda
                  totam laudantium asperiores! Repudiandae eveniet ratione
                  laborum consectetur placeat alias, inventore totam vitae
                  aspernatur reiciendis saepe at officia fugiat maxime
                  veritatis.
                </p>
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

export default PreviousProjectViewComponent
