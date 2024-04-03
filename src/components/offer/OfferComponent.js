import React from 'react'
import { useRouter } from 'next/navigation'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '@/assets/common-side.PNG'

const OfferComponent = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Offers'} />
            <p className="text-sm text-slate-500 mb-14">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <div className="max-w-[800px] mx-auto">
              <div className="grid grid-cols-1 gap-8">
                {Array(4)
                  .fill()
                  .map((_, i) => (
                    <div
                      onClick={() =>
                        router.push(`/offer/property-offer/${i + 1}`)
                      }
                      key={i}
                      className="shadow-lg rounded-2xl overflow-hidden"
                    >
                      <img
                        src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
                        alt=""
                      />

                      <h1 className="text-center text-2xl text-primary font-semibold py-4 cursor-pointer">
                        {i === 1 ? 'Eid Discount' : 'Discount'}
                      </h1>
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

export default OfferComponent
