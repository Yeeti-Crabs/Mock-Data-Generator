import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

import SignUpPage from './signUpPage.jsx';
import LoginPage from './loginPage.jsx';

const Login = (props) => {
  // const msg = useRef('test');
  const [msg, setMsg] = useState();
  const username = useRef() ;
  const password = useRef();
  const passwordR = useRef();
  const [popUp, setPopUp] = useState(<LoginPage {...{username, password, msg, sendLogin, closeLogin, openSignUp}} />);
  

  const popUpBtn = (
    <div>
      <button className="popUpBtn" onClick={openLogin}>Login</button>
    </div>
  )

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await axios.get('/user');
        console.log(data);
      } catch (err) {
        console.log('ERROR:', err);
      }
    }
    fetchData();
  },[])

  function closeLogin() {
    setPopUp(popUpBtn);
  }

  function openLogin() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    })
    setPopUp(<LoginPage {...{username, password, msg, sendLogin, closeLogin, openSignUp}} />);
  }
  
  function openSignUp() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    })
    setPopUp(<SignUpPage {...{username, password, passwordR, msg, sendSignup, openLogin}} />);
  }

  function sendLogin(e) {
    e.preventDefault();
    const login = async () => {
      const response = await axios.post('/user/login', { username: username.current, password:password.current })
      console.log(response);
    }
    login();
  }
  
  function sendSignup(e) {
    e.preventDefault();
    console.log('testdone');
    if (password.current !== passwordR.current) {
      console.log('password doesn\'t match');
      setMsg('Passwords do not match!');
      console.log('after click', msg);
      // setTimeout(() => {
      //   setMessage('')
      // },3000);
      return;
    }
    // const signUp = async () => {
    //   const response = await axios.post('/user/signup', { username: username.current, password:password.current })
    //   console.log(response);
    // }
    
    //   // if(Object.hasOwn(data, '[dataprop]')) {
    //   //   setSession(true);
    //   // }
    // signUp();
  }
  useEffect(() => {
    console.log('updated')
  })
  console.log(msg);
  // const fetchUrls = async () => {
  //   const response = await axios.get("http://localhost:3000/api/sprites");
  //   // console.log('console.log inside fetchUrls()')
  //   console.log(response.data)
  //   for(let i = 0; i < cardImages.length; i++){
  //       cardImages[i].src = response.data[i].src;
  //   }
  //   console.log(cardImages)
  // }


  return (
    <>
    {popUp}
    </>
  )
}

export default Login;