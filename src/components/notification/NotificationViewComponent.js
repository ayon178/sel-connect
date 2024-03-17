import React from 'react'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '../../assets/common-side.PNG'

const NotificationViewComponent = () => {
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

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex items-center justify-between">
            <div>
              <CustomHeading firstText={'Admin Replied'} />
              <p className="text-[12px] text-gray-700">{formattedDate}</p>
            </div>
            <button className="bg-red-200 text-primary rounded-3xl px-5 py-1 uppercase text-[12px] font-semibold">
              Construction
            </button>
          </div>

          <div className="max-w-full mx-auto mt-5">
            <img
              className="rounded-lg"
              src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
              alt=""
            />

            <div className="mt-5 bg-gray-200 p-5 rounded-lg">
              <h1 className="text-md font-semibold">Your Feedback</h1>
              <p className="text-sm mt-1">Name change test</p>

              <h1 className="mt-4 text-md font-semibold">Admin Replied</h1>
              <p className="text-sm mt-1">Ok</p>
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

export default NotificationViewComponent
