import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import AdvertisementList from './AdvertisementList'
import './ViewBlogs.css'

function ViewAnalytics() {
  const [trends, setTrends] = useState()
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

  return <>
      <Button className='btn mb-2' onClick={routerHandler}>Add Advertisement</Button>
    {user ? <div>
      <Card>
          <CardBody>
            <Card>
              {trends && <AdvertisementList  data = {trends}/>}
              {!trends && <p>There is no Advertisement</p>}
            </Card>
          </CardBody>
      </Card>


    </div> : <></> }
  </>
}

export default ViewAnalytics
