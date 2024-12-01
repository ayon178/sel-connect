import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../config/firebase.init'

export const fileUploader = async file => {
  const storageRef = ref(
    storage,
    `feedback_image/${new Date().getTime()}${file.name}`
  )
  const snapshot = await uploadBytes(storageRef, file)
  const downloadUrl = await getDownloadURL(storageRef)
  return downloadUrl
}

export const formatDateFromTimestamp = timestamp => {
  // Convert timestamp to a number if it's not already
  const date = new Date(Number(timestamp))

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid Date')
    return 'Invalid Date'
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based in JavaScript
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function extractNumbers(str) {
  return str.match(/\d+/g).map(Number)
}

export const formatTimeStampToDayMonthYear = timestamp => {
  console.log(timestamp)
  // Wed, 16 Feb 2022 3:30 PM format
  const date = new Date(Number(timestamp))
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export function convertTo12HourFormat(time) {
  let [hours, minutes] = time.split(':')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12 // Convert "00" hrs to "12"
  return `${hours}:${minutes} ${ampm}`
}

export function formatTimeFromTimestamp(timestamp) {
  // Convert the timestamp to a number
  const date = new Date(Number(timestamp))

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid timestamp'
  }

  // Get hours and minutes from the date object
  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0') // Ensure two digits

  // Determine AM/PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM'

  // Convert 24-hour format to 12-hour format
  hours = hours % 12 || 12 // Converts "0" hour to "12" for 12 AM/PM

  // Combine into desired format
  return `${hours}:${minutes} ${ampm}`
}
