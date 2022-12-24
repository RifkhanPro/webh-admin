import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
import avatar from './../../../assets/images/users/avatar-1.jpg'
import './ViewSkill.css'

const ViewPostManagement = () => {
    const {id} = useParams()
    const [skill, setSkill] = useState()
    const navigate = useNavigate()
   
    const routeHandler = () => {
      navigate(`/postManagements/edit/${id}`)
    }
  useEffect(() => {
    const sendRequest = async () => {
     try {
         const response = await fetch(`http://localhost:8070/postManagement/posts/${id}`)

         const responseData = await response.json()

         console.log(responseData.post)

         setSkill(responseData.post)
            
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
          const response = await fetch(`http://localhost:8070/postManagement/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

          const responseData = await response.json()

          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }

      navigate('/postManagements')
    }

  return <>
      <Card className="card">
          <div className="image">
              <img src={avatar} />
          </div>
        {skill && <div className="details">
              <h1>{skill.name}</h1>
              <CardText>{skill.desc}</CardText>
          </div>}

          {!skill && 
              <CardText className="no-respond">There is no Such postManagement</CardText>
          }

      </Card>

      <div className="btns">
            <Button onClick={routeHandler} className='btn'>Edit</Button>
            <Button onClick={deleteHandler} className='btn delete'>Delete</Button>
          </div>
  </>
}

export default ViewPostManagement
