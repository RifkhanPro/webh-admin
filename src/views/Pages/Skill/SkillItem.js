import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import './SkillItem.css'
const SkillItem = (props) => {

  const navigate = useNavigate()

  const routehandler = () => {
    navigate(`${props.id}`)
  }
  
  return (
          <div className="skill_card" onClick={() => routehandler(props.id)}>
            <div className="title">{props.title}</div>
            <div className="image">
            </div>
            <div className="desc">{props.desc}</div>
          </div>
        )
  
}

export default SkillItem
