import React from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '@/assets/common-side.PNG'

const PropertyOfferComponent = ({ offerId }) => {
  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Property Offers'} />
            <p className="text-sm text-slate-500 mb-5 md:mb-14">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <div className="shadow-lg rounded-2xl overflow-hidden">
              <img
                src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
                alt=""
              />

              <h1 className="text-center text-2xl text-primary font-semibold py-4 cursor-pointer">
                {offerId === '2' ? 'Eid Discount' : 'Discount'}
              </h1>

              <p className="text-sm text-gray-600 px-5 md:px-16 text-justify pb-8">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellendus, dolorem inventore nobis eligendi molestias dolorum
                necessitatibus alias voluptatem enim autem, quia optio hic quae
                blanditiis voluptates reiciendis, nulla assumenda totam
                laudantium asperiores! Repudiandae eveniet ratione laborum
                consectetur placeat alias, inventore totam vitae aspernatur
                reiciendis saepe at officia fugiat maxime veritatis.
              </p>
            </div>

            <div className="text-center mt-5">
              <button className=" bg-primary w-56 text-white px-8 text-sm font-semibold py-2 rounded-3xl">
                Claim Offer
              </button>
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

export default PropertyOfferComponent
