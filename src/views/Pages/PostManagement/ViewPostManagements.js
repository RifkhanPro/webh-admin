import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import PostManagementList from './PostManagementList'
import './ViewBlogs.css'

function ViewPostManagements() {
  const [posts, setPosts] = useState()
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
          const response = await fetch('http://44.202.187.100:8070/postManagement/posts')
          const responseData = await response.json()
          setPosts(responseData)
             
          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }
     } 

     sendRequest()
  }, [])

  
  const routerHandler = () => {
    navigate('/addPostManagement')
  }

  return <>
      <Button className='btn mb-2' onClick={routerHandler}>Add postManagement</Button>
    {user ? <div>
      <Card>
          <CardBody>
            <Card>
              {posts && <PostManagementList data={posts} />}
              {!posts && <p>There is no postManagements</p>}
            </Card>
          </CardBody>
      </Card>


    </div> : <></> }
  </>
}

export default ViewPostManagements
