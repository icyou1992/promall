import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import LikePage from './pages/LikePage';
import SettingPage from './pages/SettingPage';
import LoginPage from './pages/details/LoginPage';
import RegisterPage from './pages/details/RegisterPage';

import { FirebaseProvider } from './context/FirebaseContext';

const App = (props: any) => {

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // register the service worker
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('../src/service-worker.ts').then(function(registration) {
          console.log('ServiceWorker registration successful', registration.scope);
        }, function(err) {
          console.log('ServiceWorker registration failed', err);
        }).catch(function(err) {
          console.log(err);
        });
      });
    } else {
      console.log('Service Worker is not supported by browser or Current Environment is development.');
    }  
  }, [])

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
