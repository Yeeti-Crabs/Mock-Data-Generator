import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

import SignUpPage from './signUpPage.jsx';
import LoginPage from './loginPage.jsx';

const Login = (props) => {
  
  /* ----------popup button ---------*/
  const popUpBtn = (
    <div>
      <button className="popUpBtn" onClick={openLogin}>Log in</button>
    </div>
  )
  
  const logOutBtn = (
    <div>
      <button className="logOutBtn" onClick={logOut}>Log out</button>
    </div>
  )
  
  const [popUp, setPopUp] = useState(popUpBtn);

  /* ----------click handlers ---------*/
  function closeLogin() {
    setPopUp(popUpBtn);
  }

  function loggedIn() {
    setPopUp(logOutBtn);
  }
  
  function openLogin() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    })
    setPopUp(<LoginPage {...{ closeLogin, openSignUp, loggedIn }} />);
  }
  
  function openSignUp() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    })
    setPopUp(<SignUpPage {...{ passwordR, openLogin, loggedIn }} />);
  }
  
  function logOut() {
    const fetchData = async () => {
      try{
        const data = await axios.get('/user/logout');
        setPopUp(<LoginPage {...{ closeLogin, openSignUp, loggedIn }} />);
      } catch (err) {
        console.log('logout error:', err);
      }
    }
  }
  
   /* ----------render update---------*/
  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await axios.get('/user');
        setPopUp(logOutBtn);
      } catch (err) {
        setPopUp(<LoginPage {...{ closeLogin, openSignUp, loggedIn }} />);
      }
    }
    fetchData();
  },[])

  return (
    <>
    {popUp}
    </>
  )
}

export default Login;