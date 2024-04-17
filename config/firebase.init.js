import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC6NQVFow5ti9AAXy_yC7kbvkUc80U3_rs',
  authDomain: 'property-managment-4db39.firebaseapp.com',
  projectId: 'property-managment-4db39',
  storageBucket: 'property-managment-4db39.appspot.com',
  messagingSenderId: '859715024738',
  appId: '1:859715024738:web:29fe4106b894e05e381e3b',
  measurementId: 'G-37LN6HNH2F',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const db = getFirestore(app)

export { auth, db, storage }
