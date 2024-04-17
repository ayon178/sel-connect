import { db, firestore } from '../../config/firebase.init'

// Firestore imports
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
} from 'firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { uid } from 'uid'

export const getStorage = key => {
  if (typeof window !== 'undefined') {
    const storedData = window.localStorage.getItem(key)
    if (storedData) {
      return storedData
    }
  }
  return null
}

// ===================Accounts Feedback===================
export const getAllAccountsFeedback = async () => {
  try {
    const feedbackQuery = query(collection(db, 'accounts_feedback'))
    const feedbackSnapshot = await getDocs(feedbackQuery)
    const feedbackList = []
    feedbackSnapshot.forEach(doc => {
      feedbackList.push(doc.data())
    })
    return feedbackList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Accounts Feedback===================

// ===================Admin Data===================
export const getAdminData = async () => {
  try {
    const adminDataQuery = query(collection(db, 'admin_data'))
    const adminDataSnapshot = await getDocs(adminDataQuery)
    const adminDataList = []
    adminDataSnapshot.forEach(doc => {
      adminDataList.push(doc.data())
    })
    return adminDataList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Admin Data===================

// ===================Admin Notification===================
export const getAllAdminNotifications = async () => {
  try {
    const notificationQuery = query(collection(db, 'admin_notification'))
    const notificationSnapshot = await getDocs(notificationQuery)
    const notificationList = []
    notificationSnapshot.forEach(doc => {
      notificationList.push(doc.data())
    })
    return notificationList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Admin Notification===================

// ===================After Sales Feedback===================
export const getAllAfterSalesFeedback = async () => {
  try {
    const feedbackQuery = query(collection(db, 'after_sales_feedback'))
    const feedbackSnapshot = await getDocs(feedbackQuery)
    const feedbackList = []
    feedbackSnapshot.forEach(doc => {
      feedbackList.push(doc.data())
    })
    return feedbackList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================After Sales Feedback===================

// ===================Apartment List===================
export const getAllApartmentList = async () => {
  try {
    const apartmentQuery = query(collection(db, 'apartment_list'))
    const apartmentSnapshot = await getDocs(apartmentQuery)
    const apartmentList = []
    apartmentSnapshot.forEach(doc => {
      apartmentList.push(doc.data())
    })
    return apartmentList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Apartment List===================

// ===================Apartment Request===================
export const getAllApartmentRequest = async () => {
  try {
    const requestQuery = query(collection(db, 'apartment_request'))
    const requestSnapshot = await getDocs(requestQuery)
    const requestList = []
    requestSnapshot.forEach(doc => {
      requestList.push(doc.data())
    })
    return requestList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Apartment Request===================

// ===================Area Division Request===================
export const getAllAreaDivisionRequest = async () => {
  try {
    const requestQuery = query(collection(db, 'area_division_request'))
    const requestSnapshot = await getDocs(requestQuery)
    const requestList = []
    requestSnapshot.forEach(doc => {
      requestList.push(doc.data())
    })
    return requestList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Area Division Request===================

// ===================Construction Feedback===================
export const getAllConstructionFeedback = async () => {
  try {
    const feedbackQuery = query(collection(db, 'constructions_feedback'))
    const feedbackSnapshot = await getDocs(feedbackQuery)
    const feedbackList = []
    feedbackSnapshot.forEach(doc => {
      feedbackList.push(doc.data())
    })
    return feedbackList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Construction Feedback===================

// ===================Division===================
export const getAllDivision = async () => {
  try {
    const divisionQuery = query(collection(db, 'division'))
    const divisionSnapshot = await getDocs(divisionQuery)
    const divisionList = []
    divisionSnapshot.forEach(doc => {
      divisionList.push(doc.data())
    })
    return divisionList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Division===================
