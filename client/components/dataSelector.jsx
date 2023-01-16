import React from 'react'

export default function DataSelector({ dataTypes, onDelete, key, id}) {
  
  return (
    <div className='data-type'>
        <select>
          <option id='full-name'>Full Name</option>
          <option id='email'>Email</option>
        </select>
        <button onClick = {onDelete}>X</button>
    </div>
  )
}