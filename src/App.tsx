import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import LikePage from './pages/LikePage';
import SettingPage from './pages/SettingPage';
import LoginPage from './pages/details/LoginPage';
import RegisterPage from './pages/details/RegisterPage';

const App = (props: any) => {
  
  return (
    <Router>
      <div className='app'>
      <Routes>
        <Route path='/' element={<HomePage {...props} />}/>
        <Route path='/search' element={<SearchPage {...props} />}/>
        {/* <Route path='/search/:categoryId' element={<SearchPage {...props} />}/> */}
        {/* <Route path='/search/:keyword' element={<SearchPage {...props} />}/> */}
        <Route path='/like' element={<LikePage {...props} />}/>
        <Route path='/profile' element={<ProfilePage {...props} />}/>
        <Route path='/login' element={<LoginPage {...props} />}/>
        <Route path='/register' element={<RegisterPage {...props} />}/>
        <Route path='/setting' element={<SettingPage {...props} />}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
