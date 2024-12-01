'use client'

import CustomHeading from '@/components/shared/CustomHeading'
import Loader from '@/components/shared/Loader'
import { getAllClients } from '@/functions/api'
import { PLACEHOLDER } from '@/utils/constant'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'

export default function ClientPage() {
  const router = useRouter()
  const [clients, setClients] = useState([])
  const [filteredClients, setFilteredClients] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      const clients = await getAllClients()
      setClients(clients)
      setFilteredClients(clients)
      setLoading(false)
    }
    fetchClients()
  }, [])

  useEffect(() => {
    const filter = searchText.toLowerCase()
    const filtered = clients.filter(client =>
      Object.values(client).some(value =>
        String(value).toLowerCase().includes(filter)
      )
    )
    setFilteredClients(filtered)
  }, [searchText, clients])

  return (
    <div className="p-4 xl:p-8">
      <div className="flex justify-center my-5 xl:my-8">
        <CustomHeading firstText="Current" secondText="Clients" />
      </div>
      <div className="flex max-w-[55rem] focus-within:border-primary mx-auto border border-gray-300 items-center rounded-md xl:w-[50rem] xl:max-w-[50rem]">
        <input
          className="px-4 py-2 text-gray-900 text-sm xl:text-base xl:px-6 xl:py-3 rounded-lg outline-none block w-full"
          type="text"
          placeholder="Search clients..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <IoSearch className="w-5 h-5 text-gray-500 mr-4 xl:w-6 xl:h-6 xl:mr-6" />
      </div>

      {loading && <Loader />}
      <div className="grid max-w-[55rem] xl:w-[50rem] xl:max-w-[50rem] mx-auto grid-cols-1 gap-4 mt-4 xl:gap-6 xl:mt-6">
        {filteredClients?.map((client, index) => (
          <div
            onClick={() =>
              router.push(`/admin/sales/profile/?userId=${client.user_id}`)
            }
            key={index}
            className="flex shadow-md items-center border p-4 rounded-md relative xl:p-6"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-300 rounded-full relative xl:w-20 xl:h-20">
                <img
                  src={client.img || PLACEHOLDER}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
                <span
                  className={`absolute top-0 right-1 block w-4 h-4 rounded-full xl:w-5 xl:h-5 ${
                    client.status === '1' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
            </div>
            <div className="ml-4 xl:ml-6">
              <div className="text-lg mb-1 text-primary font-semibold xl:text-xl">
                {client.name}
              </div>
              <div className="text-sm text-gray-600 xl:text-base">
                <strong>User Id:</strong> {client.client_id}
              </div>
              <div className="text-sm text-gray-600 xl:text-base">
                <strong>Phone:</strong> {client.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
