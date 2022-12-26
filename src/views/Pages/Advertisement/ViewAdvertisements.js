import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import AdvertisementList from './AdvertisementList'
import './ViewBlogs.css'

function ViewAnalytics() {
  const [trends, setTrends] = useState()
  const navigate  = useNavigate()
  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://68.178.164.166:8070/advertisement')

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
    navigate('/addAdvertisement')
  }

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {trends && <AdvertisementList  data = {trends}/>}
              {!trends && <p>There is no Advertisement</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add Advertisement</Button>

    </div>
  )
}

export default ViewAnalytics
