import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import avatar from './../../../assets/images/pages/not_available.jpg'
import './PostManagementItem.css'

const PostManagementItem = (props) => {
  const navigate = useNavigate()

  const routehandler = () => {
    navigate(`${props.id}`)
  }
  
  return ( 
          <div className="postManagementItem" onClick={() => routehandler(props.id)}>
            <div className="title">{props.name}</div>
            <div className="image">
            {!props.image && <img src={avatar} alt="" />}
              {props.image && <img src={props.image} alt="" />}
            </div>
          </div>
        )
  
}

export default PostManagementItem
