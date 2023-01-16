/**
 * @module mainContainer.jsx
 * @description Stateful container for functional compononents
 */

import React, { useEffect, useState, useRef } from 'react';
import DataSelector from '../components/DataSelector.jsx'

const MainContainer = () => {

  const [dataTypes, setDataTypes] = useState([])
  const dataInput = useRef([])

  const submitHandler = (event) => {
    const allDataTypes = [];
    dataTypeList.forEach((dataSelector) => {
    })  
  

  // made a hook for an array of DataType components 
  const [dataTypeList, setDataTypeList] = useState([<DataSelector dataTypes={dataTypes} 
                                                      key = {0} 
                                                      delete = {deleteDataHandler}
                                                      className = {'data-selector'}/>])
  const addDataHandler = (event) =>{
    if (dataTypeList.length < 6){
      setDataTypeList(dataTypeList.concat(<DataSelector dataTypes={dataTypes} key = {dataTypeList.length} onDelete = {deleteDataHandler} className = {'data-selector'}/>))
    } 
  }
  const deleteDataHandler = (event) => {
    // if (dataTypeList.length < 1){
    //   setDataTypeList(dataTypeList.filter((element) => {})
    // }
    console.log(event)
  }

 
  }

  return (
    <div id="main_container">
      <input id="quantity_selector" type="number" />
      <div id="datatype_selector">
        {dataTypeList}
      </div>
      {/* make a button to add new DataType */}
      <button onClick={addDataHandler}>Add Data Type</button>
        <button onClick = {submitHandler} id="submit_button">Generate Data</button>
        <textarea id="text_output"></textarea>
    </div>
  )
};

export default MainContainer;