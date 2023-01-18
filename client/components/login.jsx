import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

const Login = (props) => {
  const [msg, setMessage] = useState('');
  const username = useRef() ;
  const password = useRef();
  const passwordR = useRef();
  
  const popUpPage = (
    <div className="popup">
      <h1>Login</h1>
      <form className="loginForm" onSubmit={sendLogin}>
        <label className="loginLabel">Username:
          <input type="text" name="username" onChange={e => {username.current = e.target.value}} required />
        </label>
        <br/>
        <label className="loginLabel">Password:
          <input type="password" id="password" onChange={e => {password.current = e.target.value}} required />
        </label>
        <br/>
        <div className="loginFormBtns">
          <button type="submit" className="loginBtn" >Login</button>
          <button type="button" className="loginBtn" onClick={closeLogin}>Play around</button>
          <button className="button" onClick={openSignUp}>New User</button>
        </div>
      </form>
      <p>{msg}</p>
    </div>
  )
  
  const signUpPage = (
    <div className="popup">
      <h1>Welcome New User!!</h1>
      <form className="loginForm" onSubmit={sendSignup}>
        <label className="loginLabel">Username:
          <input type="text" name="username" onChange={e => {username.current = e.target.value}} required />
        </label>
        <br/>
        <label className="loginLabel">Password:
          <input type="password" id="password" onChange={e => {password.current = e.target.value}} required />
        </label>
        <br/>
        <label className="loginLabel">Re-enter Password:
          <input type="password" id="passwordR" onChange={e => {passwordR.current = e.target.value}} required />
        </label>
        <div className="loginFormBtns">
          <button type="submit" className="loginBtn" >Signup</button>
          <button type="button" className="loginBtn" onClick={openPopUp}>Back to Login</button>
        </div>
      </form>
      <p>{msg}</p>
    </div>
  )

  const popUpBtn = (
    <div>
      <button className="popUpBtn" onClick={openPopUp}>Login</button>
    </div>
  )

  const [popUp, setPopUp] = useState(popUpPage);
  
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

  function openPopUp() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    })
    setPopUp(popUpPage);
  }
  
  function openSignUp() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    })
    setPopUp(signUpPage);
  }

  function sendLogin(e) {
    e.preventDefault();
    console.log('login clicked');
  }
  
  async function sendSignup(e) {
    e.preventDefault();
    if (password !== passwordR) {
      console.log('password doesn\'t match');
      setMessage('Passwords do not match!');
      setTimeout(() => {
        setMessage(''), 3000
      });
      return;
    }
    const signUp = async () => {
      const data = await axios.post('/user/signup', { username, password })
    }
    const data = await axios.get('/user/login')
      // if(Object.hasOwn(data, '[dataprop]')) {
      //   setSession(true);
      // }
    console.log(data);
  }

  return (
    <>
    {popUp}
    </>
  )
}

export default Login;