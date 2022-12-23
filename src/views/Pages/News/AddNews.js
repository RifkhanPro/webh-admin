/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, Col, Form, Input, Label } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'

function AddNews() {

  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const navigate = useNavigate()

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }
  const descHandler = (e) => {
    setDesc(e.target.value)

  }
  const catchFileDataHandler = (e) => {
		console.log(e.pickedFile)
	}

  const submitHandler =  async (e) => {
    e.preventDefault()

    try {
			const response = await fetch('http://localhost:8070/news', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
          title,
					desc
				})
			})

			const responseData = await response.json()

      console.log(responseData)

			if (!response.ok) {
				throw new Error(responseData.message)
			}


      setDesc('')
      setTitle('')
		} catch (err) { 
      //
    }

    navigate('/news')
  }

  return (
    <Card>
      <Col className='col-12'>
        <Form onSubmit={submitHandler} className='form-control'>
            <CardGroup className='group'>
                <Label>Title</Label>
                <Input onChange={titleHandler} value={title} type='text'/>
            </CardGroup>

            <CardGroup className='group'>
                <Label>Add Skill Image</Label>
                <ImageUploader onInput={catchFileDataHandler}/>
            </CardGroup>

            <CardGroup className='group'>
                <Label>Description</Label>
                <Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
            </CardGroup>

            <Button type='me-1' color='primary' className='btn'>Submit</Button>
        </Form>
      </Col>
    </Card>
  )
}

export default AddNews
