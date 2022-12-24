import React from "react"
import { useNavigate } from "react-router-dom"

import './SkillItem.css'
const TopicItem = (props) => {

  const navigate = useNavigate()

  const routehandler = () => {
    navigate(`${props.id}`)
  }
  
  return ( 
          <div className="skill_card" onClick={() => routehandler(props.id)}>
            <div className="title">{props.category}</div>
          </div>
        )
  
}

export default TopicItem
