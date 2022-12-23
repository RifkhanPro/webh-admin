import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import TrendList from './TrendList'
import './ViewBlogs.css'

function ViewTrends() {
  const [trends, setTrends] = useState()
  const navigate  = useNavigate()
  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://localhost:8070/trend')

          const responseData = await response.json()
 
          setTrends(responseData)
             
          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }
     } 

     sendRequest()
  }, [])

  
  const routerHandler = () => {
    navigate('/addTrend')
  }

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {trends && <TrendList  data = {trends}/>}
              {!trends && <p>There is no Trends</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add Trend</Button>

    </div>
  )
}

export default ViewTrends
