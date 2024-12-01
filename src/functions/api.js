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
  arrayUnion,
  orderBy,
  limit,
  startAfter,
  writeBatch,
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

// ===================User===================
export const login = async inputData => {
  let userQuery
  if (inputData.role === 'user') {
    userQuery = query(
      collection(db, 'user_data'),
      where('email', '==', inputData.email),
      where('password', '==', inputData.password)
    )
  } else {
    userQuery = query(
      collection(db, 'admin_data'),
      where('email', '==', inputData.email),
      where('pass', '==', inputData.password)
    )
  }

  const querySnapshot = await getDocs(userQuery)

  if (querySnapshot.empty) {
    return { error: 'Something went wrong', user: false }
  }

  let user = {}
  querySnapshot.forEach(doc => {
    user = doc.data()
  })

  return { error: false, user }
}

export const loggedInUser = async user_id => {
  const userQuery = query(
    collection(db, 'user_data'),
    where('user_id', '==', user_id)
  )

  const querySnapshot = await getDocs(userQuery)

  if (querySnapshot.empty) {
    return { error: 'Something went wrong', user: false }
  }

  let user = {}
  querySnapshot.forEach(doc => {
    user = doc.data()
  })

  return { error: false, user }
}
export const loggedInAdmin = async user_id => {
  const userQuery = query(
    collection(db, 'admin_data'),
    where('user_id', '==', user_id)
  )

  const querySnapshot = await getDocs(userQuery)

  if (querySnapshot.empty) {
    return { error: 'Something went wrong', user: false }
  }

  let user = {}
  querySnapshot.forEach(doc => {
    user = doc.data()
  })

  return { error: false, user }
}

export const getUserData = async userId => {
  try {
    const userQuery = query(
      collection(db, 'user_data'),
      where('user_id', '==', userId)
    )

    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      return { error: 'Something went wrong', user: false }
    }

    let user = {}
    querySnapshot.forEach(doc => {
      user = doc.data()
    })

    return { error: false, user }
  } catch (err) {
    console.log(err)
    return { error: 'Something went wrong', user: false }
  }
}

export const getCurrentAdminData = async userId => {
  try {
    const userQuery = query(
      collection(db, 'admin_data'),
      where('user_id', '==', userId)
    )

    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      return { error: 'Something went wrong', user: false }
    }

    let user = {}
    querySnapshot.forEach(doc => {
      user = doc.data()
    })

    return { error: false, user }
  } catch (err) {
    console.log(err)
    return { error: 'Something went wrong', user: false }
  }
}

export const getUserById = async userId => {
  try {
    const userQuery = query(
      collection(db, 'user_data'),
      where('client_id', '==', userId)
    )

    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      return { error: 'Something went wrong', user: false }
    }

    let user = {}
    querySnapshot.forEach(doc => {
      user = doc.data()
    })

    return { error: false, user }
  } catch (err) {
    console.log(err)
    return { error: 'Something went wrong', user: false }
  }
}
export const getUserByIdNew = async userId => {
  try {
    const userQuery = query(
      collection(db, 'user_data'),
      where('user_id', '==', userId)
    )

    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      return { error: 'Something went wrong', user: false }
    }

    let user = {}
    querySnapshot.forEach(doc => {
      user = doc.data()
    })

    return { error: false, user }
  } catch (err) {
    console.log(err)
    return { error: 'Something went wrong', user: false }
  }
}

export const getUserByEmail = async email => {
  try {
    const userQuery = query(
      collection(db, 'user_data'),
      where('email', '==', email)
    )

    const querySnapshot = await getDocs(userQuery)

    if (querySnapshot.empty) {
      return { error: 'Something went wrong', user: false }
    }

    let user = {}
    querySnapshot.forEach(doc => {
      user = doc.data()
    })

    return { error: false, user }
  } catch (err) {
    console.log(err)
    return { error: 'Something went wrong', user: false }
  }
}

