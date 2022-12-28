import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import TopicPostList from './TopicPostList'
import './ViewBlogs.css'

function ViewTopicPosts() {
  const [topics, setTopics] = useState()
  const navigate  = useNavigate()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState("")

  useEffect(() => {
    //check whether user has signed in
    if (localStorage.getItem("userAuthToken")) {
        setIsSignedIn(true)
        console.log(isSignedIn)

        //get user data
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
            console.log(user)
        }

    } else {
      setIsSignedIn(false)
    }
  }, [])

  console.log(user, isSignedIn)

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

  return <>
      <Button className='btn mb-2' onClick={routerHandler}>Add Topic</Button>
    {user ? <div>
      <Card>
          <CardBody>
            <Card>
              {topics && <TopicPostList  data = {topics}/>}
              {!topics && <p>There is no TopicPosts</p>}
            </Card>
          </CardBody>
      </Card>


    </div> : <></> }
  </>
}

export default ViewTopicPosts
