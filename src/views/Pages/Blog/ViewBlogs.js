import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import SkillList from './BlogList'


function ViewSkills() {
  const [skills, setSkills] = useState()

  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://localhost:8070/blog')

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

  return (
    <div>
        <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardBody>
          <Card>
             {skills && <SkillList  data = {skills}/>}
             {!skills && <p>There is no Blogs</p>}
          </Card>
        </CardBody>
      </Card>

    </div>
  )
}

export default ViewSkills
