import React, { useState } from 'react'
import { formatDateFromTimestamp } from '@/helper/helper'
import ClientFeedRowAft from './ClientFeedRowAft'

const ClientFeedTableAft = ({ tableHeaders, dept, data, setRefetch }) => {
  const [expandedRows, setExpandedRows] = useState([])

  const handleRowClick = id => {
    const isExpanded = expandedRows.includes(id)
    const newExpandedRows = isExpanded
      ? expandedRows.filter(rowId => rowId !== id)
      : [...expandedRows, id]
    setExpandedRows(newExpandedRows)
  }

  const isRowExpanded = id => expandedRows.includes(id)
  console.log(data, 'data')
  return (
    <div
      style={{ scrollbarWidth: 'thin' }}
      className="relative max-w-[300px] mx-auto sm:max-w-[500px] md:max-w-[500px] lg:max-w-[1100px] overflow_custom shadow-md sm:rounded-lg"
    >
      <style>
        {`
          .overflow-x-auto::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb {
            background-color: gray;
            border-radius: 4px;
          }

          .overflow-x-auto::-webkit-scrollbar-track {
            background-color: gray;
            border-radius: 4px;
          }
        `}
      </style>
      <table className="text-sm w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="bg-white border-b min-w-full">
          <tr className="bg-[#FFDED7] text-primary font-semibold">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`text-xs sm:text-sm px-2 py-4 text-left whitespace-nowrap`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            const isExpanded = isRowExpanded(item.feedback_id)
            return (
              <React.Fragment key={item.feedback_id}>
                <tr
                  onClick={() => handleRowClick(item.feedback_id)}
                  className={`${
                    (index + 1) % 2 === 0 ? 'bg-white' : ' bg-gray-100'
                  } border-b cursor-pointer text-xs sm:text-sm`}
                >
                  <ClientFeedRowAft
                    data={item}
                    dept={dept}
                    index={index}
                    setRefetch={setRefetch}
                  />
                </tr>
                {isExpanded && (
                  <tr>
                    <td colSpan={tableHeaders.length}>
                      <div className="p-4 bg-gray-100">
                        <div className="flex justify-between gap-10 flex-col md:flex-row">
                          <div className="md:w-[55rem] w-full order-2 md:order-1">
                            <div className="max-w-[900px] ">
                              <div className="w-full bg-gray-300 py-2 flex items-center overflow-hidden justify-center rounded-lg">
                                <img
                                  title={`${item.img ? item.name : 'No'} Image`}
                                  src={
                                    item.img ||
                                    'https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1'
                                  }
                                  alt=""
                                  className="w-60 rounded-lg"
                                />
                              </div>

                              <div className="mt-10">
                                <div className="mt-5 overflow-x-auto">
                                  {/* row */}
                                  <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary">
                                        Admin Feedback
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.reply || 'No Reply'}
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary">
                                        Service Status
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.service_status || 'Not added'}
                                      </p>
                                    </div>
                                  </div>
                                  {/* row */}
                                  <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary">
                                        Handover Date
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.handover_date
                                          ? formatDateFromTimestamp(
                                              item.handover_date
                                            )
                                          : 'Not added'}
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary whitespace-nowrap">
                                        Address
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.address}
                                      </p>
                                    </div>
                                  </div>
                                  {/* row */}
                                  <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary">Technician</p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.technician || 'Not added'}
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary whitespace-nowrap">
                                        Materials
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700">
                                        {item.materials || 'Not added'}
                                      </p>
                                    </div>
                                  </div>
                                  {/* row */}
                                  <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary">Supplier</p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.supplier || 'Not added'}
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary whitespace-nowrap">
                                        Service Start Time
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.service_start_time
                                          ? formatDateFromTimestamp(
                                              item.service_start_time
                                            )
                                          : 'Not added'}
                                      </p>
                                    </div>
                                  </div>
                                  {/* row */}
                                  <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary">
                                        Service End Time
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.service_end_time
                                          ? formatDateFromTimestamp(
                                              item.service_end_time
                                            )
                                          : 'Not added'}
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary whitespace-nowrap">
                                        Material Use Status
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.material_use_status ||
                                          'Not added'}
                                      </p>
                                    </div>
                                  </div>
                                  {/* row */}
                                  <div className="flex md:flex-wrap gap-5 md:gap-0 items-center mt-3 border-b border-red-200 pb-1 w-[500px] sm:w-auto">
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary">Update</p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.update || 'Not added'}
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-primary whitespace-nowrap">
                                        Notes
                                      </p>
                                    </div>
                                    <div className="md:w-1/4 w-1/2">
                                      <p className="text-gray-700 whitespace-nowrap">
                                        {item.notes || 'Not added'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ClientFeedTableAft
