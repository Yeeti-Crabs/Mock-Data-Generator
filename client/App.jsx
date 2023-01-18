/**
 * @module App.jsx
 * @description Top level of React App.
 */

import React, { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';
import {Route, Routes} from 'react-router-dom';

export default App = () => {
  const [user, setUser] = useState({});

  return (
    <div id = 'root-child'>   
      <Routes>
        <Route path="/" element={<Dashboard user = {user} />} />
        <Route path="/login" element={<Login setUser = {(user) => setUser(user)} />} />
        <Route path="/signup" element={<SignUp setUser = {(user) => setUser(user)} />} />
      </Routes>
    </div>
  );
};
