import CustomHeading from '@/components/shared/CustomHeading'
import React from 'react'
import commonImage from '../../../assets/common-side.PNG'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

// image import
import imageOne from '../../../assets/feedback/construction/1.jpg'
import imageTwo from '../../../assets/feedback/construction/2.jpg'
import imageThree from '../../../assets/feedback/construction/3.jpg'
import imageFour from '../../../assets/feedback/construction/4.jpg'
import imageFive from '../../../assets/feedback/construction/5.jpg'
import imageSix from '../../../assets/feedback/construction/6.jpg'
import imageSeven from '../../../assets/feedback/construction/7.jpg'
import imageEight from '../../../assets/feedback/construction/8.jpg'

const options = [
  {
    image: imageOne,
    title: 'Wall Layout (Internal)',
  },
  {
    image: imageTwo,
    title: 'Tiles (Bath & Kitchen)',
  },
  {
    image: imageThree,
    title: 'Floor Finish (Tiles)',
  },
  {
    image: imageFour,
    title: 'Sanitary fitting',
  },
  {
    image: imageFive,
    title: 'Bathroom fitting layout',
  },
  {
    image: imageSix,
    title: 'Extra electric point in roof',
  },
  {
    image: imageSeven,
    title: 'Sanitary wares (Basin, Commode, Taps)',
  },
  {
    image: imageEight,
    title: 'Doc Frame',
  },
]

const ConstructionFeedback = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  return (
    <div className="container mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Construction'} />
            <p className="text-sm mb-8 text-center sm:text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <div className="text-center sm:text-left">
              <CustomHeading secondText={'General Feedback Options'} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
            {options.map((option, index) => (
              <div
                onClick={() =>
                  router.push(
                    `/user/feedback/construction/general-feedback/${index}?id=${id}`
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
              router.push(
                `/user/feedback/construction/custom-feedback?id=${id}`
              )
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

export default ConstructionFeedback