export const updateClientData = async (email, data) => {
  try {
    const userRef = doc(db, 'user_data', email)
    await updateDoc(userRef, data)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const updateUserData = async (email, data) => {
  try {
    const userRef = doc(db, 'admin_data', email)
    await updateDoc(userRef, data)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const createUser = async data => {
  try {
    const userRef = doc(db, 'user_data', data.email)

    await setDoc(userRef, data)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const getAllClients = async () => {
  try {
    const clients = []
    const querySnapshot = await getDocs(collection(db, 'user_data'))
    querySnapshot.forEach(doc => {
      clients.push(doc.data())
    })
    return clients
  } catch (err) {
    console.log(err)
    return []
  }
}

export const getClientBySearch = async searchData => {
  try {
    const userQuery = query(
      collection(db, 'user_data'),
      where(searchData.key, '==', searchData.searchText)
    )

    const querySnapshot = await getDocs(userQuery)
    if (querySnapshot.empty) {
      return { error: 'No user found', user: false }
    }

    let user = {}
    querySnapshot.forEach(doc => {
      user = doc.data()
    })

    return { error: false, user }
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================User===================

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

export const getAccountsFeedbackByCompleteStatus = async status => {
  try {
    // Create a reference to the 'accounts_feedback' collection
    const feedbackRef = collection(db, 'accounts_feedback')

    // Create constraints for the query
    const constraints = []
    if (status) {
      constraints.push(where('status', '==', status))
    }

    // Construct the query with the constraints
    const feedbackQuery = query(feedbackRef, ...constraints)

    // Execute the query and get the documents
    const feedbackSnapshot = await getDocs(feedbackQuery)
    const feedbackList = []

    // Process the documents
    feedbackSnapshot.forEach(doc => {
      feedbackList.push(doc.data())
    })

    // Return the list of feedback
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

export const getAdminsBySub = async sub => {
  try {
    const adminDataQuery = query(
      collection(db, 'admin_data'),
      where('sub', '==', sub)
    )
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

export const getSubAdminList = async (departmentType, isSubAdmin) => {
  try {
    const subAdminQuery = query(
      collection(db, 'admin_data'),
      where('type', '==', departmentType),
      where('sub', '==', isSubAdmin)
    )
    const subAdminSnapshot = await getDocs(subAdminQuery)
    const subAdminList = []
    subAdminSnapshot.forEach(doc => {
      subAdminList.push(doc.data())
    })
    return subAdminList
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

export const addNotification = async data => {
  try {
    const notificationRef = collection(db, 'notification_data')
    await setDoc(doc(notificationRef, String(data.noti_id)), data)
    return true
  } catch (error) {
    console.log('Error adding document: ', error)
    return false
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

export const getAfterSalesFeedbackByCompleteStatus = async status => {
  try {
    const feedbackQuery = query(
      collection(db, 'after_sales_feedback'),
      where('status', '==', status)
    )
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

// ===================Legal Feedback===================
export const getLegalFeedbackByCompleteStatus = async status => {
  try {
    const feedbackQuery = query(
      collection(db, 'legal_feedback'),
      where('status', '==', status)
    )
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
// ===================Legal Feedback===================

// ===================Apartment List===================
export const createApartment = async data => {
  try {
    const apartmentRef = collection(db, 'apartment_list')
    await setDoc(doc(apartmentRef, data.id), data)
    return true
  } catch (error) {
    console.log('Error adding document: ', error)
    return false
  }
}

export const deleteApartment = async id => {
  try {
    await deleteDoc(doc(db, 'apartment_list', id))
    return true
  } catch (error) {
    console.log('Error deleting document: ', error)
    return false
  }
}

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

export const getApartmentByAdmin = async adminId => {
  try {
    const apartmentQuery = query(
      collection(db, 'apartment_list'),
      where('admins', 'array-contains', adminId)
    )
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

export const getAppartmentBySearch = async formData => {
  console.log('formData', formData)
  try {
    // Start with the collection reference
    let apartmentQuery = collection(db, 'apartment_list')

    // Create an array to hold the where clauses
    const constraints = [
      where('division', '==', formData.division),
      where('area', '==', formData.area),
    ]

    // Add the property_type where clause only if it's not 'all'
    if (formData.type !== 'all') {
      constraints.push(where('property_type', '==', formData.type))
    }

    // Construct the query with the constraints
    apartmentQuery = query(apartmentQuery, ...constraints)

    // Execute the query
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

export const getApartmentById = async id => {
  console.log('id', id)
  try {
    const apartmentQuery = query(
      collection(db, 'apartment_list'),
      where('id', '==', id)
    )
    const apartmentSnapshot = await getDocs(apartmentQuery)
    let apartment = {}
    apartmentSnapshot.forEach(doc => {
      apartment = doc.data()
    })
    return apartment
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const updateApartmentList = async (department, apartmentId, adminId) => {
  // if the key depertment array is exist then just append the adminId into the array
  const apartmentRef = doc(db, 'apartment_list', apartmentId)
  try {
    // Update the dynamic department array with the new adminId
    await updateDoc(apartmentRef, {
      [department]: arrayUnion(adminId),
    })
    return true
  } catch (error) {
    console.error('Error updating apartment list:', error)
    return false
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

export const deleteApartmentWithProperty = async id => {
  try {
    // Delete the apartment from 'apartment_list' collection
    await deleteDoc(doc(db, 'apartment_list', id))

    // Reference the 'property_list' collection
    const propertyListRef = collection(db, 'property_list')

    // Query to get all properties where 'apartment_id' matches the deleted apartment's id
    const q = query(propertyListRef, where('apartment_id', '==', id))
    const querySnapshot = await getDocs(q)

    // Initialize batch
    const batch = writeBatch(db)

    // Loop through the documents and add delete operations to the batch
    querySnapshot.forEach(doc => {
      batch.delete(doc.ref)
    })

    // Commit the batch
    await batch.commit()

    console.log('Apartment and associated properties deleted successfully.')
    return true
  } catch (error) {
    console.log('Error deleting document: ', error)
    return false
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

// ===================Constructions Feedback===================
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

export const getConstructionFeedByStatus = async status => {
  try {
    const feedbackQuery = query(
      collection(db, 'constructions_feedback'),
      where('status', '==', status)
    )
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

export const addFeedback = async data => {
  try {
    const feedbackRef = collection(db, 'constructions_feedback')
    await setDoc(doc(feedbackRef, data.feedback_id), data)
    return true
  } catch (error) {
    console.log('Error adding document: ', error)
    return false
  }
}
// ===================Constructions Feedback===================

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

export const getAreaListForDivision = async divisionName => {
  try {
    const divisionDocRef = doc(db, 'division', divisionName)
    const areaListQuery = query(collection(divisionDocRef, 'area_list'))
    const areaListSnapshot = await getDocs(areaListQuery)
    const areaList = []
    areaListSnapshot.forEach(doc => {
      areaList.push(doc.data())
    })
    return areaList
  } catch (error) {
    console.log('Error getting area list: ', error)
  }
}
// ===================Division===================

// ===================Property List===================
export const createProperty = async data => {
  try {
    const propertyRef = collection(db, 'property_list')
    await setDoc(doc(propertyRef, data.id), data)
    return true
  } catch (error) {
    console.log('Error adding document: ', error)
    return false
  }
}

export const updateProperty = async data => {
  try {
    const propertyRef = doc(db, 'property_list', data.id)
    await updateDoc(propertyRef, data)
    return true
  } catch (error) {
    console.log('Error updating property', error)
  }
}

export const deleteProperty = async id => {
  try {
    await deleteDoc(doc(db, 'property_list', id))
    return true
  } catch (error) {
    console.log('Error deleting document: ', error)
    return false
  }
}

export const getAllProperties = async () => {
  try {
    const properties = []
    const querySnapshot = await getDocs(collection(db, 'property_list'))
    querySnapshot.forEach(doc => {
      properties.push(doc.data())
    })
    return properties
  } catch (err) {
    console.log(err)
    return []
  }
}

export const getNonAssignedProperties = async () => {
  try {
    const searchQuery = query(
      collection(db, 'property_list'),
      where('has_owner', '==', '0')
    )
    const querySnapshot = await getDocs(searchQuery)
    const properties = []
    querySnapshot.forEach(doc => {
      properties.push(doc.data())
    })
    return properties
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const asignPropertyToClient = async (propertyId, clientId) => {
  try {
    const propertyRef = doc(db, 'property_list', propertyId)
    await updateDoc(propertyRef, {
      has_owner: clientId,
    })
    return true
  } catch (error) {
    console.log('Error updating document: ', error)
    return false
  }
}

export const getPropertiesByOwnerId = async ownerId => {
  try {
    const propertyQuery = query(
      collection(db, 'property_list'),
      where('has_owner', '==', ownerId)
    )
    const propertySnapshot = await getDocs(propertyQuery)
    const propertyList = []
    propertySnapshot.forEach(doc => {
      propertyList.push(doc.data())
    })
    return propertyList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getPropertyById = async id => {
  try {
    const apartmentQuery = query(
      collection(db, 'property_list'),
      where('id', '==', id)
    )
    const propertySnapshot = await getDocs(apartmentQuery)
    let property = {}
    propertySnapshot.forEach(doc => {
      property = doc.data()
    })

    return property
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getPropertyByApartId = async id => {
  try {
    const propertyQuery = query(
      collection(db, 'property_list'),
      where('apartment_id', '==', id),
      where('has_owner', '==', '0')
    )
    const propertySnapshot = await getDocs(propertyQuery)
    const propertyList = []
    propertySnapshot.forEach(doc => {
      propertyList.push(doc.data())
    })
    return propertyList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getPropertyByApartIdAdmin = async id => {
  try {
    const propertyQuery = query(
      collection(db, 'property_list'),
      where('apartment_id', '==', id)
    )
    const propertySnapshot = await getDocs(propertyQuery)
    const propertyList = []
    propertySnapshot.forEach(doc => {
      propertyList.push(doc.data())
    })
    return propertyList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getPropertyByApartIdAdminWithOwner = async (id, available) => {
  try {
    // Create a reference to the 'property_list' collection
    const propertyRef = collection(db, 'property_list')

    // Create constraints for the query
    const constraints = [where('apartment_id', '==', id)]

    // If 'available' parameter is set to 'available', add another constraint
    if (available === 'available') {
      constraints.push(where('has_owner', '==', '0'))
    }

    // Construct the query with the constraints
    const propertyQuery = query(propertyRef, ...constraints)

    // Execute the query and get the documents
    const propertySnapshot = await getDocs(propertyQuery)
    const propertyList = []

    // Process the documents
    propertySnapshot.forEach(doc => {
      propertyList.push(doc.data())
    })

    // Return the list of properties
    return propertyList
  } catch (error) {
    console.error('Error getting documents: ', error)
  }
}
// ===================Property List===================

// ===================Notification===================
export const getAllNotifications = async () => {
  try {
    const notificationQuery = query(collection(db, 'notification_data'))
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

export const getNotificationById = async id => {
  try {
    const notificationQuery = query(
      collection(db, 'notification_data'),
      where('noti_id', '==', id)
    )
    const notificationSnapshot = await getDocs(notificationQuery)
    let notification = {}
    notificationSnapshot.forEach(doc => {
      notification = doc.data()
    })
    return notification
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Notification===================

// ===================Event===================
export const getAllEvents = async () => {
  try {
    const eventQuery = query(collection(db, 'event_data'))
    const eventSnapshot = await getDocs(eventQuery)
    const eventList = []
    eventSnapshot.forEach(doc => {
      eventList.push(doc.data())
    })
    return eventList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getEventById = async id => {
  try {
    const eventQuery = query(
      collection(db, 'event_data'),
      where('event_id', '==', id)
    )
    const eventSnapshot = await getDocs(eventQuery)
    let event = {}
    eventSnapshot.forEach(doc => {
      event = doc.data()
    })
    return event
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getFutureEvents = async () => {
  // Get the current timestamp
  const currentTimestamp = Date.now()

  try {
    // Create a query against the collection.
    const eventsQuery = query(
      collection(db, 'event_data'),
      where('event_date', '>', currentTimestamp.toString())
    )

    // Execute the query
    const querySnapshot = await getDocs(eventsQuery)
    const futureEvents = []
    querySnapshot.forEach(doc => {
      futureEvents.push(doc.data())
    })

    return futureEvents
  } catch (error) {
    console.error('Error fetching future events:', error)
    return []
  }
}

export const createEvent = async data => {
  try {
    const eventRef = collection(db, 'event_data')
    await setDoc(doc(eventRef, data.event_id), data)
    return true
  } catch (error) {
    console.log('Error adding document: ', error)
    return false
  }
}
// ===================Event===================

// ===================Property offer===================
export const createPropertyOffer = async data => {
  try {
    const offerRef = collection(db, 'property_offers')
    await setDoc(doc(offerRef, data.id), data)
    return true
  } catch (error) {
    console.log('Error adding document: ', error)
    return false
  }
}

export const getAllOffers = async () => {
  try {
    const offerQuery = query(collection(db, 'property_offers'))
    const offerSnapshot = await getDocs(offerQuery)
    const offerList = []
    offerSnapshot.forEach(doc => {
      offerList.push(doc.data())
    })
    return offerList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getOfferById = async id => {
  try {
    const offerQuery = query(
      collection(db, 'property_offers'),
      where('id', '==', id)
    )
    const offerSnapshot = await getDocs(offerQuery)
    let offer = {}
    offerSnapshot.forEach(doc => {
      offer = doc.data()
    })
    return offer
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Property offer===================

// ===================Types===================
export const propertyTypeFromDb = async () => {
  try {
    const typeQuery = query(collection(db, 'house_type'))
    const typeSnapshot = await getDocs(typeQuery)
    const typeList = []
    typeSnapshot.forEach(doc => {
      typeList.push(doc.data())
    })
    return typeList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const ownerTypeFromDb = async () => {
  try {
    const typeQuery = query(collection(db, 'owner_type'))
    const typeSnapshot = await getDocs(typeQuery)
    const typeList = []
    typeSnapshot.forEach(doc => {
      typeList.push(doc.data())
    })
    return typeList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Types===================

// ==================Feedbacks====================
export const createFeedbackNote = async data => {
  try {
    const feedbackRef = collection(db, 'feedback_notes')
    await setDoc(doc(feedbackRef, data.feedback_id), data)
    return true
  } catch (error) {
    console.log('Error adding document: ', error)
    return false
  }
}

export const getFeedbackNote = async id => {
  try {
    const feedbackQuery = query(
      collection(db, 'feedback_notes'),
      where('feedback_id', '==', id)
    )
    const feedbackSnapshot = await getDocs(feedbackQuery)
    let feedback = {}
    feedbackSnapshot.forEach(doc => {
      feedback = doc.data()
    })
    return feedback
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getFeed = async collectionName => {
  try {
    const feedbackQuery = query(collection(db, collectionName))
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

export const getFeedForSubAdmin = async (collectionName, adminId) => {
  // adminId is the user_id of the admin and its located into the admin_data collection's admin_ids array. so check if the adminId is into that array with in method
  try {
    const feedbackQuery = query(
      collection(db, collectionName),
      where('admin_ids', 'array-contains', adminId)
    )
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

export const getFeedById = async (collectionName, id) => {
  try {
    const feedbackQuery = query(
      collection(db, collectionName),
      where('feedback_id', '==', id)
    )
    const feedbackSnapshot = await getDocs(feedbackQuery)
    let feedback = {}
    feedbackSnapshot.forEach(doc => {
      feedback = doc.data()
    })
    return feedback
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const sendFeedbackReply = async (
  collectionName,
  adminId,
  reply,
  feedback_id
) => {
  // if the adminId is into the admin_ids array then just update the reply field with the reply data and if the adminId is not into the admin_ids array then just add the admin_id into the array and update the reply field with the reply data

  try {
    const feedbackQuery = query(
      collection(db, collectionName),
      where('admin_ids', 'array-contains', adminId)
    )
    const feedbackSnapshot = await getDocs(feedbackQuery)

    const feedbackRef = doc(db, collectionName, feedback_id)
    if (feedbackSnapshot.empty) {
      //  add the admin_id with the existing array into the array and update the reply field with the reply data
      await updateDoc(feedbackRef, {
        admin_ids: arrayUnion(adminId),
        reply,
        answerer_id: adminId,
      })
    }
    // just update the reply field with the reply data
    await updateDoc(feedbackRef, {
      reply,
      answerer_id: adminId,
    })

    return true
  } catch (error) {
    console.log('Error getting documents: ', error)
    return false
  }
}

// ==================Feedbacks====================

// ===================Interior===================
export const getInteriorOffers = async () => {
  try {
    const interiorQuery = query(collection(db, 'interior_offers'))
    const interiorSnapshot = await getDocs(interiorQuery)
    const interiorList = []
    interiorSnapshot.forEach(doc => {
      interiorList.push(doc.data())
    })
    return interiorList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getInteriorFeedbackByStatus = async status => {
  try {
    const feedbackQuery = query(
      collection(db, 'interior_feedback'),
      where('status', '==', status)
    )
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

export const getFeedbackByStatusPagination = async (
  type,
  // status,
  lastVisible = null,
  pageSize = 5
) => {
  try {
    let feedbackQuery = query(
      collection(db, 'feedback_list'),
      where('type', '==', type),
      // where('status', '==', status),
      orderBy('feedback_id', 'desc'),
      limit(pageSize)
    )

    if (lastVisible) {
      feedbackQuery = query(feedbackQuery, startAfter(lastVisible))
    }

    const feedbackSnapshot = await getDocs(feedbackQuery)
    const feedbackList = []

    feedbackSnapshot.forEach(doc => {
      feedbackList.push({ id: doc.id, ...doc.data() })
    })

    const lastVisibleDoc =
      feedbackSnapshot.docs[feedbackSnapshot.docs.length - 1]

    return { feedbackList, lastVisibleDoc }
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getInteriorOfferById = async id => {
  try {
    const interiorQuery = query(
      collection(db, 'interior_offers'),
      where('id', '==', id)
    )
    const interiorSnapshot = await getDocs(interiorQuery)
    let interior = {}
    interiorSnapshot.forEach(doc => {
      interior = doc.data()
    })
    return interior
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}
// ===================Interior===================

// ===================Previous project===================
export const getPreviousProjects = async () => {
  try {
    const projectQuery = query(collection(db, 'previous_project'))
    const projectSnapshot = await getDocs(projectQuery)
    const projectList = []
    projectSnapshot.forEach(doc => {
      projectList.push(doc.data())
    })
    return projectList
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const getPreviousProjectById = async id => {
  try {
    const projectQuery = query(
      collection(db, 'previous_project'),
      where('id', '==', id)
    )
    const projectSnapshot = await getDocs(projectQuery)
    let project = {}
    projectSnapshot.forEach(doc => {
      project = doc.data()
    })
    return project
  } catch (error) {
    console.log('Error getting documents: ', error)
  }
}

export const addPreviousProject = async data => {
  try {
    const projectRef = collection(db, 'previous_project')
    await setDoc(doc(projectRef, data.id), data)
    return true
  } catch (error) {
    console.log('Error adding document: ', error)
    return false
  }
}
// ===================Previous project===================

// ====================Hr Notification==================
export const getAllHrNotification = async () => {
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
// ====================Hr Notification==================
