import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import RecentSearchFeedList from './RecentSearchFeedList'
import './ViewBlogs.css'

function ViewRecentSearchFeeds() {
  const [skills, setSkills] = useState()
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
          const response = await fetch('http://localhost:8070/recentSearchFeed')

          const responseData = await response.json()
 
          console.log(responseData)

          setSkills(responseData)
             
          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }
     } 

     sendRequest()
  }, [])

  
  const routerHandler = () => {
    navigate('/addRecentSearchFeed')
  }

  return <>
    {user ? <div>
      <Card>
          <CardBody>
            <Card>
              {skills && <RecentSearchFeedList  data = {skills}/>}
              {!skills && <p>There is no RecentSearchFeed</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add RecentSearchFeed</Button>

    </div> : <></> }
  </>
}

export default ViewRecentSearchFeeds
