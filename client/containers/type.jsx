import React from 'react'
import NewDataType from './NewDataType.jsx'

export default function Type({type}) {
  
  // map over all of the datatypes in state and render a new component for each one
  return (
    <div className='type'>
            <button onClick ={handleClick}> {type} </button>
    </div>
  )
}