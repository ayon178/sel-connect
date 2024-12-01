import React from 'react'

import { RxCross2 } from 'react-icons/rx'

const AssignPropertyFromAdmin = ({
  setOpenPopup,
  func,
  clickLoader,
  setLoading,
}) => {
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
            <p>Are you sure you want to assign the property to this client?</p>
          </div>

          <div className="flex justify-start gap-4 mt-5">
            <button
              onClick={() => setOpenPopup(false)}
              className="bg-primary px-6 py-2 text-white rounded-lg hover:bg-red-600 transition-all delay-75"
            >
              Cancel
            </button>
            <button
              disabled={clickLoader}
              onClick={() => {
                !clickLoader && func()
              }}
              className="bg-green-600 px-6 py-2 text-white rounded-lg hover:bg-green-800 transition-all delay-75"
            >
              {clickLoader ? 'Please Wait' : 'Assign'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignPropertyFromAdmin
