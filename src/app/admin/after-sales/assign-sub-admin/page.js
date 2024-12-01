'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import { getSubAdminList } from '@/functions/api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AssignSubAdmin = () => {
  const [subAdminList, setSubAdminList] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSubAdminList('6', '1')
      setSubAdminList(data)
    }
    fetchData()
  }, [])

  return (
    <div className="p-5">
      <div className="flex justify-center mb-8">
        <CustomHeading firstText="After Sales" secondText="Sub Admin" />
      </div>

      <div className="grid  max-w-[55rem]  mx-auto grid-cols-1 gap-4 mt-4">
        {subAdminList?.map((item, index) => (
          <div
            onClick={() =>
              router.push(`/admin/after-sales/assign-sub-admin/${item.user_id}`)
            }
            key={index}
            className="flex flex-col border cursor-pointer hover:bg-slate-100 p-4 bg-white shadow-lg rounded-md"
          >
            <h1 className="text-lg font-semibold text-slate-700 mb-1">
              {item.name}
            </h1>

            <p className="text-sm text-slate-500">Email: {item.email}</p>
            <p className="text-sm text-slate-500">User ID: {item.user_id}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssignSubAdmin
