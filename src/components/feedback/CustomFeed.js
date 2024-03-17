import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaFileUpload } from 'react-icons/fa'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '../../assets/common-side.PNG'

const CustomFeed = () => {
  const [images, setImages] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    const newImages = acceptedFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
    }))

    setImages(prevImages => [...prevImages, ...newImages])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  })

  return (
    <div className="container mx-auto my-20">
      <div className="flex justify-between gap-10">
        <div className="w-[55rem]">
          <div className="flex justify-center">
            <CustomHeading firstText="Construction Custom Feedback" />
          </div>
          <p className="text-gray-500 mt-2 text-sm text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Voluptates, aspernatur.
          </p>
          <div
            className={`flex max-w-[900px] mx-auto mt-5 flex-col md:flex-row items-center md:items-start ${
              images.length > 0 ? '' : 'justify-center'
            }`}
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 mt-8 mb-4 md:mb-0 md:mr-4 md:w-96 h-72 ${
                isDragActive ? 'border-blue-900' : 'border-gray-500'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center h-full">
                <FaFileUpload className="text-4xl mb-2 text-gray-500" />
                <p className="text-gray-700 text-sm shadow-primary text-center font-semibold">
                  Drag and drop files <br /> or, <br />
                </p>
                <button className="bg-red-200 px-4 py-1 font-semibold mt-2 rounded-lg text-primary">
                  Browse Files
                </button>
              </div>
            </div>
            {images.length > 0 && (
              <div className="flex flex-wrap mt-6">
                {images.map((image, index) => (
                  <div key={index} className="m-2">
                    <img
                      src={image.preview}
                      alt={`preview-${index}`}
                      className="max-w-full max-h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="w-full mx-auto">
            <form className="flex w-full flex-col items-center justify-center mt-10">
              <div className="grid gap-3 md:grid-cols-2 w-full">
                <div className="mb-3 w-full md:col-span-2">
                  <input
                    type="text"
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                    placeholder="Tiles (Bath & Kitchen)"
                    name="eventTitle"
                  />
                </div>
              </div>
              <div className="mb-3 w-full md:col-span-2">
                <textarea
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-2.5"
                  type="text"
                  placeholder="Description"
                />
              </div>
              <div className="flex mt-3 justify-center w-full md:col-span-2">
                <button className="px-10 w-72 py-2.5 rounded-3xl bg-primary text-white text-sm font-medium">
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-[30rem]">
          <img src={commonImage.src} className="w-full" alt="" />
        </div>
      </div>
    </div>
  )
}

export default CustomFeed
