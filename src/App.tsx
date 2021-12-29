import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import LikePage from './pages/LikePage';
import SettingPage from './pages/SettingPage';
import LoginPage from './pages/details/LoginPage';
import RegisterPage from './pages/details/RegisterPage';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore'

import { FirebaseProvider } from './context/FirebaseContext';

const App = (props: any) => {
  // const app = initializeApp({
  //   apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  //   authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
  //   projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
  //   storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIREBASE,
  //   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
  //   appId: process.env.REACT_APP_APP_ID_FIREBASE,
  //   measurementId: process.env.REACT_APP_MESUREMENT_ID_FIREBASE,
  // });
  // const [auth, setAuth] = useState(getAuth(app));
  // const [db, setDb] = useState(getFirestore(app));
  // const [user, setUser]: any = useState();

  // onAuthStateChanged(auth, (user => {
  //   if(user) setUser(user)
  // }))

  return (
    <Router>
      <div className='app'>
        <FirebaseProvider>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/search' element={<SearchPage {...props} />}/>
          {/* <Route path='/search/:categoryId' element={<SearchPage {...props} />}/> */}
          {/* <Route path='/search/:keyword' element={<SearchPage {...props} />}/> */}
          <Route path='/like' element={<LikePage {...props} />}/>
          <Route path='/profile' element={<ProfilePage {...props} />}/>
          <Route path='/login' element={<LoginPage {...props} />}/>
          <Route path='/register' element={<RegisterPage {...props} />}/>
          <Route path='/setting' element={<SettingPage {...props} />}/>
        </Routes>
        </FirebaseProvider>
      </div>
    </Router>
  );
}

export default App;
