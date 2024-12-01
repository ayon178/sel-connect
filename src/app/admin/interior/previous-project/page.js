'use client'

import PreviousProjectComponent from '@/components/previousProject/PreviousProjectComponent'
import CustomHeading from '@/components/shared/CustomHeading'
import { getPreviousProjects } from '@/functions/api'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PreviousProject = () => {
  const router = useRouter()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPreviousProjects()
        setProjects(response)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className=" mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Previous'} secondText={'Project'} />

            {/* Service div */}
            <div className="w-[55rem] mx-auto mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center">
                {projects?.map((service, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      router.push(
                        `/admin/interior/previous-project/${service.id}`
                      )
                    }
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ServiceCard = ({ service }) => {
  const { img_url, title } = service
  return (
    <div
      style={{
        boxShadow: '1px 2px 10px rgba(0, 0, 0, 0.2)',
      }}
      className="rounded-md w-72 xl:w-96 p-2 pb-5 cursor-pointer"
    >
      <div className="rounded-md w-full h-40 overflow-hidden">
        <img src={img_url} alt={title} className="w-full h-full object-cover" />
      </div>
      <h1 className="text-md text-center mt-4 font-bold text-tertiaryText">
        {title}
      </h1>
    </div>
  )
}

export default PreviousProject
