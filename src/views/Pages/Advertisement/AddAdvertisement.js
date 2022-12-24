/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, Col, Row, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import Form from 'react-bootstrap/Form'

function AddAdvertisement() {

  const [validated, setValidated] = useState(false)
  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const [expiry, setExpiry] = useState()
  const navigate = useNavigate()

  const NameHandler = (e) => {
    setName(e.target.value)
  }

  const descHandler = (e) => {
    setDesc(e.target.value)
  }

  const expiryHandler = (e) => {
    setExpiry(e.target.value)
  }
  // const catchFileDataHandler = (e) => {
	// 	console.log(e.pickedFile)
	// }

  const submitHandler =  async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      try {
        const response = await fetch('http://localhost:8070/advertisement', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
            name,
            desc,
            expiry
          })
        })

        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }


        setDesc('')
        setName('')
        setExpiry('')
      } catch (err) { 
        console.log(err)
      }

      navigate('/advertisements')
    }
    setValidated(true)
  }

  return (
    <Card>
      <Col className='col-12'>
      <Form noValidate validated={validated} onSubmit={submitHandler} className="form-control">
        <Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Input
              required
              type="text"
              placeholder="Enter Name"
              onChange={NameHandler}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please Enter Name
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
        <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label>Expiry Date</Form.Label>
            <Input
              required
              type="date"
              placeholder="Enter Expiry Date"
              onChange={expiryHandler}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please Enter Expiry Date
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type='submit' className='mt-2'  color='primary'>Submit</Button>
      </Form>
      {/* <form onSubmit={submitHandler} className='form-control'>
          <CardGroup className='group'>
              <Label>Name</Label>
              <Input onChange={NameHandler} value={name} type='text'/>
          </CardGroup>


          <CardGroup className='group'>
              <Label>Description</Label>
              <Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
          </CardGroup>

          <CardGroup className='group'>
              <Label>Expiry Date</Label>
              <Input onChange={expiryHandler}  value={expiry} type='date'/>
          </CardGroup>
          <CardGroup className='group'>
              <Label>Add Advertisement Image</Label>
              <ImageUploader onInput={catchFileDataHandler}/>
          </CardGroup>
          <Button type='submit' className='btn'>Submit</Button>
      </form> */}
      </Col>
    </Card>
  )
}

export default AddAdvertisement
