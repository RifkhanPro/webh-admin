import React from "react"
import { useNavigate } from "react-router-dom"

import './TopicListItem.css'
const TopicItem = (props) => {

  const navigate = useNavigate()

  const routehandler = () => {
    navigate(`${props.id}`)
  }
  
  return ( 
          <div className="topic-list-item-container" onClick={() => routehandler(props.id)}>
            <div className="title">{props.category}</div>
          </div>
        )
  
}

export default TopicItem
