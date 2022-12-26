import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import TopicList from './TopicList'
import './ViewBlogs.css'

function ViewTopics() {
  const [topics, setTopics] = useState()
  const navigate  = useNavigate()
  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://68.178.164.166:8070/topic/topics')

          const responseData = await response.json()
 

          setTopics(responseData)
             
          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }
     } 

     sendRequest()
  }, [])

  
  const routerHandler = () => {
    navigate('/addTopic')
  }

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {topics && <TopicList  data = {topics}/>}
              {!topics && <p>There is no topics</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add Topic</Button>

    </div>
  )
}

export default ViewTopics
