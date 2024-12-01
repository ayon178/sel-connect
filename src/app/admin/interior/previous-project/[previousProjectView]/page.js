'use client'

import PreviousProjectViewComponent from '@/components/previousProject/PreviousProjectViewComponent'
import CustomHeading from '@/components/shared/CustomHeading'
import { getPreviousProjectById } from '@/functions/api'
import React, { useEffect, useState } from 'react'

const PreviousProjectView = ({ params }) => {
  const { previousProjectView } = params
  const [project, setProject] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPreviousProjectById(previousProjectView)
        setProject(response)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [previousProjectView])

  return (
    <div className=" mx-auto my-10 px-5">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Previous'} secondText={'Project'} />

            <div className="max-w-[55rem] mx-auto mt-10">
              <div className="shadow-lg w-full md:w-[600px] xl:w-[55rem] h-64 rounded-2xl overflow-hidden">
                <img
                  src={project?.img_url}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <h1 className=" text-2xl text-center text-primary font-semibold pt-4 pb-2 cursor-pointer">
                {project?.title}
              </h1>

              {/* <p className="text-[12px] text-center text-gray-700">
                Location: Dhaka
              </p> */}

              <div className="flex flex-col items-center border px-4 py-4 rounded-xl mt-4 border-gray-400 ">
                <h1 className="text-lg mb-2">Project Description</h1>
                <p className="text-sm text-gray-600 text-justify">
                  {project?.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviousProjectView
