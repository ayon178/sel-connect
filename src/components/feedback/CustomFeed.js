import { useCallback, useState } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import CustomHeading from '../shared/CustomHeading'
import commonImage from '../../assets/common-side.PNG'
import 'react-dropzone-uploader/dist/styles.css' // Import styles from the library
import Dropzone from 'react-dropzone-uploader'

const CustomFeed = () => {
  const [images, setImages] = useState([])
  const [imageToUpload, setImageToUpload] = useState(null)

  const handleChangeStatus = ({ meta = {}, file }, status) => {
    if (status === 'done') {
      const newImages = {
        ...file,
        preview: URL.createObjectURL(file),
        meta,
      }
      setImages(prevImages => [...prevImages, newImages])

      // setImageToUpload(file)
    }
    if (status === 'removed') {
      const remainingImages = images.filter(
        image => image.meta && image.meta.id !== meta.id
      )
      setImages(remainingImages)
    }
  }

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
          <div className="flex max-w-[900px] mx-auto mt-5 flex-col md:flex-row items-center md:items-start">
            <Dropzone
              onChangeStatus={handleChangeStatus}
              accept="image/*"
              multiple
              styles={{
                dropzone: {
                  border: '2px dashed',
                  borderRadius: '8px',
                  padding: '8rem',
                  marginTop: '1rem',
                  marginBottom: '2rem',
                  width: '24rem',
                  maxHeight: '18rem',
                },
                dropzoneActive: {
                  borderColor: '#3182ce',
                },
                submitButton: {
                  backgroundColor: '#f56565',
                  color: 'white',
                  padding: '0.5rem 2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginTop: '2rem',
                },
              }}
            />
            {images.length > 0 && (
              <div className="flex flex-wrap mt-6 ml-5">
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
