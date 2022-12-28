/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Button } from 'reactstrap'
import { PlusCircle } from 'react-feather'
import BlogList  from './BlogList'
// import './ViewBlogs.css'

function ViewBlogs() {
  const [blogs, setBlogs] = useState()
  const navigate = useNavigate()

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
          const response = await fetch('http://68.178.164.166:8070/blog')

          const responseData = await response.json()
 
          console.log(responseData)

          setBlogs(responseData)
             
          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }
     } 

     sendRequest()
  }, [])

  const routerHandler = () => {
    navigate('/addBlog')
  }
  
  console.log(user)

  return <>
      <Button className='btn mb-2' onClick={routerHandler}>Add Blog <PlusCircle size={12} /></Button>
  {user ?     
  <div>
        <Card>
       
        <CardBody>
          <Card>
             {blogs && <BlogList  data = {blogs}/>}
             {!blogs && <p>There is no Blogs</p>}
          </Card>
        </CardBody>
      </Card> 
    </div> : <></>}
</>
}

export default ViewBlogs
