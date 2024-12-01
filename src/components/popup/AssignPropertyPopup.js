import {
  asignPropertyToClient,
  getNonAssignedProperties,
} from '@/functions/api'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'

const AssignPropertyPopup = ({ setOpenPopup, user_id }) => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)

  const [assignedProperty, setAssignedProperty] = useState('')

  useEffect(() => {
    setLoading(true)
    const retriveData = async () => {
      const data = await getNonAssignedProperties()
      setProperties(data)
      setLoading(false)
    }
    retriveData()
  }, [])

  const handleAssignProperty = async () => {
    if (!assignedProperty) {
      return toast.error('Please select a property')
    }

    const response = await asignPropertyToClient(assignedProperty, user_id)
    if (!response) {
      return toast.error('Failed to assign property')
    }
    toast.success('Property assigned successfully')
    setOpenPopup(false)
  }

  return (
    <div className="popup_wrapper">
      <div className="popup_content popup_bg">
        <div className="">
          <h1 className="text-2xl mb-5 font-semibold text-gray-800">
            Assign Property
          </h1>

          {/* Cross icon */}
          <div
            onClick={() => setOpenPopup(false)}
            className="bg-primary cursor-pointer absolute top-2 right-2 rounded-full p-1"
          >
            <RxCross2 className="text-xl text-white cursor-pointer " />
          </div>

          <div>
            <div className="grid gap-3 md:grid-cols-2 w-full">
              <div className="mb-1 w-full md:col-span-2">
                <select
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                  name="assignedProperty"
                  onChange={e => setAssignedProperty(e.target.value)}
                >
                  <option selected value="" disabled>
                    Select Property
                  </option>
                  {properties?.map((property, index) => (
                    <option key={index} value={property.id}>
                      <span>
                        {' '}
                        {property.name}
                        {property.address && ', '}
                      </span>
                      <span>{property.address}</span>
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button>
              <button
                onClick={handleAssignProperty}
                className="bg-primary px-4 py-2 text-white rounded-lg w-full mt-4"
              >
                Assign Property
              </button>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignPropertyPopup
