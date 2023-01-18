import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

const Login = (props) => {
  const [msg, setMessage] = useState('');
  const username = useRef() ;
  const password = useRef();
  const popUpPage = (
    <div className="popup">
      <h1>Login</h1>
      <form className="loginForm" >
        <label className="loginLabel">Username:
          <input type="text" name="username" onChange={e => {username.current = e.target.value}} required />
        </label>
        <br/>
        <label className="loginLabel">Password:
          <input type="password" id="password" onChange={e => {password.current = e.target.value}} required />
        </label>
        <br/>
        <button type="submit" className="loginBtn" onClick={sendLogin}>Login</button>
        <button type="submit" className="loginBtn" onClick={closeLogin}>Play around</button>
        <button type="submit" className="loginBtn" onClick={sendSignup}>Signup</button>
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
    axios
    .get('/api/login')
    .catch(data => {
      // if(Object.hasOwn(data, '[dataprop]')) {
      //   setSession(true);
      // }
      console.log(data)
    })
  },[])

  function closeLogin(e) {
    e.preventDefault();
    setPopUp(popUpBtn);
  }

  function openPopUp(e) {
    e.preventDefault;
    setPopUp(popUpPage);
  }
  
  const sendLogin = (e) => {e.preventdefault()}
  const sendSignup = (e) => {e.preventdefault()}

  return (
    <>
    {popUp}
    </>
  )
}

export default Login;