'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { getFeed, getFeedForSubAdmin, loggedInAdmin } from '@/functions/api'
import { formatTimeStampToDayMonthYear } from '@/helper/helper'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

// ========================================
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { db } from '../../../../../config/firebase.init'

const ClientFeedback = () => {
  const [user, setUser] = useState(null)
  const [feedbackData, setFeedbackData] = useState([])
  const [searchText, setSearchText] = useState('')
  const router = useRouter()

  useEffect(() => {
    let user_id
    if (typeof window !== 'undefined') {
      user_id = window.localStorage.getItem('selConnect')
      if (!user_id) {
        window.location.href = '/auth/login'
        return
      }
    }
    const parsedUser = JSON.parse(user_id)

    const fetchData = async () => {
      const { user } = await loggedInAdmin(parsedUser.user_id)
      setUser(user)

      if (user?.sub === '0') {
        fetchFeedback()
      } else {
        const data = await getFeedForSubAdmin(
          'after_sales_feedback',
          parsedUser.user_id
        )
        setFeedbackData(data)
      }
    }
    fetchData()
  }, [])

  // ========================================
  const [isLoading, setIsLoading] = useState(false)
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchFeedback = async () => {
    if (!hasMore || isLoading) return

    setIsLoading(true)
    const feedbackRef = collection(db, 'after_sales_feedback')
    const queryConstraints = [orderBy('feedback_id'), limit(3)]
    if (lastDocSnapshotRef.current) {
      queryConstraints.push(startAfter(lastDocSnapshotRef.current))
    }
    const querySnapshot = await getDocs(query(feedbackRef, ...queryConstraints))
    const newFeedback = querySnapshot.docs.map(doc => doc.data())
    setFeedbackData(prev => [...prev, ...newFeedback])
    setLastDocSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1])
    setIsLoading(false)

    if (querySnapshot.docs.length < 3) {
      setHasMore(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          if (user?.sub === '0') {
            fetchFeedback()
          }
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [isLoading, hasMore]) // Removed the debounce for clarity

  const loaderRef = useRef(null)
  const lastDocSnapshotRef = useRef(null)

  useEffect(() => {
    lastDocSnapshotRef.current = lastDocSnapshot
  }, [lastDocSnapshot])

  // ========================================
  return (
    <div className="p-5">
      <div className="flex justify-center mb-8">
        <CustomHeading firstText="Clients" secondText="Feedback" />
      </div>

      <div className="flex max-w-[55rem] focus-within:border-primary mx-auto border border-gray-300 items-center rounded-md ">
        <input
          className="px-4 py-2  text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 xl:py-3"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <IoSearch className="w-5 h-5 text-gray-500 mr-4" />
      </div>

      <div className="grid  max-w-[55rem]  mx-auto grid-cols-1 gap-4 mt-4">
        {feedbackData?.map((feed, index) => (
          <div
            key={index}
            className="flex flex-col border cursor-pointer hover:bg-slate-100 p-4 bg-white shadow-lg rounded-md"
            onClick={() =>
              router.push(
                `/admin/after-sales/client-feedback/details/${feed.feedback_id}`
              )
            }
          >
            <h1 className="text-xl font-semibold text-primary mb-1">
              {feed.title}
            </h1>
            <p className="text-primary text-xs pb-1 border-b-2 border-slate-300">
              {feed.user_name}{' '}
              <span className="text-slate-600">
                {formatTimeStampToDayMonthYear(feed.feedback_id)}
              </span>
            </p>
            <p className="text-[.9rem] mt-3 text-slate-700">
              {feed.description}
            </p>
          </div>
        ))}

        {/* Skeleton loader */}
        {isLoading && <SkeletonLoader />}

        {/* Loader element for infinite scroll */}
        <div ref={loaderRef} className="loader"></div>
      </div>
    </div>
  )
}

const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <h1 className="text-center">Loading...</h1>
  </div>
)

export default ClientFeedback
