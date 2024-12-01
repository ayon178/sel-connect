import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const ClientSearchPopup = ({
  setOpenPopup,
  setSearchText,
  searchText,
  func,
}) => {
  return (
    <div className="popup_wrapper">
      <div className="popup_content popup_bg">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-800">
            Client Search
          </h1>

          {/* Cross icon */}
          <div
            onClick={() => setOpenPopup(false)}
            className="bg-primary cursor-pointer absolute top-2 right-2 rounded-full p-1"
          >
            <RxCross2 className="text-xl text-white cursor-pointer " />
          </div>

          <div>
            <div className="grid grid-cols-1 gap-x-4">
              <input
                onChange={e => {
                  setSearchText({ ...searchText, searchText: e.target.value })
                }}
                type="text"
                placeholder="Phone/Email/Client ID/Full Name"
                className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-4 xl:py-3"
              />

              <select
                onChange={e => {
                  setSearchText({ ...searchText, key: e.target.value })
                }}
                id="key"
                className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-4 xl:py-3"
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="client_id">Client ID</option>
                <option value="name">Full Name</option>
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

export default ClientSearchPopup
