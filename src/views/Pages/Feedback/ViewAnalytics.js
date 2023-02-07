import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import AnalyticList from './AnalyticList'
import './ViewBlogs.css'

function ViewAnalytics() {
  const [trends, setTrends] = useState()
  const navigate  = useNavigate()
  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://68.178.164.166:8070/analytics')

          const responseData = await response.json()
 
          setTrends(responseData)
          console.log(responseData)
          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }
     } 

     sendRequest()
  }, [])

  
  const routerHandler = () => {
    navigate('/addAnalytic')
  }

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {trends && <AnalyticList  data = {trends}/>}
              {!trends && <p>There is no Analytics</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add Analytic</Button>

    </div>
  )
}

export default ViewAnalytics
