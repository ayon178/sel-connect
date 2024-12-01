import { formatDateFromTimestamp } from '@/helper/helper'
import React, { useState } from 'react'
import EditLegalFeedPopup from '@/components/popup/editFeed/EditLegalFeedPopup'

const ClientFeedRowLegal = ({ data: item, index, setRefetch }) => {
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <>
      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
        {item.name || 'Property Does Not Exist'}
      </td>
      <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
        {item.user_name}
      </td>
      <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
        {formatDateFromTimestamp(item.feedback_id)}
      </td>
      <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
        {item.title}
      </td>
      <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
        {item.description}
      </td>
      <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
        {item.img ? (
          <img
            src={item.img}
            alt="feedback"
            className="h-10 w-10 object-cover rounded-full"
          />
        ) : (
          'No Image'
        )}
      </td>

      <td>
        <h1
          onClick={() => {
            setOpenPopup(true)
          }}
          className="font-medium text-center text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
        >
          Edit
        </h1>
      </td>

      {openPopup && (
        <EditLegalFeedPopup
          setOpenPopup={setOpenPopup}
          data={item}
          setRefetch={setRefetch}
        />
      )}
    </>
  )
}

export default ClientFeedRowLegal
