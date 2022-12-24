import React from "react"
import './NameItem.css'
const NameItem = (props) => {

  return ( 
          <div className="item">
            <div className="title">{props.name}</div>
          </div>
        )
  
}

export default NameItem
