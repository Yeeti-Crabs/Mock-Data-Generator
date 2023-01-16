import React from 'react'


const DataSelector = () => { 
  return (
    <div>
    <select>
       <option value="fullName">Full Name</option>
        <option value="email">Email</option>
        <option value="phone">Phone Number</option>
    </select>
    <button>X</button>
    </div>
  )
}

export default DataSelector;