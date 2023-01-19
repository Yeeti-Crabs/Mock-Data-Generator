/**
 * @module mainContainer.jsx
 * @description Stateful container for functional compononents
 */

import React, { useEffect, useState, useRef } from 'react';
import DataSelector from '../components/DataSelector.jsx'
import Type from '../components/type.jsx'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import copyIcon from '../copyIcon.svg'
import Login from '../components/login.jsx'

const MainContainer = () => {
  const types = ["First Name", "Last Name", "Full Name", "Email", "Phone Number", "Address", "Country", "Date", "Website", "Image"];
  const [dataTypes, setDataTypes] = useState(types.reduce((acc, cur) => {
    acc[cur] = false;
    return acc;
  }, {}))
  const [favorites, setFavorites] = useState([]);

  // const [dataTypes, setDataTypes] = useState(types.map(type => {
  //   const obj = {};
  //   obj[type] = false;
  //   return obj;
  // }))
  // console.log(dataTypes);
  const dataInput = useRef()
  const quantInput = useRef()
  const textAreaInput = useRef()
  const [clicked, setClicked] = useState(false)
  

  // function handleAdd(event) {
  //   const typeOfData = dataInput.current.value;
  //   // all of this insane logic inside of setDataTypes is just my way of preventing
  //   // the user from adding the same dataType twice
  //   setDataTypes(prevTypes => {
  //     let alreadyExists = false;

  //     [...prevTypes].forEach((element) => {
  //       if (element.type === typeOfData) {
  //         alreadyExists = true;
  //       }
  //     })
  //     if (alreadyExists === false) {
  //       return [...prevTypes, { key: uuidv4(), type: typeOfData }]
  //     } else {
  //       return [...prevTypes]
  //     }

  //   })
  // }


  function handleDelete(theKey) {
    setDataTypes(prevTypes => {
      return [...prevTypes].filter((element) => element.key !== theKey)
    })
  }

  function handleSubmit(event) {
    const stateData = dataTypes
    const quantity = quantInput.current.value
    let fetchString = `http://localhost:3000/api?quantity=${quantity}`

    // build our url with all of the datatypes in the query string
    stateData.forEach((element) => {
      fetchString += `&${element.type}=true`
    })

    axios.get(fetchString)
    .then((response) => {
      textAreaInput.current.value = JSON.stringify(response.data)
    })
    .catch((err) => console.log('something wrong with axios request', err))
  }

  function handleCopy(event) {
    navigator.clipboard.writeText(textAreaInput.current.value)
  }
 
  function handleSaveFavorites(){
    console.log(dataTypes)
    //console.log(favorites)
    const fav = [];
    for(let key in dataTypes){
        if(dataTypes[key]) fav.push(key)
      }
    setFavorites(fav);
  }
  
  function handleSelectFromFavorites(){
    const searchTypes = [];
    for(let key in dataTypes){
      if(dataTypes[key]) searchTypes.push(key)
    }
    // console.log(searchTypes)
    // console.log(favorites)

  }

  function handleClick(type) {

      if(dataTypes[type] === false){
        const obj = {};
        obj[type] = true;
        setDataTypes({
          ...dataTypes, // Copy the old fields
          ...obj // override value for key stored in "type"
        });
      }

      else{
        const obj = {};
        obj[type] = false;
        setDataTypes({
          ...dataTypes, // Copy the old fields
          ...obj // But override this one
        });
      }
  }



  return (
    <div id="main_container">
      
      <Login />
      {/* <div id='form'>
        <select ref={dataInput} name="dataSelect" id="dataSelect">
          <option value="firstName">First Name</option>
          <option value="fullName">Full Name</option>
          <option value="fullNameMiddle">First Middle Last Name</option>
          <option value="email">Email</option>
          <option value="phoneNumber">Phone Number</option>
          <option value="country">Country</option>
        </select>
        <button id='add_button' onClick={handleAdd} >Add Data Type</button>
      </div> */}
      
      {/* <div id="datatype_selector">
        <DataSelector dataTypes={dataTypes} handleDelete={handleDelete} />
      </div> */}

      <div className='type-grid'>
        {types.map(type => (
          <Type
            type={type} 
            clicked={dataTypes[type]}
            handleClick ={handleClick}
            setClicked = {setClicked}
          />
        ))}
      </div>

      

      {/* Div holds Button to submit request and Quantity input area */}
      <div id = 'add_and_submit'>
        <button id="submit_button" onClick={handleSubmit} >Generate Data</button>
        <label id='quantity_selector-label'> Quantity:
          <input ref={quantInput} id="quantity_selector" type="number" min='1' max = '100' defaultValue= '5'/>
        </label>
        <button id="add_to_favorites" onClick={handleSaveFavorites} >Mark current selection as favorites</button>
        <button id="submit_favorites" onClick={handleSelectFromFavorites} >Select from Favorites</button>

      </div>

      {/* Text area to display results */}
      <div id= 'text_box_and_copy'>
        <textarea ref={textAreaInput} id="text_output">
        </textarea>
        <button id='copy' onClick={handleCopy} ><img src='../copyIcon.svg' alt="copy to clipboard" /></button>
      </div>
    </div>
  )
};

export default MainContainer;

// address, age, DOB, 