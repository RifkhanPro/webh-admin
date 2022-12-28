import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import TopicList from './TopicList'
import './ViewBlogs.css'

function ViewTopics() {
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

  return <>
      <Button className='btn mb-2' onClick={routerHandler}>Add Topic</Button>
    {user ? <div>
      <Card>
          <CardBody>
            <Card>
              {topics && <TopicList  data = {topics}/>}
              {!topics && <p>There is no topics</p>}
            </Card>
          </CardBody>
      </Card>


    </div> : <></> }
  </>
}

export default ViewTopics
