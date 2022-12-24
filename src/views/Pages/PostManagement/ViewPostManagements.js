import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import PostManagementList from './PostManagementList'
import './ViewBlogs.css'

function ViewPostManagements() {
  const [skills, setSkills] = useState()
  const navigate  = useNavigate()
  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://localhost:8070/postManagement/posts')

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
    navigate('/addPostManagement')
  }

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {skills && <PostManagementList  data = {skills}/>}
              {!skills && <p>There is no postManagements</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add postManagement</Button>

    </div>
  )
}

export default ViewPostManagements
