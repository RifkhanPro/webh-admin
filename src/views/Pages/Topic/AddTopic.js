/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

function AddTopic() {

  const navigate = useNavigate()
  const [topic, setTitle] = useState('')
  const [topicValidate, setTopicValidate] = useState(true)
  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  // const categoryHandler = (e) => {
  //   if (e.target.value.trim() === '') {
  //     setTopicValidate(false)
  //   } else {
  //     setTopicValidate(true)
  //     setTitle(e.target.value)
  //   }
  // }

  const submitHandler =  async (e) => {
    e.preventDefault()
    
    if (topic.trim() === '') {
      setTopicValidate(false)
      return
    }

    try {
			const response = await fetch('http://68.178.164.166:8070/topic', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
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
      <form onSubmit={submitHandler} className='form-control col-12'>
          <CardGroup className='group'>
              <CardTitle>Category</CardTitle>
              <Input onChange={titleHandler} value={topic} type='text' placeholder='Enter Category'/>
              {!topicValidate && <p style={{color:"Red"}}>Category should not be Empty</p>}
          </CardGroup>
          <Button type='submit' className='me-1 mt-1' color='primary'>Submit</Button>
      </form>
    </Card>
  )
}

export default AddTopic
