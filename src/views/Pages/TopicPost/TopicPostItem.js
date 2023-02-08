import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import avatar from './../../../assets/images/pages/not_available.jpg'
import './TopicPostListItem.css'
const TopicPostItem = (props) => {

  const navigate = useNavigate()
  const routehandler = () => {
    navigate(`${props.id}`)
  }
  
  return ( 
          <div className="topicPost-list-item-container" onClick={() => routehandler(props.id)}>
         {props.category &&   <div className="topicPost-list-item-container-category">{props.category}</div>}
         {props.name && <div className="topicPost-list-item-container-name">{props.name}</div>}
            <div className="topicPost-list-item-container-image">
              {!props.image && <img src={avatar} alt="" />}
              {props.image && <img src={props.image} alt="" />}
            </div>
          </div>
        )
  
}

export default TopicPostItem
