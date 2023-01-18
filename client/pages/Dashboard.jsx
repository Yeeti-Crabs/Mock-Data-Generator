/**
 * @module App.jsx
 * @description Top level of React App.
 */

import React from 'react';
import MainContainer from '../containers/mainContainer.jsx'
import HeaderContainer from '../containers/headerContainer.jsx'
import FooterContainer from '../containers/footerContainer.jsx'


const Dashboard = () => {
  return (
    <div id = 'root-child'>

      <HeaderContainer />
      <MainContainer />
      <FooterContainer />
    </div>
  );
};

export default Dashboard;