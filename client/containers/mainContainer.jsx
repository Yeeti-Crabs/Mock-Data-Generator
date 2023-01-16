/**
 * @module mainContainer.jsx
 * @description Stateful container for functional compononents
 */

import React, { useEffect, useState, useRef } from 'react';
import DataSelector from '../components/DataSelector.jsx'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const MainContainer = () => {

  const [dataTypes, setDataTypes] = useState([])
  const dataInput = useRef()
  const quantInput = useRef()
  const textAreaInput = useRef()

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

  function handleSubmit(event) {
    const stateData = dataTypes
    const quantity = quantInput.current.value
    let fetchString = `http://localhost:3000/api?quantity=${quantity}`

    stateData.forEach((element) => {
      fetchString += `&${element.type}=true`
    })

    console.log(fetchString)

    axios.get(fetchString)
    .then((response) => {
      console.log('data here: ', response)
      textAreaInput.current.value = JSON.stringify(response.data)
    })
    .catch((err) => console.log('something wrong with axios request', err))
  }

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
        <button id="submit_button" onClick={handleSubmit} >Generate Data</button>
        <textarea ref={textAreaInput} id="text_output"></textarea>
    </div>
  )
};

export default MainContainer;