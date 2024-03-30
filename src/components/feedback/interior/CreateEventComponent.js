import React, { useState } from 'react'
import commonImage from '../../../assets/common-side.PNG'
import CustomHeading from '@/components/shared/CustomHeading'

const CreateEventComponent = () => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex flex-col items-center justify-start">
            <CustomHeading firstText={'Create Event'} />
            <p className="text-sm mb-8 mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              doloribus magni voluptatum
            </p>

            <form className="flex w-full flex-col items-center justify-center mt-5">
              <div className="grid gap-3 md:grid-cols-2 w-full">
                <div className="mb-3 w-full md:col-span-2">
                  <input
                    type="text"
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                    placeholder="Event Title"
                    name="eventTitle"
                  />
                </div>

                <div className="mb-3 w-full">
                  <input
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                    type="date"
                    placeholder="Date"
                    onChange={e => setDate(e.target.value)}
                  />
                </div>

                <div className="mb-3 w-full">
                  <input
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                    type="time"
                    placeholder="Time"
                    onChange={e => setTime(e.target.value)}
                  />
                </div>

                <div className="mb-3 w-full">
                  <input
                    className={`${
                      date ? 'bg-gray-200' : 'bg-red-200'
                    } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5`}
                    type="text"
                    placeholder={date ? date : 'No date selected'}
                    readOnly
                    disabled
                  />
                </div>

                <div className="mb-3 w-full">
                  <input
                    className={`${
                      time ? 'bg-gray-200' : 'bg-red-200'
                    } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5`}
                    type="text"
                    placeholder={time ? time : 'No time selected'}
                    readOnly
                    disabled
                  />
                </div>

                <div className="mb-3 w-full md:col-span-2">
                  <textarea
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                    type="text"
                    placeholder="Description"
                  />
                </div>
              </div>
              <button className="bg-primary text-white w-full  py-2 px-10 mt-5 rounded-3xl">
                Create Event
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default CreateEventComponent
