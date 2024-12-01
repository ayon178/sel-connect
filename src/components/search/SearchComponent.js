'use client'

import React, { useEffect, useState } from 'react'
import CustomHeading from '../shared/CustomHeading'
import PropertySearchPopup from '../popup/PropertySearchPopup'
import commonImage from '@/assets/common-side.PNG'
import toast from 'react-hot-toast'
import {
  getAllDivision,
  getAppartmentBySearch,
  getAreaListForDivision,
} from '@/functions/api'
import { useRouter } from 'next/navigation'

const SearchComponent = () => {
  const router = useRouter()
  const [divisions, setDivisions] = useState([])
  const [areas, setAreas] = useState([])

  const [formData, setFormData] = useState({
    division: '',
    area: '',
    type: 'all',
  })
  const [openPopup, setOpenPopup] = useState(false)
  const [filteredApartment, setFilteredApartment] = useState([])

  const handleSearch = async () => {
    if (formData.division === '' || formData.area === '') {
      toast.error('Please select all fields')
      return
    }
    const data = await getAppartmentBySearch(formData)
    setFilteredApartment(data)
    setOpenPopup(false)
  }

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

  console.log(filteredApartment)

  return (
    <>
      <div className="container mx-auto my-10 px-5">
        <div className="flex items-start justify-between gap-10">
          <div className="w-[55rem]">
            <div className="flex  mt-14 flex-col items-center justify-start">
              <CustomHeading firstText={'Search'} />
              <p className="text-sm">Find available properties of SEL here</p>
              <div className="w-full mx-auto my:5 md:my-10">
                {/* <form>
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full px-6 py-3 ps-12 text-gray-900 border-2 border-slate-400 rounded-full bg-slate-50 focus:border-primary outline-none"
                      placeholder="Property Search"
                      required
                      onClick={() => setOpenPopup(true)}
                    />
                  </div>
                </form> */}

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
                    onClick={handleSearch}
                    className="bg-primary mt-6 text-white w-full px-4 py-2 rounded-full"
                  >
                    Search
                  </button>
                </div>
              </div>
              {filteredApartment?.map((apartment, index) => (
                <div
                  onClick={() =>
                    router.push(`/user/search/flat-list/${apartment?.id}`)
                  }
                  key={index}
                  style={{
                    boxShadow:
                      '0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 20px rgba(0, 0, 0, 0.1)',
                  }}
                  className=" rounded-xl w-full mx-auto p-4 cursor-pointer"
                >
                  <div className="sm:flex gap-4 items-start">
                    <div className="rounded-md bg-gray-300 p-2 h-full w-full md:w-1/3 flex items-center justify-center overflow-hidden">
                      <img
                        src={apartment?.img_url}
                        alt=""
                        className="w-full h-36"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <h1 className="text-lg text-primary font-semibold">
                        {apartment?.name}
                      </h1>
                      <p className="text-sm text-gray-600">
                        Address: {apartment?.address}
                      </p>

                      <p className="text-sm text-gray-600">
                        Area: {apartment?.area}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-[30rem] sticky top-24 hidden md:flex">
            <img src={commonImage.src} className="w-full" alt="" />
          </div>
        </div>
      </div>

      {openPopup && (
        <PropertySearchPopup
          setOpenPopup={setOpenPopup}
          formData={formData}
          setFormData={setFormData}
          func={handleSearch}
        />
      )}
    </>
  )
}

export default SearchComponent
