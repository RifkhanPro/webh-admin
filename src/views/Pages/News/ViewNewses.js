import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import NewsList from './NewsList'
import './ViewBlogs.css'

function ViewNewses() {

  const [newses, setNewses] = useState()
  const navigate  = useNavigate()

  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://localhost:8070/news')

          const responseData = await response.json()
 
          setNewses(responseData)
             
          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }
     } 

     sendRequest()
  }, [])

  
  const routerHandler = () => {
    navigate('/addNews')
  }

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {newses && <NewsList  data = {newses}/>}
              {!newses && <p>There is no Newses</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add News</Button>

    </div>
  )
}

export default ViewNewses
