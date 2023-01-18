/**
 * @module App.jsx
 * @description Top level of React App.
 */
import {Route, Routes} from 'react-router-dom';
import React, { useState } from 'react';
import Login from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';


const App = () => {
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


export default App;