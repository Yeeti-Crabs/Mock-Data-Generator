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
  const displayType = useRef()
  const quantInput = useRef()
  const textAreaInput = useRef()
  const [clicked, setClicked] = useState(false)
  const [displayedDate, setDisplay] = useState();
  

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


  // function handleDelete(theKey) {
  //   setDataTypes(prevTypes => {
  //     return [...prevTypes].filter((element) => element.key !== theKey)
  //   })
  // }

  // function handleSubmit(event) {
  //   const stateData = dataTypes
  //   const quantity = quantInput.current.value
  //   let fetchString = `http://localhost:3000/api?quantity=${quantity}`

  //   // build our url with all of the datatypes in the query string
  //   stateData.forEach((element) => {
  //     fetchString += `&${element.type}=true`
  //   })

  //   axios.get(fetchString)
  //   .then((response) => {
  //     textAreaInput.current.value = JSON.stringify(response.data)
  //   })
  //   .catch((err) => console.log('something wrong with axios request', err))
  // }

  function handleCopy(event) {
    navigator.clipboard.writeText(textAreaInput.current.value)
  }
 
  function handleSaveFavorites(){
    const fav = [];
    for(let key in dataTypes){
        if(dataTypes[key]) fav.push(key)
      }

    setFavorites(fav);
    const favsForBody = convertStrings(fav);

    const sendFavs = async () => {
      try {
        const response = await axios.patch('/updateTypes', {dataTypes: favsForBody});
        console.log('inside sendFavs()');
        console.log(response.data);
      } catch (err) {
        console.log('Error when sending favorites to DB:', err);
      }
    }
    sendFavs();
  }

  // useEffect(() => {

  // }, [])

  function convertStrings (array) {
    
    for(let i = 0; i < array.length; i++){
      switch(array[i]) {
        case 'First Name':
          array[i] = 'firstname';
          break;
        case 'Last Name':
          array[i] = 'lastname';
          break;
        case 'Full Name':
          array[i] = 'fullname';
          break;
        case 'Email':
          array[i] = 'email';
          break;
        case 'Phone Number':
          array[i] = 'phone';
          break;
        case 'Address':
          array[i] = 'address';
          break;
        case 'Country':
          array[i] = 'country';
          break;
        case 'Date':
          array[i] = 'date';
          break;
        case 'Website':
          array[i] = 'website';
          break;
        case 'Image':
          array[i] = 'image';
          break;
        default:
          break;
      }
    }
    return array;
  }

  function convertStringsForFE (array) {
    
    for(let i = 0; i < array.length; i++){
      switch(array[i]) {
        case 'firstname':
          array[i] = 'First Name';
          break;
        case 'lastname':
          array[i] = 'Last Name';
          break;
        case 'fullname':
          array[i] = 'Full Name';
          break;
        case 'email':
          array[i] = 'Email';
          break;
        case 'phone':
          array[i] = 'Phone Number';
          break;
        case 'address':
          array[i] = 'Address';
          break;
        case 'country':
          array[i] = 'Country';
          break;
        case 'date':
          array[i] = 'Date';
          break;
        case 'website':
          array[i] = 'Website';
          break;
        case 'image':
          array[i] = 'Image';
          break;
        default:
          break;
      }
    }
    return array;
  }
  
  function clearSelection() {
    
    const obj = {}
    //clear current selection
    for(let key in dataTypes){
      if(dataTypes[key] === true){
        obj[key] = false;
      }
    }
    setDataTypes({
      ...dataTypes, 
      ...obj 
    });
    return;
  }

  function handleSelectFromFavorites(){
    convertStringsForFE(favorites)
    console.log(favorites)

    // const favsForFE = convertStringsForFE(array);
    // setFavorites(favsForFE);

    //assume favorites prop already has strings of favorites ready for the front-end
    clearSelection();
    console.log("dataTypes after attempting to clear:")
    console.log(dataTypes)

    // iterate through favorites array, changing the matching dataTypes values to true
    const obj = {};
    for(let i = 0; i < favorites.length; i++){
      obj[favorites[i]] = true;
    }
    setDataTypes({
      ...dataTypes, 
      ...obj // 
    });

    return;
  }

  function handleSubmit () {
    const searchTypes = [];
    for(let key in dataTypes){
      if(dataTypes[key]) searchTypes.push(key)
    }
    const TypesForBody = convertStrings(searchTypes);

    const quantity = quantInput.current.value;

    const sendTypes = async () => {
      try {
        const response = await axios.post('/api', {dataTypes: TypesForBody, quantity: quantity});
        console.log('inside sendTypes()');

        switch (displayType.current.value) {
          case 'Javascript':
            setDisplay(JSON.stringify(response.data))
            break;
          case 'JSON':
            setDisplay(JSON.stringify(response.data))
            break;
          case 'CSV':
            setDisplay("doesn't work yet")
            break;
        }
        // textAreaInput.current.value = response.data;
      } catch (err) {
        console.log('Error when sending data types to back-end:', err);
      }
    }
    sendTypes();
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

  function selectDisplayType() {
    console.log(textAreaInput.current.value);
    switch (displayType.current.value) {
      case 'Javascript':
        setDisplay(JSON.stringify(displayedDate))
        break;
      case 'JSON':
        setDisplay(JSON.stringify(JSON.parse(displayedDate)))
        break;
      case 'CSV':
        setDisplay("doesn't work yet")
        break;
    }
  }


  return (
    <div id="main_container">
      
      <Login />
      
      
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
        <button id="clear_selection" onClick={clearSelection} >Clear Selection</button>
        <button id="add_to_favorites" onClick={handleSaveFavorites} >Mark current selection as favorites</button>
        <button id="submit_favorites" onClick={handleSelectFromFavorites} >Select from Favorites</button>

      </div>

      {/* Text area to display results */}
      <div id= 'text_box_and_copy'>
        <div id='form'>
          <select ref={displayType} name="displayType" id="displayType" onChange={selectDisplayType}>
            <option value="JSON">JSON</option>
            <option value="Javascript">Javascript</option>
            <option value="CSV">CSV</option>
          </select>
        </div>
        <textarea ref={textAreaInput} id="text_output" value={displayedDate}>
        </textarea>
        <button id='copy' onClick={handleCopy} ><img src='../copyIcon.svg' alt="copy to clipboard" /></button>
      </div>
    </div>
  )
};

export default MainContainer;

// address, age, DOB, 