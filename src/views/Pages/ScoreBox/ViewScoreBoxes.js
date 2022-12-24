import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import ScoreBoxList from './ScoreBoxList'
import './ViewBlogs.css'

function ViewScoreBoxes() {
  const [skills, setSkills] = useState()
  const navigate  = useNavigate()
  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://localhost:8070/scoreBox')

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
    navigate('/addScoreBox')
  }

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {skills && <ScoreBoxList  data = {skills}/>}
              {!skills && <p>There is no ScoreBoxes</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add ScoreBox</Button>

    </div>
  )
}

export default ViewScoreBoxes
