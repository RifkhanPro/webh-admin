import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
const PostItem = (props) => {

  const navigate = useNavigate()

  const routehandler = (props) => {
    navigate(`${props.id}`)
  }
  
  return ( 
          <div className="skill_card" onClick={() => routehandler(props.id)}>
            <div className="title">{props.name}</div>
            <div className="image">
            </div>
            <div className="desc">{props.description}</div>
          </div>
        )
  
}

export default PostItem
