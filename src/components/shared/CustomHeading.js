import React from 'react'

const CustomHeading = ({ firstText, secondText, bar, rev }) => {
  return (
    <div className="flex items-center gap-4">
      {bar && <div className="bg-primary h-10 w-1"></div>}

      <div>
        {rev ? (
          <h1 className="text-2xl font-bold text-primary">
            <span className="text-gray-800">{firstText}</span>{' '}
            {secondText && secondText}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-primary">{firstText}</span>{' '}
            {secondText && secondText}
          </h1>
        )}
      </div>
    </div>
  )
}

export default CustomHeading
