'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { formatTimeStampToDayMonthYear } from '@/helper/helper'
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { RiBuildingFill } from 'react-icons/ri'
import Image from 'next/image'

import img from '../../../../../../assets/previous_project/1.jpg'
import {
  getApartmentById,
  getFeedById,
  getPropertyById,
  getUserByEmail,
  sendFeedbackReply,
} from '@/functions/api'
import Loader from '@/components/shared/Loader'
import { FEEDBACK_TYPES } from '@/utils/constant'
import FeedbackPopup from '@/components/popup/FeedbackPopup'

const FeedbackView = ({ params }) => {
  const feedid = params.feedbackview
  const [feedData, setFeedData] = useState()
  const [senderData, setSenderData] = useState({})
  const [propertyData, setPropertyData] = useState({})
  const [loading, setLoading] = useState(true)
  const [feedbackReplayPopup, setFeedbackReplayPopup] = useState(false)

  const [reply, setReply] = useState('')

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const data = await getFeedById('feedback_list', feedid)
      setFeedData(data)

      const { user } = await getUserByEmail(data?.sender_id)
      setSenderData(user)

      if (Object.keys(data)) {
        const property = await getPropertyById(data?.property_id)
        setPropertyData(property)
      }
      setLoading(false)

      setFeedbackReplayPopup(true)
    }
    if (feedid) {
      fetchData()
    }
  }, [feedid])

  const sendFeedback = async () => {
    setLoading(true)
    const res = await sendFeedbackReply(
      'constructions_feedback',
      senderData.user_id,
      reply,
      feedid
    )

    setLoading(false)
    if (res) {
      setFeedbackReplayPopup(false)
      setReply('')
    }
  }


  return (
    <>
      <div className="p-5">
        <div className="flex justify-center mb-8">
          <CustomHeading firstText="Feedback" secondText="Details" />
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="shadow-lg py-5 px-10 max-w-[50rem] mx-auto rounded-lg border">
              <div className="flex gap-10">
                <FaUser className="w-10 h-10 text-gray-800" />
                <div>
                  <p className="text-md text-primary font-bold">
                    {feedData?.user_name}
                  </p>
                  <p className="text-sm text-slate-800 font-medium">
                    Email: {feedData?.sender_id}
                  </p>
                  <p className="text-sm text-slate-800 font-medium">
                    Client Id: {senderData?.client_id}
                  </p>
                  <p className="text-sm text-slate-800 font-medium">
                    Phone: {senderData?.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-10 mt-6">
                <RiBuildingFill className="w-10 h-10 text-gray-800" />
                <div>
                  <p className="text-md text-primary font-bold">
                    {propertyData?.name}
                  </p>
                  <p className="text-sm text-slate-800 font-medium">
                    Address: {propertyData?.address}
                  </p>
                  <p className="text-sm text-slate-800 font-medium">
                    Unit: {propertyData?.unit_number}
                  </p>
                </div>
              </div>
            </div>

            <div className="shadow-lg py-5 px-10 max-w-[50rem] mx-auto rounded-lg border mt-8">
              <h1 className="text-primary text-xl font-[500] text-center">
                {feedData?.title}
              </h1>
              <h1 className="text-primary mt-1 text-center text-xs">
                {formatTimeStampToDayMonthYear(feedData?.feedback_id)}
              </h1>
              <h1 className="text-slate-700 mt-2 text-sm font-[600] text-center">
                {FEEDBACK_TYPES[Number(feedData?.type) - 1]}
              </h1>

              {feedData?.img && (
                <div className="flex justify-center mt-4">
                  <Image
                    src={feedData?.img}
                    alt="construction"
                    width={400}
                    height={200}
                    className="rounded-lg w-full h-auto"
                    layout="responsive"
                  />
                </div>
              )}

              <h1 className="text-slate-700 mt-5 text-sm ">
                {feedData?.description}
              </h1>
            </div>
          </>
        )}
      </div>

      {/* Feedback reply popup */}
      {feedbackReplayPopup && (
        <FeedbackPopup
          setOpenPopup={setFeedbackReplayPopup}
          setReply={setReply}
          func={sendFeedback}
        />
      )}
    </>
  )
}

export default FeedbackView
