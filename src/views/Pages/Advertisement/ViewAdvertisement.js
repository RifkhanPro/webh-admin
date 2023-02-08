import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
import './ViewSkill.css'

const ViewAdvertisement = () => {
    const {id} = useParams()
    const [trend, setTrend] = useState()
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)
    
   
    const routeHandler = () => {
      navigate(`/advertisements/edit/${id}`)
    }

    const deleteHandler = async() => {
      setSpinner(true)
      try {
        const response = await fetch(`http://44.202.187.100:8070/advertisement/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

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
         const response = await fetch(`http://44.202.187.100:8070/advertisement/${id}`)

         const responseData = await response.json()
          console.log(responseData)
         setTrend(responseData)
            
         if (!response.ok()) {
           throw new Error(responseData.message)
       }

     } catch (err) {
     }
    } 

    sendRequest()
 }, [id])

  return <> {!trend &&    <RotatingLines className="text-center"
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="1"
  width="96"
  visible={true}
/>}
      <Card className="card">
     
          <div className="image">
              {trend && <img src={trend.image} />}
          </div>
        {trend && <div className="details">
              <h1>{trend.name}</h1>
              <h1>{trend.expiry}</h1>
              <CardText>{trend.desc}</CardText>
          </div>}

          {trend && trend.length === 0 && 
              <CardText className="no-respond">There is no Such advertisement</CardText>
          }
       

      </Card>
        {spinner &&    <RotatingLines className="text-center"
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="1"
        width="96"
        visible={true}
        ariaLabel="Deleting"
      />}
          <div className="btns">
            <Button onClick={routeHandler} className='btn'>Edit</Button>
            <Button onClick={deleteHandler} className='btn delete'>Delete</Button>
          </div>
  </>
}

export default ViewAdvertisement
