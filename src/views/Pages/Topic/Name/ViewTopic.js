import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
import avatar from './../../../assets/images/users/avatar-1.jpg'
import './ViewSkill.css'

const ViewTopic = () => {
    const {id} = useParams()
    const [skill, setSkill] = useState()
    const navigate = useNavigate()
   
    const routeHandler = () => {
      navigate(`/topics/edit/${id}`)
    }
  useEffect(() => {
    const sendRequest = async () => {
     try {
         const response = await fetch(`http://68.178.164.166:8070/topic/${id}`)

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
          const response = await fetch(`http://68.178.164.166:8070/topic/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

          const responseData = await response.json()

          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }

      navigate('/topics')
    }

  return <>
      <Card className="card">
          <div className="image">
              <img src={avatar} />
          </div>
        {skill && <div className="details">
              <h1>{skill.category}</h1>
          </div>}

          {!skill && 
              <CardText className="no-respond">There is no Such Skill</CardText>
          }

      </Card>

      <div className="btns">
            <Button onClick={routeHandler} className='btn'>Edit</Button>
            <Button onClick={deleteHandler} className='btn delete'>Delete</Button>
          </div>
  </>
}

export default ViewTopic
