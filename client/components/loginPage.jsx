import React from 'react';

const loginPage = (props) => {
  return (
    <div className="popup">
    <h1>Login</h1>
    <form className="loginForm" onSubmit={props.sendLogin}>
      <label className="loginLabel">Username:
        <input type="text" name="username" onChange={e => {props.username.current = e.target.value}} required />
      </label>
      <br/>
      <label className="loginLabel">Password:
        <input type="password" id="password" onChange={e => {props.password.current = e.target.value}} required />
      </label>
      <br/>
      <div className="loginFormBtns">
        <button type="submit" className="loginBtn" >Login</button>
        <button type="button" className="loginBtn" onClick={props.closeLogin}>Play around</button>
        <button className="button" onClick={props.openSignUp}>New User</button>
      </div>
    </form>
    <p>{props.msg}</p>
    </div>
  )
}

export default loginPage;