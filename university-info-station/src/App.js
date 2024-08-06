import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SignIn } from './components/Auth/LandPageLogin';
import { AccessControlSignIn } from './components/Auth/AccessControlLogin';
import { AccessControlPage } from './pages/AccessControlPage';
// import { StudentPage } from './pages/StudentPage';
import { AdminPage } from './pages/AdminPage';
// import { StaffPage } from './pages/StaffPage';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path='/ac-login' element={<AccessControlSignIn />} />

        <Route path='/'
          element={
            <ProtectedRoute
              allowedRoles={['ac-admin']}
            />}>
          <Route path='/ac-dashboard' element={<AccessControlPage />} />
        </Route>

        <Route path='/'
          element={
            <ProtectedRoute
              allowedRoles={['admin']}
            />}>
          <Route path='/admins/:personalId' element={<AdminPage />} />
        </Route>


        {/* <Route path='/students'
          element={
            <ProtectedRoute allowedRoles={['student']} userSpecificPage>
              <StudentPage />
            </ProtectedRoute>
          }
        /> */}


        {/* 
        <Route path='/staff'
          element={
            <ProtectedRoute allowedRoles={['staff']} userSpecificPage>
              <StaffPage />
            </ProtectedRoute>
          }
        /> */}

        <Route path='*' element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
};

export default App;
