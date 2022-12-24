/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, Col, Row, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import Form from 'react-bootstrap/Form'

function AddPostManagement() {

  const [validated, setValidated] = useState(false)

  const [topic, setTitle] = useState()
  const [content, setDesc] = useState()
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
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      try {
        const response = await fetch('http://localhost:8070/postManagement/create', 
        {
          method:"POST", headers : {
            "Content-Type":"application/json"
          }, body :JSON.stringify({
            name:topic,
            description:content
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
        console.log(err)
      }
      navigate('/postManagements')
    }
    setValidated(true)
  }

  return (
    <Card>
      <Form noValidate validated={validated} onSubmit={submitHandler} className="form-control">
        <h3 className='mt-2'>Add Post</h3>
        <Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label className='mt-2'>Topic</Form.Label>
            <Input
              required
              type="text"
              placeholder="Enter Topic"
              onChange={titleHandler}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please Enter Topic
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label className='mt-1'>Description</Form.Label>
            <Input
              required
              type="textarea"
              placeholder="Enter Description"
              rows='5'
              onChange={descHandler}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please Enter Description
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
        <CardGroup className='group'>
              <Form.Label className='mt-1'>Image</Form.Label>
              <ImageUploader onInput={catchFileDataHandler}/>
          </CardGroup>
        </Row>
        <Button type='submit' className='mt-2'  color='primary'>Submit</Button>
      </Form>
      {/* <form onSubmit={submitHandler}>
          <CardGroup className='group'>
              <CardTitle>Name</CardTitle>
              <Input onChange={titleHandler} value={topic} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Add Skill Image</CardTitle>
              <ImageUploader onInput={catchFileDataHandler}/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Description</CardTitle>
              <Input onChange={descHandler}  value={content} type='text'/>
          </CardGroup>

          <Button type='submit' className='btn'>Submit</Button>
      </form> */}
    </Card>
  )
}

export default AddPostManagement
