import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import avatar from './../../../assets/images/users/avatar-1.jpg'
import './SkillItem.css'
const RecentSearchFeedItem = (props) => {

  const navigate = useNavigate()

  const routehandler = () => {
    navigate(`${props.id}`)
  }
  
  return ( 
          <div className="skill_card" onClick={() => routehandler(props.id)}>
            <div className="title">{props.title}</div>
            <div className="image">
              <img src={avatar} alt="" />
            </div>
            <div className="desc">{props.desc}</div>
          </div>
        )
  
}

export default RecentSearchFeedItem
