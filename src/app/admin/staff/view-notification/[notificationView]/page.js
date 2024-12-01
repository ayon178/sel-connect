'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { getNotificationById } from '@/functions/api'
import React, { useEffect, useState } from 'react'

const NotificationView = ({ params }) => {
  const { notificationView } = params

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

  const [singleNotification, setSingleNotification] = useState({})
  const [feedbacks, setFeedbacks] = useState({
    yourFeedback: '',
    adminFeedback: '',
  })

  useEffect(() => {
    // get single notification
    const fetchSingleNotification = async () => {
      const notificationList = await getNotificationById(notificationView)
      setSingleNotification(notificationList)

      const desc = notificationList.desc || ''

      // Regular expression to extract "Your feedback" part
      const yourFeedbackMatch = desc.match(
        /Your feedback\s*>>\s*(.*?)\s*Admin replied\s*>>/s
      )

      // Regular expression to extract "Admin replied" part
      const adminFeedbackMatch = desc.match(/Admin replied\s*>>\s*(.*)$/s)

      const yourFeedback = yourFeedbackMatch ? yourFeedbackMatch[1].trim() : ''
      const adminFeedback = adminFeedbackMatch
        ? adminFeedbackMatch[1].trim()
        : ''

      setFeedbacks({
        yourFeedback,
        adminFeedback,
      })
    }

    fetchSingleNotification()
  }, [notificationView])

  return (
    <div className=" mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="sm:flex items-center justify-between">
            <div>
              <CustomHeading firstText={singleNotification?.title} />
              <p className="text-[12px] text-gray-700">{formattedDate}</p>
            </div>
            <button className="bg-red-200 mt-4 sm:mt-0 text-primary rounded-3xl px-5 py-1 uppercase text-[12px] font-semibold">
              {singleNotification?.notification_type || 'N/A'}
            </button>
          </div>

          <div className="max-w-full mx-auto mt-5">
            <div className="w-full h-[350px]">
              <img
                className="rounded-lg w-full h-full object-cover object-center"
                src={singleNotification?.image_url}
                alt=""
              />
            </div>

            {feedbacks.yourFeedback && (
              <div className="mt-5 bg-gray-200 p-5 rounded-lg">
                <h1 className="text-sm sm:text-md font-semibold">
                  Your Feedback
                </h1>
                <p className="text-xs sm:text-sm mt-1">
                  {feedbacks.yourFeedback}
                </p>

                <h1 className="mt-4 text-sm sm:text-md font-semibold">
                  Admin Replied
                </h1>
                <p className="text-xs sm:text-sm mt-1">
                  {feedbacks.adminFeedback}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationView
