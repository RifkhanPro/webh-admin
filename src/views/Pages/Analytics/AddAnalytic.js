/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, Row, Col, Label, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

function AddAnalytic() {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [titleValidate, setTitleValidate] = useState(true)
  const [descValidate, setDescValidate] = useState(true)
  const [imageValidate, setImageValidate] = useState(true)
  const navigate = useNavigate()

  const titleHandler = (e) => {
    if (e.target.value.trim() === '') {
      setTitleValidate(false)
    } else {
      setTitleValidate(true)
      setTitle(e.target.value)

    }
  }
  const descHandler = (e) => {
    if (e.target.value.trim() === '') {
      setDescValidate(false)
    } else {
      setDescValidate(true)
      setDesc(e.target.value)

    }
  }
  const catchFileDataHandler = (e) => {
   
    if (e.name === '') {
      setImageValidate(false)
    } else {
      setImageValidate(true)
      setSelectedFile(e)
    }
	}

  const submitHandler =  async (e) => {
    e.preventDefault()

    if (title.trim() === '') {
      setTitleValidate(false)
      return
    }

    if (desc.trim() === '') {
      setDescValidate(false)
      return
    }

    if (selectedFile === undefined) {
      setImageValidate(false)
      return
    }

    let image

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("upload_preset", "feed_images")
    console.log('validate')

    try {
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/movie-reservation/image/upload",
          formData
        )
        .then((res) => {
          image = res.data.secure_url
        })
    } catch (error) {
      alert(error)
    }

      try {
        const response = await fetch('http://localhost:8070/analytics', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
            title,
            desc,
            image
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

    navigate('/analytics')
  }
  // setValidated(true)


  return (
    <Card>
      <Col className='col-12'>
      {/* <Form onSubmit={submitHandler}>
        <Row>
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Title</Form.Label>
            <Input
              type="text"
              placeholder="Enter Title"
              onChange={titleHandler}
              value={title}
            />
            {!titleValidate && <p>Title should not be Empty</p>}
          </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label>Description</Form.Label>
            <Input
              type="textarea"
              placeholder="Enter Description"
              rows='5'
              onChange={descHandler}
              value={desc}
            />
             {!descValidate && <p>It should not be empty</p>}
          </Form.Group>
        </Row>
        <Row>
        <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label>Image</Form.Label>
            <CardGroup className='group'>
                <ImageUploader onInput={catchFileDataHandler}/>
            </CardGroup>
            {!imageValidate && <p>image should be selected</p>}
          </Form.Group>
        </Row>
        <Button type='submit' className='mt-2'  color='primary'>Submit</Button>
      </Form> */}
        <form onSubmit={submitHandler} className='form-control'>
            <CardGroup className='group'>
                <Label>Title</Label>
                <Input onChange={titleHandler} value={title} type='text'/>
                {!titleValidate && <p>Title should not be Empty</p>}
            </CardGroup>

            <CardGroup className='group'>
                <Label>Description</Label>
                <Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
                {!descValidate && <p>Description should not be empty</p>}
            </CardGroup>
            
            <CardGroup className='group'>
                <Label>Add Analytic Image</Label>
            </CardGroup>
            <div>
            <ImageUploader onInput={catchFileDataHandler}/>
                {!imageValidate && <p>Image should be selected</p>}
            </div>

            <Button type='submit' className='me-1' color='primary'>Submit</Button>
        </form>
      </Col>
    </Card>
  )
}

export default AddAnalytic
