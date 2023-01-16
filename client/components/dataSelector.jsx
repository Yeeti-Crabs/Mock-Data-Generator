import React from 'react'
import NewDataType from './NewDataType.jsx'

export default function DataSelector({ dataTypes, handleDelete }) {
  
  return (
    dataTypes.map(dataType => {
      return <NewDataType key={dataType.key} dataType={dataType} handleDelete={handleDelete} />
    })
  )
}