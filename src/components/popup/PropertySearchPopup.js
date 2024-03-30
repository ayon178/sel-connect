import React from 'react'

const PropertySearchPopup = () => {
  return (
    <div className="popup_wrapper">
      <div className="popup_content popup_bg">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-800">
            Property Search
          </h1>

          <form>
            <div className="grid grid-cols-2 gap-x-4">
              <select
                id="Division"
                class="bg-gray-200 col-span-2 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block w-full p-2.5 mt-4"
              >
                <option selected>Select Division</option>
                <option value="US">Dhaka</option>
                <option value="CA">Khulna</option>
                <option value="FR">Barishal</option>
                <option value="DE">Chattogram</option>
              </select>

              <select
                id="area"
                class="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-4"
              >
                <option selected>Select Area</option>
                <option value="US">Dhaka</option>
                <option value="CA">Khulna</option>
                <option value="FR">Barishal</option>
                <option value="DE">Chattogram</option>
              </select>

              <select
                id="all"
                class="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-4"
              >
                <option selected>All</option>
                <option value="US">Dhaka</option>
                <option value="CA">Khulna</option>
                <option value="FR">Barishal</option>
                <option value="DE">Chattogram</option>
              </select>
            </div>

            <button className="bg-primary mt-6 text-white w-full px-4 py-2 rounded-full">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PropertySearchPopup
