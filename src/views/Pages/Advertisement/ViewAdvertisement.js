import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { RotatingLines } from "react-loader-spinner"
import { useNavigate, useParams } from "react-router-dom"
import './ViewPostManagement.css'

const ViewAdvertisement = () => {
    const {id} = useParams()
    const [trend, setTrend] = useState()
    const navigate = useNavigate()
    
   
    const routeHandler = () => {
      navigate(`/advertisements/edit/${id}`)
    }
 
    const deleteHandler = async() => {
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

      
    return <div className="view-postManagement-container">
        {!trend &&    <RotatingLines className="text-center"
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="1"
          width="96"
          visible={true}
        />}
    <div className="view-postManagement-card">
      {trend && <div className="image">
              <img src={trend.image} />
          </div>}
      {trend && <div className="details">
            <h1>{trend.name}</h1>
            <h4>{trend.desc}</h4>
            <h4>{trend.expiry}</h4>
        </div>}

        {!trend && 
            <p className="no-respond">There is no postManagement</p>
        }

      <div className="btns">
            <button onClick={routeHandler} className='btn'>Edit</button>
            <button onClick={deleteHandler} className='btn delete'>Delete</button>
      </div>
    </div>

    </div>
}

export default ViewAdvertisement
