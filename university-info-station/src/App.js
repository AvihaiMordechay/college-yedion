import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './components/Auth/LandPageLogin';
import { AccessConrolSignIn } from './components/Auth/AccessControlLogin';
import { AccessControlPage } from './pages/AccessControlPage';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';


import "./styles/App.css"
const App = () => {
  const [newAdminCreated, setNewAdminCreated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path='/ac-login' element={<AccessConrolSignIn />} />
        <Route path='/'
          element={
            <ProtectedRoute
              allowedUid={process.env.REACT_APP_FIREABE_U1_ID}
              newAdminCreated={newAdminCreated}
              setNewAdminCreated={setNewAdminCreated}
            />}>
          <Route path='/ac-dashboard' element={<AccessControlPage setNewAdminCreated={setNewAdminCreated} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
