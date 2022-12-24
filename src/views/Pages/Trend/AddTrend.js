/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, Col, Row, Input, Label } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import Form from 'react-bootstrap/Form'

function AddTrend() {

  const [validated, setValidated] = useState(false)
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
    const form = e.currentTarget
		if (form.checkValidity() === false) {
		  e.preventDefault()
		  e.stopPropagation()
		} else {
        try {
          const response = await fetch('http://localhost:8070/trend', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
              title,
              desc
            })
          })

          const responseData = await response.json()

          if (!response.ok) {
            throw new Error(responseData.message)
          }


          setDesc('')
          setTitle('')
        } catch (err) { 
          //
        }
      navigate('/trends')
    }
    setValidated(true)
  }

  return (
    <Card>
      <Col className="col-12">
        <Form noValidate validated={validated} onSubmit={submitHandler} className="form-control">
          <Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Title</Form.Label>
            <Input
              required
              type="text"
              onChange={titleHandler}
              placeholder="Enter Title"
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Enter Title
            </Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label>Description</Form.Label>
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
              <Label>Add Trend Image</Label>
              <ImageUploader onInput={catchFileDataHandler}/>
          </CardGroup>
          </Row>
          <Button type='submit' className='mt-2'  color='primary'>Submit</Button>
        </Form>
      {/* <form onSubmit={submitHandler}  className='form-control'>
          <CardGroup className='group'>
              <Label>Title</Label>
              <Input onChange={titleHandler} value={title} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <Label>Description</Label>
              <Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
          </CardGroup>
          
          <CardGroup className='group'>
              <Label>Add Trend Image</Label>
              <ImageUploader onInput={catchFileDataHandler}/>
          </CardGroup>

          <Button type='submit' className='me-1' color='primary'>Submit</Button>
      </form> */}
      </Col>
    </Card>
  )
}

export default AddTrend
