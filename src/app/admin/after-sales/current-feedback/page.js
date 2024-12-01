'use client'

import ClientFeedTableAft from '@/components/admin/afterSales/ClientFeedTableAft'
import SimpleMonthPicker from '@/components/admin/afterSales/SimpleMonthPicker'
import Statistics from '@/components/admin/statistics/Statistics'
import CustomHeading from '@/components/shared/CustomHeading'
import Loader from '@/components/shared/Loader'
import {
  createFeedbackNote,
  getAfterSalesFeedbackByCompleteStatus,
  getFeedbackByStatusPagination,
  getFeedbackNote,
  getPropertyById,
} from '@/functions/api'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const tableHeaders = [
  '#',
  'Project',
  'Client Name',
  'Complain Date-time',
  'Complain Title',
  'Complain Details',
  'Complain Image/Pdf',
  'Action',
]

const aa = [
  'Admin Feedback',
  'Service Status',
  'Handover Date',
  'Address',
  'Technician',
  'Materials',
  'Supplier',
  'Service Start Time',
  'Service End Time',
  'Material Use Status',
  'Update',
  'Notes',
]

const PAGE_LIMIT = 5

const CurrentFeedback = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentFeedData, setCurrentFeedData] = useState([])
  const [lastVisible, setLastVisible] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef()
  const isFetching = useRef(false) // New flag for preventing multiple fetches

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const [selectedMonth, setSelectedMonth] = useState({
    year: currentYear,
    month: currentMonth,
  })
  const [selectedDate, setSelectedDate] = useState('')
  const [refetch, setRefetch] = useState(0)

  useEffect(() => {
    // Access localStorage after hydration
    const storedUser =
      typeof window !== 'undefined' && window.localStorage.getItem('selConnect')
    setUser(storedUser ? JSON.parse(storedUser) : null)
  }, [])

  const fetchData = useCallback(async () => {
    if (isFetching.current) return // Prevent fetching if already fetching
    isFetching.current = true
    try {
      const { feedbackList, lastVisibleDoc } =
        await getFeedbackByStatusPagination(
          '6', // after sales feedback status 'On process'
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
            const property = await getPropertyById(feedback.property_id)
            const feedbackNote = await getFeedbackNote(feedback.feedback_id)
            return { ...feedback, ...property, ...feedbackNote }
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

  return (
    <div className="p-5 max-w-[1100px] pb-0">
      <div className="flex justify-center mb-3">
        <CustomHeading firstText="Current" secondText="Feedback" />
      </div>

      {/* Statistics */}
      <div>{user?.sub === '0' && <Statistics data={statisticsData} />}</div>

      <div className="flex items-center justify-between w-full sm:w-1/2 mx-auto gap-4">
        <SimpleMonthPicker
          setSelectedMonth={setSelectedMonth}
          selectedMonth={selectedMonth}
          setSelectedDate={setSelectedDate}
        />

        {/* Date picker for filter by date */}
        <div className="w-1/2 mt-7">
          <label className="text-slate-600 mb-1" htmlFor="date">
            Filter by date
          </label>
          <input
            value={selectedDate}
            onChange={e => {
              setSelectedDate(e.target.value)
            }}
            type="date"
            id="date"
            className="border border-primary rounded-[4px] w-full p-2 py-1 outline-none"
          />
        </div>
      </div>

      <div id="load-more-trigger" className="h-10" />

      {/* {!hasMore && <p className='text-3xl text-center'>No more feedback to load.</p>} */}

      {loading ? (
        <Loader />
      ) : currentFeedData.length === 0 ? (
        <p className="text-3xl text-center">No feedback found.</p>
      ) : (
        <div className="mt-7">
          <ClientFeedTableAft
            tableHeaders={tableHeaders}
            dept="after_sales"
            data={currentFeedData}
            setRefetch={setRefetch}
          />
        </div>
      )}
    </div>
  )
}

const statisticsData = {
  totalFeedback: 20,
  totalPendingThisMonth: 15,
  totalCompleteThisMonth: 5,
}

const data = {
  service_status: 'pending',
  handover_date: String(new Date().getTime()),
  technician: 'Aminul Islam',
  materials: 'Cement, Rod, Sand, Brick',
  supplier: 'M/S. ABC Corporation',
  service_start_time: String(new Date().getTime()),
  service_end_time: String(new Date().getTime()),
  material_use_status: 'pending',
  update: 'update',
  notes: 'notes',

  feedback_id: '1717909093833',
  feedback_note_id: String(new Date().getTime()),
}

export default CurrentFeedback

/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.reply || 'No Reply'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.service_status || 'Not added'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.handover_date
          ? formatDateFromTimestamp(item.handover_date)
          : 'Not added'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.address}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.technician || 'Not added'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.materials || 'Not added'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.supplier || 'Not added'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.service_start_time
          ? formatDateFromTimestamp(item.service_start_time)
          : 'Not added'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.service_end_time
          ? formatDateFromTimestamp(item.service_end_time)
          : 'Not added'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.material_use_status || 'Not added'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.update || 'Not added'}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.notes || 'Not added'}
      </td>
      */