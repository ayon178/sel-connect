'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import {
  getFeedbackByStatusPagination,
  getUserByEmail,
  loggedInAdmin,
} from '@/functions/api'
import { formatTimeStampToDayMonthYear } from '@/helper/helper'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

const PAGE_LIMIT = 5

// ========================================
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { db } from '../../../../../config/firebase.init'
import Loader from '@/components/shared/Loader'

const ClientFeedback = () => {
  const [user, setUser] = useState(null)
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
    }
    fetchData()
  }, [])

  // ========================================
  const [hasMore, setHasMore] = useState(true)
  const [currentFeedData, setCurrentFeedData] = useState([])
  const [lastVisible, setLastVisible] = useState(null)
  const observer = useRef()
  const isFetching = useRef(false)
  const [loading, setLoading] = useState(true)
  const [refetch, setRefetch] = useState(0)
  const [filteredFeedback, setFilteredFeedback] = useState([])
  const [searchText, setSearchText] = useState('')

  const fetchData = useCallback(async () => {
    if (isFetching.current) return // Prevent fetching if already fetching
    isFetching.current = true
    try {
      const { feedbackList, lastVisibleDoc } =
        await getFeedbackByStatusPagination(
          '4', // Construction feedback status 'On process'
          lastVisible,
          PAGE_LIMIT
        )

      if (!feedbackList.length) {
        setHasMore(false)
        setLoading(false)
        return
      }

      setLastVisible(lastVisibleDoc)

      // Remove duplicates by checking if the feedback ID is already in currentFeedData
      const newFeedback = feedbackList.filter(
        feedback =>
          !currentFeedData.some(
            existing => existing.feedback_id === feedback.feedback_id
          )
      )

      if (newFeedback.length > 0) {
        const enrichedRes = await Promise.all(
          newFeedback.map(async feedback => {
            const client = await getUserByEmail(feedback?.sender_id)

            return { ...feedback, ...client }
          })
        )

        setCurrentFeedData(prevData => {
          return [...prevData, ...enrichedRes]
        })
      }

      setLoading(false)
      if (newFeedback.length < PAGE_LIMIT) setHasMore(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error)
    } finally {
      isFetching.current = false // Reset the fetching flag
    }
  }, [lastVisible, currentFeedData])

  useEffect(() => {
    fetchData()
  }, [refetch, fetchData])

  useEffect(() => {
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setRefetch(prev => prev + 1) // Trigger a re-fetch
      }
    })

    if (document.querySelector('#load-more-trigger')) {
      observer.current.observe(document.querySelector('#load-more-trigger'))
    }

    return () => observer.current.disconnect()
  }, [hasMore, loading])

  useEffect(() => {
    if (searchText) {
      // Convert search text to lowercase for case-insensitive search
      const lowercasedSearchText = searchText.toLowerCase()

      // Filter feedbackData for both Feedback Title and Client Details
      const filteredData = currentFeedData.filter(feedback => {
        const feedbackTitle = feedback.title?.toLowerCase() || ''
        const clientName = feedback.user?.name?.toLowerCase() || ''
        const clientPhone = feedback.user?.phone?.toLowerCase() || ''

        return (
          feedbackTitle.includes(lowercasedSearchText) ||
          clientName.includes(lowercasedSearchText) ||
          clientPhone.includes(lowercasedSearchText)
        )
      })

      setFilteredFeedback(filteredData)
    } else {
      // If no searchText, show all feedback
      setFilteredFeedback(currentFeedData)
    }
  }, [searchText, currentFeedData])

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

      <div id="load-more-trigger" className="h-10" />

      {loading ? (
        <Loader />
      ) : currentFeedData.length === 0 ? (
        <p className="text-3xl text-center">No feedback found.</p>
      ) : (
        <div className="grid  max-w-[55rem]  mx-auto grid-cols-1 gap-4 mt-4">
          {filteredFeedback?.map((feed, index) => (
            <div
              key={index}
              className="flex flex-col border cursor-pointer hover:bg-slate-100 p-4 bg-white shadow-lg rounded-md"
              onClick={() =>
                router.push(
                  `/admin/construction/client-feedback/details/${feed.feedback_id}`
                )
              }
            >
              <h1 className="text-xl font-semibold text-primary mb-1">
                {feed.title}
              </h1>
              <p className="text-primary text-xs pb-1 border-b-2 border-slate-300">
                {feed.user_name}{' '}
                <span className="text-slate-600 ml-5">
                  {formatTimeStampToDayMonthYear(feed.feedback_id)}
                </span>
              </p>
              <p className="text-[.9rem] mt-3 text-slate-700">
                {feed.description}
              </p>
            </div>
          ))}

          {/* Skeleton loader */}
          {/* {isLoading && <SkeletonLoader />} */}

          {/* Loader element for infinite scroll */}
          {/* <div ref={loaderRef} className="loader"></div> */}
        </div>
      )}
    </div>
  )
}

const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <h1 className="text-center">Loading...</h1>
  </div>
)

export default ClientFeedback
