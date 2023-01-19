import React from 'react'
import '../containers/mainContainer.jsx'


export default function Type({type, clicked, handleClick, setClicked}) {
  const ClickedToggle = () => {
    //setClicked(!clicked);
    handleClick(type);
  }

  return (
    <div >
            {/* <button id='type-button' className={clicked ? "clicked" : ""} onClick={ClickedToggle}> {type} </button> */}
            <button id={clicked ? "clicked" : ""} className='type-button' onClick={ClickedToggle}> {type} </button>
    </div>
  )
}