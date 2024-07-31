import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './components/Auth/LandPageLogin';
import { AccessConrolSignIn } from './components/Auth/AccessControlLogin';
import { AccessControlPage } from './pages/AccessControlPage';
import "./styles/App.css"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path='/access-control-login' element={<AccessConrolSignIn />} />
        <Route path='/access-control-page' element={<AccessControlPage />} />
      </Routes>
    </Router>
  );
};

export default App;
