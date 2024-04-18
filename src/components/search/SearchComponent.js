import React, { useState, useRef, useEffect } from 'react'
import CustomHeading from '../shared/CustomHeading'
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi'
import PropertySearchPopup from '../popup/PropertySearchPopup'
import commonImage from '@/assets/common-side.PNG'

const SearchComponent = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const popupRef = useRef(null)

  useEffect(() => {
    // Function to handle clicks outside the popup
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpenPopup(false)
      }
    }

    // Add event listener when the popup is open
    if (openPopup) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      // Remove event listener when the popup is closed
      document.removeEventListener('mousedown', handleClickOutside)
    }

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openPopup])

  return (
    <>
      <div className="container mx-auto my-10">
        <div className="flex justify-between gap-10">
          <div className="w-[55rem]">
            <div className="flex flex-col items-center justify-start">
              <CustomHeading firstText={'Search'} />
              <p className="text-sm mb-8">Find a property</p>
              <div className="w-full mx-auto my-10">
                <form>
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative" ref={popupRef}>
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
                    {/* <PiDotsThreeOutlineVerticalFill
                      color="red"
                      className="text-primary absolute end-2.5 bottom-2.5   font-medium rounded-lg text-sm px-4 py-2 "
                    /> */}
                  </div>
                </form>
              </div>
              <div
                style={{
                  boxShadow:
                    '0 4px 8px rgba(0, 0, 0, 0.05), 0 6px 20px rgba(0, 0, 0, 0.1)',
                }}
                className=" rounded-xl w-full mx-auto p-4"
              >
                <div className="flex gap-4 items-start">
                  <div className="rounded-md overflow-hidden">
                    <img
                      src="https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2243.jpg?w=996&t=st=1705758284~exp=1705758884~hmac=bd04a7ac7bd80196fc172606a27c387178e06d677ec62de5fb59de5b62839b0c"
                      alt=""
                      className="w-full h-36"
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <h1 className="text-lg text-primary font-semibold">
                      SEL Miraj
                    </h1>
                    <p className="text-sm text-gray-600">Address: Azimpur</p>

                    <p className="text-sm text-gray-600">Area: Lalbagh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[30rem]">
            <img src={commonImage.src} className="w-full" alt="" />
          </div>
        </div>
      </div>

      {openPopup && <PropertySearchPopup ref={popupRef} />}
    </>
  )
}

export default SearchComponent
