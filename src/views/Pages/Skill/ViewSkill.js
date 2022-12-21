import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card, CardText } from "reactstrap"
import avatar from './../../../assets/images/users/avatar-1.jpg'

const ViewSkill = () => {
    const {id} = useParams()
    const [skill, setSkill] = useState()

   
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
  return <Card className="card">
        <div className="image">
            <img src={avatar} />
        </div>
       {skill && <div className="details">
            <CardText>{skill.title}</CardText>
            <CardText>{skill.desc}</CardText>
        </div>}

        {!skill && 
            <CardText className="no-respond">There is no Such Skill</CardText>
        }
  </Card>
}

export default ViewSkill
