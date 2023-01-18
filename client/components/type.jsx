import React from 'react'
import NewDataType from './NewDataType.jsx'

export default function Type({type, clicked, handleClick}) {


  return (
    <div >
            <button id='type-button' onClick={(type) => handleClick(type)}> {type} </button>
    </div>
  )
}