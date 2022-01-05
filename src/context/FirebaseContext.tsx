import React, { useState, useEffect, useContext, createContext } from 'react'

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore'

type firebase = {
  auth: any
  currentUser: any
  db: any
}
const FirebaseContext = createContext<firebase>({ auth: null, currentUser: null, db: null })

export const useFirebase = () => {
  return useContext(FirebaseContext)
}

export const FirebaseProvider = ({ children }: any) => {
  const app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
    projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIREBASE,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
    appId: process.env.REACT_APP_APP_ID_FIREBASE,
    measurementId: process.env.REACT_APP_MESUREMENT_ID_FIREBASE,
  });
  
  const [auth, setAuth] = useState(getAuth(app));
  const [db, setDb] = useState(getFirestore(app))
  const [currentUser, setCurrentUser] = useState();
  const value = { auth, db, currentUser };
  
  useEffect(() => {
    const state = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user)
    })
    return () => { state() }
  }, [auth])
  
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  )
}


