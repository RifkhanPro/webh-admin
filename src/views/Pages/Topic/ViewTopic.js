import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
import avatar from './../../../assets/images/users/avatar-1.jpg'
import NameList from "./NameList"
import { RotatingLines } from "react-loader-spinner"

import './ViewSkill.css'

const ViewTopic = () => {
    const {id} = useParams()
    const [skill, setSkill] = useState()
    const navigate = useNavigate()
   
    const routeHandler = () => {
      navigate(`/topics/edit/${id}`)
    }

    const addNameHandler = () => {
      navigate(`/topics/${id}/AddName`)
    }

  useEffect(() => {
    const sendRequest = async () => {
     try {
         const response = await fetch(`http://localhost:8070/topic/${id}`)

         const responseData = await response.json()

         setSkill(responseData)
         if (!response.ok()) {
           throw new Error(responseData.message)
       }

     } catch (err) {
     }
    } 

    sendRequest()
 }, [id])

   const deleteHandler = async() => {
        try {
          const response = await fetch(`http://localhost:8070/topic/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

          const responseData = await response.json()

          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }

      navigate('/topics')
    }

  return <>
      {!skill &&    <RotatingLines className="text-center"
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="1"
      width="96"
      visible={true}
    />}
      <Card className="card">
          <div className="image">
              <img src={avatar} />
          </div>
        {skill && <div className="details">
              <h1>{skill.category}</h1>
              <NameList category={skill.category} data = {skill.names} />
          </div>}

          {!skill && 
              <CardText className="no-respond">There is no Such Skill</CardText>
          }

      </Card>

      <div className="btns">
            <Button onClick={routeHandler} className='btn'>Edit Topic</Button>
            <Button onClick={addNameHandler} className='btn'>Add Name</Button>
            <Button onClick={deleteHandler} className='btn delete'>Delete Topic</Button>
      </div>
  </>
}

export default ViewTopic
