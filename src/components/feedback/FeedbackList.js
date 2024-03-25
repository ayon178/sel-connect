import React from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '../../assets/common-side.PNG'
import { useRouter } from 'next/navigation'

import { FiClock } from 'react-icons/fi'
import { SlCalender } from 'react-icons/sl'

const FeedbackList = () => {
  const router = useRouter()
  return (
    <div className="container mx-auto my-20">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <CustomHeading firstText="My Feedback" />

          <p className="text-gray-500 mt-2 text-sm ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptates, aspernatur.
          </p>

          <div className="max-w-[800px] mx-auto mt-10">
            <div className="grid grid-cols-1 gap-5">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    onClick={() => router.push(`/feedback/${i + 1}`)}
                  >
                    <FeedbackCard />
                  </div>
                ))}
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

const FeedbackCard = ({ feedback }) => {
  return (
    <div
      style={{
        boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.1)',
      }}
      className=" bg-white px-7 py-4 rounded-2xl cursor-pointer"
    >
      <h1 className="text-slate-800 text-lg font-semibold">Dock Frame</h1>
      <div className="mt-1 flex">
        <div className="flex items-center mr-16">
          <SlCalender className="inline-block mr-2 text-md text-primary" />
          <span className="text-primary font-semibold text-sm">21/01/2024</span>
        </div>
        <div className="flex items-center">
          <FiClock className="inline-block mr-2 text-lg text-primary" />
          <span className="text-primary font-semibold text-sm">3:30 PM</span>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-2 text-justify">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
        possimus voluptate sapiente vero accusantium excepturi nobis. Tenetur
        provident dolorem dolorum, sit, delectus nemo iste officia, inventore
        consequatur cumque rem numquam voluptates alias. Dolores asperiores
        doloremque aut culpa sequi excepturi ipsam quas tempora impedit? Autem
        voluptates nihil quisquam necessitatibus fugiat dolor.
      </p>

      <div className="flex items-center justify-end">
        <button className="bg-red-200 text-primary rounded-xl text-sm px-5 py-1">
          Admin Replied
        </button>
      </div>
    </div>
  )
}

export default FeedbackList
