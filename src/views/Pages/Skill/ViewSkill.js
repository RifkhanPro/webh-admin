import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
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
         const response = await fetch(`http://68.178.164.166:8070/skill/${id}`)

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

   const deleteHandler = async() => {
        try {
          const response = await fetch(`http://68.178.164.166:8070/skill/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

          const responseData = await response.json()

          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }

      navigate('/skills')
    }

  return <>
      <Card className="card">
        {skill && <div className="details">
              <h1>{skill.title}</h1>
              <CardText>{skill.desc}</CardText>
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

export default ViewSkill
