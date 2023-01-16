/**
 * @module mainContainer.jsx
 * @description Stateful container for functional compononents
 */

import React, {useState, useEffect, } from 'react';
import DatatypeSelector from '../components/dataSelector.jsx'

const MainContainer = () => {
  
    const [dataTypeList, setDataTypeList] = useState([<DatatypeSelector key = {1}/>])

    const onAddBtnClick = event => {
      setDataTypeList(dataTypeList.concat(<DatatypeSelector key = {dataTypeList.length}/>));
    };

  return (
    <div id="main_container">
      <div id="quantity_selector">
        <input type="number" />
      </div>
      <div id="datatype_selector">
        {dataTypeList}
      </div>
      <div id="addData">
        <button onClick={onAddBtnClick}>Add Data Type</button>
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