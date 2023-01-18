import React from 'react'
import '../containers/mainContainer.jsx'


export default function Type({type, clicked, handleClick}) {
  const ClickedToggle = () => {
    handleClick(type);
  }

  return (
    <div >
            <button id='type-button' className={clicked ? "clicked" : ""} onClick={ClickedToggle}> {type} </button>
    </div>
  )
}