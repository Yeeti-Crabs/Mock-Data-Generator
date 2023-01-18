import React, {useState} from 'react';


const HeaderContainer = () => { 
    return (
      <header id='header'>
        <h1>Mock Data Generator</h1>
        <div className="header-end">
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      </header>
    )
}

export default HeaderContainer;