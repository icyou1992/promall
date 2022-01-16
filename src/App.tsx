import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import { SettingPage, LoginPage, RegisterPage, LikePage, DetailPage } from './pages/details';

import { FirebaseProvider } from './context/FirebaseContext';
import { AlarmPage } from './pages/details';
import { EnvProvider } from './context/EnvContext';

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
        <EnvProvider>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/search' element={<SearchPage {...props} />}/>
          {/* <Route path='/search/:categoryId' element={<SearchPage {...props} />}/> */}
          {/* <Route path='/search/:keyword' element={<SearchPage {...props} />}/> */}
          <Route path='/detail' element={<DetailPage {...props} />}/>
          <Route path='/profile' element={<ProfilePage {...props} />}/>
          <Route path='/login' element={<LoginPage {...props} />}/>
          <Route path='/register' element={<RegisterPage {...props} />}/>
          <Route path='/setting' element={<SettingPage {...props} />}/>
          <Route path='/alarm' element={<AlarmPage {...props} />}/>
          <Route path='/like' element={<LikePage {...props} />}/>
        </Routes>
        </EnvProvider>
        </FirebaseProvider>
      </div>
    </Router>
  );
}

export default App;
