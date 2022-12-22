import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, ButtonToggle, Button } from 'reactstrap'
import BlogList  from './BlogList'
import './ViewBlogs.css'

function ViewBlogs() {
  const [blogs, setBlogs] = useState()
  const navigate = useNavigate()

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

  return <>
     <div>
        <Card>
       
        <CardBody>
          <Card>
             {blogs && <BlogList  data = {blogs}/>}
             {!blogs && <p>There is no Blogs</p>}
          </Card>
        </CardBody>
      </Card> 
      <Button className='btn' onClick={routerHandler}>Add Blog</Button>
    </div>
</>
}

export default ViewBlogs
