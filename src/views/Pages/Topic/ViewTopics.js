import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import TopicList from './TopicList'
import './ViewBlogs.css'
import { RotatingLines } from  'react-loader-spinner'

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
          const response = await fetch('http://localhost:8070/topic/topics')

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
    {user ? <div className='topic-container'>
      <div className='topic-card'>
          <div className='topic-card-body'>
            <div>
              {topics && <TopicList  data = {topics}/>}
              {topics && topics.length === 0 && <p>There is no topics</p>}
              {!topics &&    <RotatingLines className="text-center"
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="1"
                  width="96"
                  visible={true}
                />}
            </div>
          </div>
      </div>


    </div> : <></> }
  </>
}

export default ViewTopics
