/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, Button } from 'reactstrap'
import { PlusCircle } from 'react-feather'
import BlogList  from './BlogList'
import './ViewPostManagements.css'
import { RotatingLines } from 'react-loader-spinner'

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
          const response = await fetch('http://localhost:8070/blog')

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
    {user ? <div className="postManagement-container">
            <div className="postManagement-card">
              <button className='btn' onClick={routerHandler}>Add Blog</button>
              <div className="postManagement-card-body">
                  {blogs && <BlogList  data = {blogs}/>}
                  {!blogs && <p>There is no blogs</p>}
                  {!blogs &&    <RotatingLines className="text-center"
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="1"
                  width="96"
                  visible={true}
                />}
              </div>
            </div>
    </div> : <></> }
    </>
}

export default ViewBlogs
