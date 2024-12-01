import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const DeletePropertyConfirmation = ({ setOpenPopup, func }) => {
  return (
    <div className="popup_wrapper">
      <div className="popup_content popup_bg">
        <div className="">
          

          {/* Cross icon */}
          <div
            onClick={() => setOpenPopup(false)}
            className="bg-primary cursor-pointer absolute top-2 right-2 rounded-full p-1"
          >
            <RxCross2 className="text-xl text-white cursor-pointer " />
          </div>

          <div>
            <h1 className='text-center'>Are you sure you want to delete this property?</h1>

            <div className="flex items-center justify-between gap-10">
              <button
                onClick={func}
                className="bg-white mt-6 text-primary border-[2px] border-primary w-full px-4 py-2 rounded-lg font-semibold"
              >
                Delete
              </button>
              <button
                onClick={() => setOpenPopup(false)}
                className="bg-white mt-6 text-primary border-[2px] border-primary w-full px-2 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeletePropertyConfirmation
