import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

const Login = () => {
  const [session, setSession] = useState(false);
  const [msg, setMessage] = useState('');
  const username = useRef() ;
  const password = useRef();

  axios
  .get('/login')
  .then(data => {
    if(Object.hasOwn(data, '[dataprop]')) {
      setSession(true);
    }
  })

  const sendLogin = (e) => {e.preventdefault()}
  const closeLogin = (e) => {e.preventdefault()}
  const sendSignup = (e) => {e.preventdefault()}



  useEffect(() => {
    if (session) {
      // close the pop up
    }
  }, [])

  return (
    <div className="popup">
      <h1>Login</h1>
      <form className="loginForm" >
        <label className="loginLabel">Username:<input type="text" name="username" onChange={e => {username.current = e.target.value}} required /></label>
        <br/>
        <label className="loginLabel">Password:<input type="password" id="password" onChange={e => {password.current = e.target.value}} required /></label>
        <br/>
        <button className="loginBtn" onClick={sendLogin}>Login</button>
        <button className="loginBtn" onClick={closeLogin}>Guest</button>
        <button className="loginBtn" onClick={sendSignup}>Signup</button>
      </form>
      <p>{msg}</p>
    </div>
  )
}

export default Login;