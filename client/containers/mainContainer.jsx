/**
 * @module mainContainer.jsx
 * @description Stateful container for functional compononents
 */

import React from 'react';
// import DatatypeSelector from '../components/dataSelector'

const MainContainer = () => {
  

  return (
    <div id="main_container">
      <div id="quantity_selector">
        <input type="number" />
      </div>
      <div id="datatype_selector">
        {/* <DatatypeSelector /> */}
      </div>
      <div id="submit_button">
        <button>Get Data</button>
      </div>
      <div id="text_output">
        <textarea></textarea>
      </div>
    </div>
  )
};

export default MainContainer;