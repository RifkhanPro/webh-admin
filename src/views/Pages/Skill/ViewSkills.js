import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Button } from 'reactstrap'
import SkillList from './SkillList'
import './ViewBlogs.css'

function ViewSkills() {
  const [skills, setSkills] = useState()
  const navigate  = useNavigate()
  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://68.178.164.166:8070/skill')

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
    navigate('/addSkill')
  }

  return (
    <div>
      <Card>
          <CardBody>
            <Card>
              {skills && <SkillList  data = {skills}/>}
              {!skills && <p>There is no Skills</p>}
            </Card>
          </CardBody>
      </Card>

      <Button className='btn' onClick={routerHandler}>Add Skill</Button>

    </div>
  )
}

export default ViewSkills
