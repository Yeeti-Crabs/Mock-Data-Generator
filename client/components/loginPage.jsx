import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'

const loginPage = (props) => {
  const [message, setNewMessage] = useState('');
  const [messageChanged, setMessageStatus] = useState(false);
  const username = useRef();
  const password = useRef();


  function sendLogin(e) {
    e.preventDefault();
    const login = async () => {
      try {
        const response = await axios.post('/user/login', { username: username.current, password: password.current })
        props.loggedIn();
      } catch (err) {
        console.log('login err:', err);
      }
    }
    login();
  }
  
  return (
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
          <button type="button" className="loginBtn" onClick={props.closeLogin}>Play around</button>
          <button className="button" onClick={props.openSignUp}>New User</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default loginPage;