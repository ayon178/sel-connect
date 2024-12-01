'use client'

import { useEffect, useState } from 'react'

import 'react-dropzone-uploader/dist/styles.css' // Import styles from the library
import Dropzone from 'react-dropzone-uploader'
import toast from 'react-hot-toast'
import CustomHeading from '@/components/shared/CustomHeading'
import {
  createApartment,
  createProperty,
  deleteApartment,
  deleteProperty,
  getAllApartmentList,
  getAllDivision,
  getAreaListForDivision,
  ownerTypeFromDb,
  propertyTypeFromDb,
} from '@/functions/api'
import { extractNumbers, fileUploader } from '@/helper/helper'

const CreatePropertyComponent = ({ page }) => {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [imageToUpload, setImageToUpload] = useState([])
  const [formData, setFormData] = useState({
    property_type: '',
    owner_type: '',
    division: '',
    area: '',
    name: '',
    address: '',
    web_link: '',
    level: 0,
    unit_number: '',
  })

  const [apartments, setApartments] = useState([])
  const [divisions, setDivisions] = useState([])
  const [areas, setAreas] = useState([])
  const [propertyType, setPropertyType] = useState([])
  const [ownerType, setOwnerType] = useState([])

  useEffect(() => {
    const fetchDivisions = async () => {
      const apartmentList = await getAllApartmentList()
      setApartments(apartmentList)

      const propertyTypeList = await propertyTypeFromDb()
      setPropertyType(propertyTypeList)

      const ownerTypeList = await ownerTypeFromDb()
      setOwnerType(ownerTypeList)

      const data = await getAllDivision()
      setDivisions(data)
    }
    fetchDivisions()
  }, [])

  useEffect(() => {
    const fetchArea = async () => {
      const data = await getAreaListForDivision(formData.division)
      setAreas(data)
    }
    fetchArea()
  }, [formData.division])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleChangeStatus = ({ meta = {}, file }, status) => {
    if (status === 'done') {
      const newImages = {
        ...file,
        preview: URL.createObjectURL(file),
        meta,
      }
      setImages(prevImages => [...prevImages, newImages])

      setImageToUpload(prev => [...prev, file])
    }
    if (status === 'removed') {
      const remainingImages = images.filter(
        image => image.meta && image.meta.id !== meta.id
      )
      setImages(remainingImages)

      const remainingFiles = remainingImages.map(image => image.file)

      setImageToUpload(remainingFiles)
    }
  }

  const retriveFileUrl = async file => {
    if (file) {
      const url = await fileUploader(file)
      return url
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (formData.title === '' || formData.description === '') {
      toast.error('Please fill all the fields')
      return
    }
    setLoading(true)
    const urls = await Promise.all(
      imageToUpload.map(image => retriveFileUrl(image))
    )

    // current timestamp
    const timestamp = String(new Date().getTime())

    const dataToSubmit = {
      img_url: urls[0],
      id: timestamp,
      address: formData.address,
      area: formData.area,
      division: formData.division,
      name: formData.name,
      owner_type: formData.owner_type,
      property_type: formData.property_type,
      sub_acc: [],
      sub_aft: [],
      sub_con: [],
      sub_int: [],
      web_link: formData.web_link,
    }

    const res = await createApartment(dataToSubmit)

    if (res) {
      toast.success('Property Created Successfully')
      // create properties
      // const numberForLooping =
      //   formData.level * extractNumbers(formData.unit_number)[0]

      const numberForLooping = formData.level * formData.unit_number

      const idArray = []
      // loop through the number of units
      for (let i = 1; i <= numberForLooping; i++) {
        const id = String(new Date().getTime())
        idArray.push(id)

        // Suppose we have 3 levels and 2 unit per level.So for level 1 the unit number will be 1A, 1B. For level 2 the unit number will be 2A, 2B and the level will be 1,2 and 3
        // Calculate level and unit
        const level = Math.ceil(i / formData.unit_number) // Calculate current level based on units per level
        const unitIndex = (i - 1) % formData.unit_number // Calculate the unit index within the level
        const unit = `${level}${String.fromCharCode(65 + unitIndex)}` // Unit suffix (A, B, C, ...)

        const data = {
          apartment_id: timestamp,
          address: formData.address,
          area: formData.area,
          division: formData.division,
          has_owner: '0',
          id,
          img_url: urls[0],
          level: String(level),
          name: formData.name,
          owner_type: formData.owner_type,
          pdf_url: '',
          property_type: formData.property_type,
          unit_number: unit,
          web_link: formData.web_link,
        }
        const propertyRes = await createProperty(data)

        // if !propertyRes stop the loop
        if (!propertyRes) {
          // delete the addeded property and apartment
          idArray.forEach(async id => {
            await deleteProperty(id)
          })
          await deleteApartment(timestamp)
          setLoading(false)
          toast.error('Failed to create property')
          break
        }
      }
      setLoading(false)
      toast.success('Property Created Successfully')
      window.location.reload()
    }
  }

  return (
    <div className="max-w-[62rem] mx-auto mt-10 px-5">
      <div className="flex flex-col sm:flex-row justify-between gap-10">
        <div className="w-full sm:w-[55rem]">
          <div className="flex justify-center text-center sm:text-start">
            <CustomHeading
              firstText={'Create New'}
              secondText="Property"
              className="text-lg sm:text-xl xl:text-2xl" // Adjusted for larger text size on XL screens
            />
          </div>

          <div className="flex max-w-[900px] mx-auto mt-5 flex-col md:flex-row items-center md:items-start">
            <Dropzone
              onChangeStatus={handleChangeStatus}
              accept="image/*"
              multiple
              styles={{
                dropzone: {
                  border: '2px dashed',
                  borderRadius: '8px',
                  padding: '2rem',
                  marginTop: '1rem',
                  marginBottom: '2rem',
                  width: '100%',
                  maxWidth: '30rem',
                  maxHeight: '18rem',
                  textAlign: 'center',
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
            {/* {images.length > 0 && (
              <div className="flex flex-wrap mt-6 ml-0 md:ml-5">
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
            )} */}
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <form className="flex w-full flex-col items-center justify-center mt-10">
              <div className="grid gap-3 md:grid-cols-2 w-full px-5 xl:px-10">
                <div className="mb-1 w-full md:col-span-2">
                  <select
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:text-md"
                    name="property_type"
                    onChange={handleChange}
                  >
                    <option selected value="" disabled>
                      Select Property Type
                    </option>
                    {propertyType?.map((type, index) => (
                      <option key={index} value={type.type}>
                        {type.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-1 w-full md:col-span-2">
                  <select
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:text-md"
                    name="owner_type"
                    onChange={handleChange}
                  >
                    <option selected value="" disabled>
                      Select Owner Type
                    </option>
                    {ownerType?.map((type, index) => (
                      <option key={index} value={type.type}>
                        {type.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-1 w-full md:col-span-2">
                  <select
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:text-md"
                    name="division"
                    onChange={e => {
                      setFormData({ ...formData, division: e.target.value })
                    }}
                    id="Division"
                  >
                    <option selected>Select Division</option>
                    {divisions?.map((division, index) => (
                      <option key={index} value={division.division}>
                        {division.division}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-1 w-full md:col-span-2">
                  <select
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:text-md"
                    name="area"
                    onChange={e => {
                      setFormData({ ...formData, area: e.target.value })
                    }}
                    id="area"
                  >
                    <option selected>Select Area</option>
                    {areas?.map((area, index) => (
                      <option key={index} value={area.area}>
                        {area.area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-1 w-full md:col-span-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Property Name"
                    onChange={handleChange}
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:text-md"
                  />
                </div>

                <div className="mb-1 w-full md:col-span-2">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:text-md"
                  />
                </div>

                <div className="mb-1 w-full md:col-span-2">
                  <input
                    type="text"
                    name="web_link"
                    placeholder="Web Link"
                    onChange={handleChange}
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:text-md"
                  />
                </div>

                <div className="mb-1 w-full">
                  <input
                    required
                    type="number"
                    name="level"
                    placeholder="Level"
                    onChange={handleChange}
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:text-md"
                  />
                </div>
                <div className="mb-1 w-full">
                  <input
                    required
                    type="text"
                    name="unit_number"
                    placeholder="Unit Number"
                    onChange={handleChange}
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary outline-none block w-full p-3 xl:text-md"
                  />
                </div>
              </div>

              <div className="flex my-3 justify-center w-full md:col-span-2">
                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="px-10 w-72 py-2.5 rounded-3xl bg-primary text-white text-sm font-medium xl:py-3"
                >
                  {loading ? 'Please Wait...' : 'Add Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePropertyComponent
