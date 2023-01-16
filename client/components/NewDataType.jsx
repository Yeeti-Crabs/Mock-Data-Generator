import React from 'react'

export default function NewDataType({ dataType, handleDelete }) {

    function handlePressedDelete(event) {
        handleDelete(dataType.key)
    }

  return (
    <div>
        {dataType.type}
        <button onClick={handlePressedDelete}>X</button>
    </div>
  )
}
