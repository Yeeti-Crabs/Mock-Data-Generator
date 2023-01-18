/**
 * @module App.jsx
 * @description Top level of React App.
 */

import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';
import {Route, Routes} from 'react-router-dom';

export default App = () => {
  return (
    <div id = 'root-child'>   
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};
