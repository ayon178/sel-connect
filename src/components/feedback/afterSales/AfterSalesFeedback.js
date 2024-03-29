import CustomHeading from '@/components/shared/CustomHeading'
import React from 'react'
import commonImage from '../../../assets/common-side.PNG'
import { useRouter } from 'next/navigation'

const img =
  'https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150749.jpg?w=740&t=st=1704012228~exp=1704012828~hmac=2d11dad894f5a971aa326103a462df14764112186057effe8190effe8855859e'
const options = [
  {
    image: img,
    title: 'Wall Layout(interior)',
  },
  {
    image: img,
    title: 'Wall Layout(interior)',
  },
  {
    image: img,
    title: 'Wall Layout(interior)',
  },
  {
    image: img,
    title: 'Wall Layout(interior)',
  },
  {
    image: img,
    title: 'Wall Layout(interior)',
  },
  {
    image: img,
    title: 'Wall Layout(interior)',
  },
  {
    image: img,
    title: 'Wall Layout(interior)',
  },
  {
    image: img,
    title: 'Wall Layout(interior)',
  },
]

const AfterSalesFeedback = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'After Sales'} />
            <p className="text-sm mb-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <CustomHeading secondText={'General Feedback Options'} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
            {options.map((option, index) => (
              <div
                onClick={() =>
                  router.push(`/feedback/after-sales/general-feedback/${index}`)
                }
                key={index}
                className="flex flex-col items-center cursor-pointer"
              >
                <img src={option.image} className="w-full rounded-xl" alt="" />
                <p className="text-sm mt-2">{option.title}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/feedback/after-sales/custom-feedback')}
            className="bg-primary text-white w-full py-2 mt-10 rounded-2xl"
          >
            Send Custom Feedback
          </button>
        </div>

        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default AfterSalesFeedback
