import React from 'react';

const signUpPage = (props) => {

  return (
    <div className="popup">
      <h1>Welcome New User!!</h1>
      <form className="loginForm" onSubmit={props.sendSignup}>
        <label className="loginLabel">Username:
          <input type="text" name="username" onChange={e => {props.username.current = e.target.value}} required />
        </label>
        <br/>
        <label className="loginLabel">Password:
          <input type="password" id="password" onChange={e => {props.password.current = e.target.value}} required />
        </label>
        <br/>
        <label className="loginLabel">Re-enter Password:
          <input type="password" id="passwordR" onChange={e => {props.passwordR.current = e.target.value}} required />
        </label>
        <div className="loginFormBtns">
          <button type="submit" className="loginBtn" >Signup</button>
          <button type="button" className="loginBtn" onClick={props.openLogin}>Back to Login</button>
        </div>
      </form>
      <p>{props.msg}</p>
    </div>
  )
}

export default signUpPage;