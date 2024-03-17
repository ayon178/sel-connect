import React from 'react'

const CustomHeading = ({ firstText, secondText }) => {
  return (
    <div className="flex items-center gap-4">
      {/* <div className="bg-primary h-10 w-1"></div> */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-primary">{firstText && firstText}</span>{' '}
          {secondText && secondText}
        </h1>
      </div>
    </div>
  )
}

export default CustomHeading
