/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, Fragment } from 'react'
import { Button, Card, CardGroup, Col, Input, Label, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

import ImageUploader from './ImageUploader'

function AddSkill() {

  const [validated, setValidated] = useState(false)
  const [topic, setTitle] = useState()
  const [content, setDesc] = useState()
  // const [files, setFiles] = useState([])
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
          const response = await fetch('http://localhost:8070/skill', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
              title:topic,
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
        navigate('/skills')
      }
    setValidated(true)
   
  }

  return (
    <Card>
      <Col className="col-12">
        <h3 className='m-2'>Add Skill</h3>
        <Form noValidate validated={validated} onSubmit={submitHandler} className="form-control">
        <Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Title</Form.Label>
            <Input
              required
              type="text"
              placeholder="Enter Title"
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
          <Form.Label className='mt-1'>Image</Form.Label>
        </Row>
        <CardGroup>
            <ImageUploader onInput={catchFileDataHandler}/>
        </CardGroup>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please Enter Image
            </Form.Control.Feedback>
        <Button type='submit' className='mt-2'  color='primary'>Submit</Button>
      </Form>
        {/* <form onSubmit={submitHandler} className="m-2">
            <CardGroup className='group col-12'>
            <Label>Title</Label>
                <Input onChange={titleHandler} value={topic} type='text'/>
            </CardGroup>

            <CardGroup className='group'>
            <Label>Description</Label>
                <Input type="textarea" onChange={descHandler}  value={content} rows='5'/>
            </CardGroup>

            <CardGroup className='group'>
            <Label>Select Skill Image</Label>

            </CardGroup>
            <CardGroup>
            <ImageUploader onInput={catchFileDataHandler}/>
            </CardGroup>

            <Button type='submit' color='primary' className='btn mt-2'>Submit</Button>
        </form> */}
      </Col>
    </Card>
  )
}

export default AddSkill
