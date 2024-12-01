import CustomHeading from '@/components/shared/CustomHeading'
import React from 'react'
import commonImage from '../../../assets/common-side.PNG'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

// image import
import civilWork from '../../../assets/feedback/after_sales/civil.webp'
import paintWork from '../../../assets/feedback/after_sales/paint.webp'
import sanitaryWork from '../../../assets/feedback/after_sales/sanitary.jpg'
import woodWork from '../../../assets/feedback/after_sales/wood.jpg'
import thaiWork from '../../../assets/feedback/after_sales/thai.jpg'
import msWork from '../../../assets/feedback/after_sales/ms.webp'
import electricalWork from '../../../assets/feedback/after_sales/electrical.webp'
import carpenterWork from '../../../assets/feedback/after_sales/carpenter.webp'

const options = [
  {
    image: civilWork,
    title: 'Civil Work',
  },
  {
    image: paintWork,
    title: 'Paint Work',
  },
  {
    image: sanitaryWork,
    title: 'Sanitary Work',
  },
  {
    image: woodWork,
    title: 'Wood Work',
  },
  {
    image: thaiWork,
    title: 'Thai Work',
  },
  {
    image: msWork,
    title: 'MS Work',
  },
  {
    image: electricalWork,
    title: 'Electrical Work',
  },
  {
    image: carpenterWork,
    title: 'Carpenter Work',
  },
]

const AfterSalesFeedback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="sm:flex flex-col text-center sm:text-start">
            <div className="flex justify-center text-center sm:text-start">
              <CustomHeading firstText={'After Sales'} />
            </div>

            <p className="text-sm mb-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <div className="flex justify-center text-center sm:text-start">
              <CustomHeading secondText={'General Feedback Options'} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
            {options.map((option, index) => (
              <div
                onClick={() =>
                  router.push(
                    `/user/feedback/after-sales/general-feedback/${index}?id=${id}`
                  )
                }
                key={index}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="w-full h-32 rounded-xl overflow-hidden">
                  <img
                    src={option.image.src}
                    className="w-full h-full"
                    alt=""
                  />
                </div>
                <p className="text-sm mt-2">{option.title}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              router.push(`/user/feedback/after-sales/custom-feedback?id=${id}`)
            }
            className="bg-primary text-white w-full py-2 mt-10 rounded-2xl"
          >
            Send Custom Feedback
          </button>
        </div>

        <div className="max-w-[30rem] hidden md:flex">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default AfterSalesFeedback
