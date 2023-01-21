import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import avatar from './../../../assets/images/users/avatar-1.jpg'
import './TopicPostItem.css'
const TopicPostItem = (props) => {

  const navigate = useNavigate()

  const routehandler = () => {
    navigate(`${props.id}`)
  }
  
  return ( 
          <div className="topicpostitem-container" onClick={() => routehandler(props.id)}>
            <div className="topicpostitem-desc">{props.desc}</div>
            <div className="image">
              <img src={avatar} alt="" />
            </div>
          </div>
        )
  
}

export default TopicPostItem
