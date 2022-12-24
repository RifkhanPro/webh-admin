/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, Input, Col, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ImageUploader from './ImageUploader'

function AddSkill() {

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
        const response = await fetch('http://localhost:8070/blog', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
            name:topic,
            desc:content
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
      navigate('/blogs')
    }
    setValidated(true)
  }

  return (
    <Card>
      <Col className="col-12">
      <Form noValidate validated={validated} onSubmit={submitHandler} className="form-control">
        <Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label className='mt-1'>Topic</Form.Label>
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
          <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label className='mt-1'>Image</Form.Label>
                <ImageUploader onInput={catchFileDataHandler}/>
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                  Please Enter Image
              </Form.Control.Feedback> */}
          </Form.Group>
        </Row>
        <Button type='submit' className='mt-2'  color='primary'>Submit</Button>
      </Form>
        {/* <form onSubmit={submitHandler} className="m-2">
            <CardGroup className='group'>
                <Label>Name</Label>
                <Input onChange={titleHandler} value={topic} type='text'/>
            </CardGroup>

            <CardGroup className='group'>
                <Label>Description</Label>
                <Input onChange={descHandler}  value={content} type='textarea' rows='5'/>
            </CardGroup>

            <CardGroup className='group'>
                <Label>Add Blog Image</Label>
                <ImageUploader onInput={catchFileDataHandler}/>
            </CardGroup>

            <Button type='submit' className='me-1' color='primary'>Submit</Button>
        </form> */}
      </Col>
    </Card>
  )
}

export default AddSkill
