'use client'

import ClientFeedTableAcc from '@/components/admin/accounts/ClientFeedTableAcc'
import SimpleMonthPicker from '@/components/admin/afterSales/SimpleMonthPicker'
import Statistics from '@/components/admin/statistics/Statistics'
import CustomHeading from '@/components/shared/CustomHeading'
import Loader from '@/components/shared/Loader'
import {
  getAccountsFeedbackByCompleteStatus,
  getFeedbackNote,
  getPropertyById,
} from '@/functions/api'
import React, { useEffect, useState } from 'react'

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

const aa = ['Admin Feedback', 'Service Status', 'Notes']

const CurrentFeedback = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentFeedData, setCurrentFeedData] = useState([])
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAccountsFeedbackByCompleteStatus()
        if (res) {
          const enrichedRes = await Promise.all(
            res.map(async feedback => {
              const property = await getPropertyById(feedback.property_id)
              const feedbackNote = await getFeedbackNote(feedback.feedback_id)
              return { ...feedback, ...property, ...feedbackNote }
            })
          )
          setCurrentFeedData(enrichedRes)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [refetch])

  return (
    <div className="p-5 custom_width">
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

        {/* date picker for filter by date */}
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

      {loading ? (
        <Loader />
      ) : (
        <div className=" mt-7">
          <ClientFeedTableAcc
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
