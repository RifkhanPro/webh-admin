/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

function AddTopic() {

  const [topic, setTitle] = useState()
  const navigate = useNavigate()

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  const submitHandler =  async (e) => {
    e.preventDefault()

    try {
			const response = await fetch('http://localhost:8070/topic', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					category:topic
				})
			})

			const responseData = await response.json()

      console.log(responseData)

			if (!response.ok) {
				throw new Error(responseData.message)
			}

      setTitle('')
		} catch (err) { 
      //
    }

    navigate('/topics')
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
          <CardGroup className='group'>
              <CardTitle>Category</CardTitle>
              <Input onChange={titleHandler} value={topic} type='text'/>
          </CardGroup>
          <Button type='submit' className='btn'>Submit</Button>
      </form>
    </Card>
  )
}

export default AddTopic
