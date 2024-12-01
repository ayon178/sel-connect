import React, { useRef } from 'react'
import Picker from 'react-month-picker'
import 'react-month-picker/css/month-picker.css'

const SimpleMonthPicker = ({
  selectedMonth,
  setSelectedMonth,
  setSelectedDate,
  admin,
}) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const monthPickerRef = useRef(null)

  const pickerLang = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  }

  const formatMonth = m =>
    m && m.year && m.month
      ? `${pickerLang.months[m.month - 1]}. ${m.year}`
      : '?'

  const handleMonthChange = (year, month) => {
    setSelectedMonth({ year, month })
    setSelectedDate && setSelectedDate('')
  }

  return (
    <div className="w-1/2 mt-7">
      {!admin && <label className="text-slate-600 mb-1">Filter by Month</label>}

      <div
        onClick={() => monthPickerRef.current.show()}
        style={{
          cursor: 'pointer',
          border: '1px solid #5D2629',
          borderRadius: '4px',
        }}
        className="w-full p-2 lg:py-[9.2px] py-[4.2px]"
      >
        {formatMonth(selectedMonth)}
      </div>
      <Picker
        ref={monthPickerRef}
        years={[
          currentYear - 2,
          currentYear - 1,
          currentYear,
          currentYear + 1,
          currentYear + 2,
        ]}
        value={selectedMonth}
        lang={pickerLang.months}
        onChange={handleMonthChange}
      />
    </div>
  )
}

export default SimpleMonthPicker
