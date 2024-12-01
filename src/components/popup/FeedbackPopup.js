import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const FeedbackPopup = ({ setOpenPopup, setReply, func }) => {
  return (
    <div className="popup_wrapper">
      <div className="popup_content popup_bg">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-800">
            Feedback reply
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
                  setReply(e.target.value)
                }}
                type="text"
                placeholder="Type your answer here..."
                className="bg-gray-200 border border-transparent text-gray-900 text-sm rounded-lg outline-none focus:border-primary block  p-2.5 mt-4"
              />
            </div>

            <div className="flex items-center justify-between gap-10">
              <button
                onClick={func}
                className="bg-white mt-6 text-primary border-[2px] border-primary w-full px-4 py-2 rounded-lg font-semibold"
              >
                Send
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

export default FeedbackPopup
