import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
import avatar from './../../../assets/images/users/avatar-1.jpg'
import './ViewSkill.css'

const ViewAdvertisement = () => {
    const {id} = useParams()
    const [trend, setTrend] = useState()
    const navigate = useNavigate()
   
    const routeHandler = () => {
      navigate(`/advertisements/edit/${id}`)
    }

    const deleteHandler = async() => {
      try {
        const response = await fetch(`http://localhost:8070/advertisement/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

        const responseData = await response.json()


        setTrend(responseData)
           
        if (!response.ok()) {
          throw new Error(responseData.message)
      }

    } catch (err) {
    }

      navigate('/advertisements')
    }
    
  useEffect(() => {
    const sendRequest = async () => {
     try {
         const response = await fetch(`http://localhost:8070/advertisement/${id}`)

         const responseData = await response.json()

         setTrend(responseData)
            
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
        {trend && <div className="details">
              <h1>{trend.name}</h1>
              <h1>{trend.expiry}</h1>
              <CardText>{trend.desc}</CardText>
          </div>}

          {!trend && 
              <CardText className="no-respond">There is no Such advertisement</CardText>
          }

      </Card>

          <div className="btns">
            <Button onClick={routeHandler} className='btn'>Edit</Button>
            <Button onClick={deleteHandler} className='btn delete'>Delete</Button>
          </div>
  </>
}

export default ViewAdvertisement
