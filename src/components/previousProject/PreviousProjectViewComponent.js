import React from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '@/assets/common-side.PNG'

const PreviousProjectViewComponent = ({ projectId }) => {
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

            <div className="max-w-[800px] mx-auto ">
              <div className="shadow-lg rounded-2xl overflow-hidden">
                <img
                  src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
                  alt=""
                />
              </div>

              <h1 className=" text-2xl text-center text-primary font-semibold pt-4 pb-2 cursor-pointer">
                {projectId === '2' ? 'Eid Discount' : 'Discount'}
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

        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default PreviousProjectViewComponent
