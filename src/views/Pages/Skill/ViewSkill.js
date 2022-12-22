import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
import avatar from './../../../assets/images/users/avatar-1.jpg'
import './ViewSkill.css'

const ViewSkill = () => {
    const {id} = useParams()
    const [skill, setSkill] = useState()
    const navigate = useNavigate()
   
    const routeHandler = () => {
      navigate(`/skills/edit/${id}`)
    }
  useEffect(() => {
    const sendRequest = async () => {
     try {
         const response = await fetch(`http://localhost:8070/skill/${id}`)

         const responseData = await response.json()

         console.log(responseData)

         setSkill(responseData)
            
         if (!response.ok()) {
           throw new Error(responseData.message)
       }

     } catch (err) {
     }
    } 

    sendRequest()
 }, [id])

  return <>
      <Card className="card">
          <div className="image">
              <img src={avatar} />
          </div>
        {skill && <div className="details">
              <h1>{skill.title}</h1>
              <CardText>{skill.desc}</CardText>
          </div>}

          {!skill && 
              <CardText className="no-respond">There is no Such Skill</CardText>
          }

      </Card>

      <Card>
            <Button onClick={routeHandler}>Edit</Button>
      </Card>
  </>
}

export default ViewSkill
