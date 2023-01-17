import React from 'react'
import NewDataType from './NewDataType.jsx'

export default function DataSelector({ dataTypes, handleDelete }) {
  
  // map over all of the datatypes in state and render a new component for each one
  return (
    dataTypes.map(dataType => {
      return <NewDataType key={dataType.key} dataType={dataType} handleDelete={handleDelete} />
    })
  )
}