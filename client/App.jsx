/**
 * @module App.jsx
 * @description Top level of React App.
 */

import React from 'react';
import MainContainer from './containers/MainContainer.jsx'


const App = () => {
  return (
    <div>
      <HeaderContainer />
      <MainContainer />
      <FooterContainer />
    </div>
  );
};

export default App;