// import React, { useState } from "react"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NameItem.css'
const NameItem = (props) => {
    const navigate = useNavigate()


  const nameHandler = () => {
    navigate(`/topics/${props.category}/${props.id}`)
  }

  return ( 
          <div className="name-item" id={props.id} onClick={nameHandler}>
            <div className="name-item-title">{props.name}</div>
          </div>
        )
  
}

export default NameItem
