import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import TopicPostList from './TopicPostList'
import './ViewBlogs.css'

function ViewTopicPosts() {
  const [topics, setTopics] = useState()
  const navigate  = useNavigate()
  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://localhost:8070/topicPost/topicPosts')

          const responseData = await response.json()
 
          console.log(responseData)

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
    navigate('/addTopicPost')
  }

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {topics && <TopicPostList  data = {topics}/>}
              {!topics && <p>There is no TopicPosts</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add Topic</Button>

    </div>
  )
}

export default ViewTopicPosts
