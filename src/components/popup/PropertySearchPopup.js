import { getAllDivision, getAreaListForDivision } from '@/functions/api'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const PropertySearchPopup = ({ setOpenPopup, formData, setFormData, func }) => {
  const [divisions, setDivisions] = useState([])
  const [areas, setAreas] = useState([])

  useEffect(() => {
    const fetchDivisions = async () => {
      const data = await getAllDivision()
      setDivisions(data)
    }
    fetchDivisions()
  }, [])

  useEffect(() => {
    const fetchArea = async () => {
      const data = await getAreaListForDivision(formData.division)
      setAreas(data)
    }
    fetchArea()
  }, [formData.division])

  return (
    <div className="popup_wrapper">
      <div className="popup_content popup_bg">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-800">
            Property Search
          </h1>

          {/* Cross icon */}
          <div
            onClick={() => setOpenPopup(false)}
            className="bg-primary cursor-pointer absolute top-2 right-2 rounded-full p-1"
          >
            <RxCross2 className="text-xl text-white cursor-pointer " />
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-4">
              <select
                onChange={e => {
                  setFormData({ ...formData, division: e.target.value })
                }}
                id="Division"
                className="bg-gray-200 col-span-2 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block w-full p-2.5 mt-4"
              >
                <option selected>Select Division</option>
                {divisions?.map((division, index) => (
                  <option key={index} value={division.division}>
                    {division.division}
                  </option>
                ))}
              </select>

              <select
                onChange={e => {
                  setFormData({ ...formData, area: e.target.value })
                }}
                id="area"
                className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-4"
              >
                <option selected>Select Area</option>
                {areas?.map((area, index) => (
                  <option key={index} value={area.area}>
                    {area.area}
                  </option>
                ))}
              </select>

              <select
                onChange={e => {
                  setFormData({ ...formData, type: e.target.value })
                }}
                id="all"
                className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-4"
              >
                <option selected>All</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial Space">Commercial Space</option>
                <option value="Shop">Shop</option>
              </select>
            </div>

            <button
              onClick={func}
              className="bg-primary mt-6 text-white w-full px-4 py-2 rounded-full"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertySearchPopup
