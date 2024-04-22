import CustomHeading from '@/components/shared/CustomHeading'
import React from 'react'
import commonImage from '../../../assets/common-side.PNG'
import { useRouter } from 'next/navigation'

// image import
import imageOne from '../../../assets/feedback/payment/1.jpg'
import imageTwo from '../../../assets/feedback/payment/2.jpg'
import imageThree from '../../../assets/feedback/payment/3.jpg'
import imageFour from '../../../assets/feedback/payment/4.jpg'
import imageFive from '../../../assets/feedback/payment/5.jpg'
import imageSix from '../../../assets/feedback/payment/6.jpg'
import imageSeven from '../../../assets/feedback/payment/7.jpg'
import imageEight from '../../../assets/feedback/payment/8.jpg'
import imageNine from '../../../assets/feedback/payment/9.jpeg'
import imageTen from '../../../assets/feedback/payment/10.png'

const options = [
  {
    image: imageOne,
    title: 'Name Change',
  },
  {
    image: imageTwo,
    title: 'Cheque Status',
  },
  {
    image: imageThree,
    title: 'Payment Status',
  },
  {
    image: imageFour,
    title: 'Refund',
  },
  {
    image: imageFive,
    title: 'Handover Procedure',
  },
  {
    image: imageSix,
    title: 'Other Payments',
  },
  {
    image: imageSeven,
    title: 'Allotment Deed',
  },
  {
    image: imageEight,
    title: 'Loan Papers',
  },
  {
    image: imageNine,
    title: 'Registration Process',
  },
  {
    image: imageTen,
    title: 'Other Papers',
  },
]

const PaymentFeedback = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Payment'} />
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
                  router.push(`/feedback/payment/general-feedback/${index}`)
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
            onClick={() => router.push('/feedback/payment/custom-feedback')}
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

export default PaymentFeedback
