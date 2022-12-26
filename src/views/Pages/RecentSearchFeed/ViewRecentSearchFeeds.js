import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import RecentSearchFeedList from './RecentSearchFeedList'
import './ViewBlogs.css'

function ViewRecentSearchFeeds() {
  const [skills, setSkills] = useState()
  const navigate  = useNavigate()
  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://68.178.164.166:8070/recentSearchFeed')

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

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {skills && <RecentSearchFeedList  data = {skills}/>}
              {!skills && <p>There is no RecentSearchFeed</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add RecentSearchFeed</Button>

    </div>
  )
}

export default ViewRecentSearchFeeds
