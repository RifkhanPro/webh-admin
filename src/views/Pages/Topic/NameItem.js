// import React, { useState } from "react"
import React from 'react'
import './NameItem.css'
const NameItem = (props) => {
    // const [name, setName] = useState()

  const nameHandler = () => {
      
  }

  return ( 
          <div className="item" id={props.id} onClick={nameHandler}>
            <div className="title">{props.name}</div>
          </div>
        )
  
}

export default NameItem
