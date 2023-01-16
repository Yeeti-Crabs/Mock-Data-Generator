/**
 * @module mainContainer.jsx
 * @description Stateful container for functional compononents
 */

import React, { useEffect, useState, useRef } from 'react';
import DataSelector from '../components/DataSelector.jsx'
import { v4 as uuidv4 } from 'uuid'

const MainContainer = () => {

  const [dataTypes, setDataTypes] = useState([])
  const dataInput = useRef()
  const quantInput = useRef()

  function handleAdd(event) {
    const typeOfData = dataInput.current.value;
    // all of this insane logic inside of setDataTypes is just my way of preventing
    // the user from adding the same dataType twice
    setDataTypes(prevTypes => {
      let alreadyExists = false;

      [...prevTypes].forEach((element) => {
        if (element.type === typeOfData) {
          alreadyExists = true;
        }
      })
      if (alreadyExists === false) {
        return [...prevTypes, { key: uuidv4(), type: typeOfData }]
      } else {
        return [...prevTypes]
      }

    })
    console.log(typeOfData);
  }

  function handleDelete(theKey) {
    setDataTypes(prevTypes => {
      return [...prevTypes].filter((element) => element.key !== theKey)
    })
  }

  // function handleSubmit(event) {

  // }

  // const sampleArr = [1,2,3,4,5,6,7,8]
  // const updatedArr = sampleArr.filter((element) => element !== 7)
  // updatedArr

  return (
    <div id="main_container">
      <label id='quantity_selector'>Quantity:</label>
      <input ref={quantInput} id="quantity_selector" type="number" />
      <select ref={dataInput} name="dataSelect" id="dataSelect">
        <option value="firstName">First Name</option>
        <option value="fullname">Full Name</option>
        <option value="fullNameMiddle">First Middle Last Name</option>
        <option value="email">Email</option>
        <option value="phoneNumber">Phone Number</option>
        <option value="country">Country</option>
      </select>
      <div id="datatype_selector">
        <DataSelector dataTypes={dataTypes} handleDelete={handleDelete} />
      </div>
      {/* make a button to add new DataType */}
      <button id='add_button' onClick={handleAdd} >Add Data Type</button>
        <button id="submit_button"  >Generate Data</button>
        <textarea id="text_output"></textarea>
    </div>
  )
};

export default MainContainer;