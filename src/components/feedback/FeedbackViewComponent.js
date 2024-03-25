import React, { useState } from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '../../assets/common-side.PNG'
import { FaUserCircle } from 'react-icons/fa'
import Rating from 'react-rating-stars-component'

const FeedbackViewComponent = () => {
  const [formData, setFormData] = useState({
    rating: 0,
  })

  // Get the current date and time
  const currentDate = new Date()

  // Format the date and time
  const formattedDate = `${currentDate.toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}, ${currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })}`

  const [selectedRating, setSelectedRating] = useState(0)

  const handleRatingClick = rating => {
    setSelectedRating(rating)
    setFormData({ ...formData, rating })
  }

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading secondText={'Dock Frames'} />
            <p className="text-[12px] text-primary font-semibold">
              {formattedDate}
            </p>
          </div>

          <div className="max-w-full mx-auto mt-5">
            <img
              className="rounded-lg"
              src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
              alt=""
            />

            <div className="mt-5 bg-gray-200 p-5 rounded-lg">
              <h1 className="text-md font-semibold">Property Feedback</h1>
              <p className="text-sm mt-1">Name change test</p>

              <h1 className="mt-4 text-md font-semibold">Admin Replied</h1>
              <p className="text-sm mt-1">Ok</p>
            </div>
            <div className="flex gap-2 mt-5 bg-[#FFECE8] p-5 rounded-lg">
              <FaUserCircle size={20} className="cursor-pointer" />
              <div>
                <h1 className=" text-md font-semibold">Admin</h1>
                <p className="text-sm mt-1">Ok</p>
              </div>
            </div>

            {/* Render Rating component here */}
            <div className="mt-14 flex flex-col items-center">
              <p className="font-semibold text-sm">Your Satisfaction Level</p>
              <Rating
                count={5}
                size={40}
                onChange={handleRatingClick}
                value={selectedRating}
                activeColor="#732318"
              />
              <h1>{formData.rating}</h1>
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

export default FeedbackViewComponent
