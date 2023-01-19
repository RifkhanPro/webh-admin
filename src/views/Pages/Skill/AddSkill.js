/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, {  useState } from 'react'
import { Button, Card, CardGroup, CardTitle, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

function AddSkill() {

  const [topic, setTitle] = useState('')
  const [content, setDesc] = useState('')
  const [topicValidate, setTopicValidate] = useState(true)
  const [contentValidate, setContentValidate] = useState(true)
  const navigate = useNavigate()
 

  const titleHandler = (e) => {

    if (e.target.value.trim() === '') {
      setTopicValidate(false)
    } else {
      setTopicValidate(true)
      setTitle(e.target.value)

    }

  }
  const descHandler = (e) => {
    if (e.target.value.trim() === '') {
      setContentValidate(false)
    } else {
      setContentValidate(true)
      setDesc(e.target.value)

    }

  }

  const submitHandler =  async (e) => {
    e.preventDefault()

    if (topic.trim() === '') {
      setTopicValidate(false)
      return
    }

    if (content.trim() === '') {
      setContentValidate(false)
      return
    }

    console.log('validate')
 
    try {
			const response = await fetch('http://localhost:8070/skill', 
      {method:"POST", headers : {"Content-Type":"application/json"},
       body :JSON.stringify({
					title:topic,
					desc:content
				})
			})

			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(responseData.message)
			}


      setDesc('')
      setTitle('')
		} catch (err) { 
      console.log(err)
    }

    navigate('/skills')
  }

  return (
    <Card>
      <form onSubmit={submitHandler} className='form-control col-12'>
        <h3>Add Skill</h3>
          <CardGroup className='group'>
              <CardTitle className='mt-2'>Title</CardTitle>
              <Input onChange={titleHandler} value={topic} type='text' placeholder='Enter Title'/>
              {!topicValidate && <p style={{color:"Red"}}>Topic should not be Empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle className='mt-1'>Description</CardTitle>
              <Input onChange={descHandler}  value={content} type='textarea'  placeholder='Enter Description' rows='5'/>
              {!contentValidate && <p style={{color:"Red"}}>Description should not be empty</p>}
          </CardGroup>
          <Button type='submit' className='btn mt-2' >Submit</Button>
      </form>
    </Card>
  )
}

export default AddSkill
