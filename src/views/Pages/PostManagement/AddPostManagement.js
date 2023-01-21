/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
import './AddPostManagement.css'
import { Button, Card, CardGroup, CardTitle, Label, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

function AddPostManagement() {
  const [topic, setTopic] = useState('')
  const [content, setDesc] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [topicValidate, setTopicValidate] = useState(true)
  const [contentValidate, setcontentValidate] = useState(true)
  const [imageValidate, setImageValidate] = useState(true)
  const navigate = useNavigate()

  const topicHandler = (e) => {
    if (e.target.value.trim() === '') {
      setTopicValidate(false)
    } else {
      setTopicValidate(true)
      setTopic(e.target.value)

    }
  }
  const contentHandler = (e) => {
    if (e.target.value.trim() === '') {
      setcontentValidate(false)
    } else {
      setcontentValidate(true)
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

    if (topic.trim() === '') {
      setTopicValidate(false)
      return
    }

    if (content.trim() === '') {
      setcontentValidate(false)
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
        const response = await fetch('http://localhost:8070/postManagement/create', 
        {
          method:"POST", headers : {
            "Content-Type":"application/json"
          }, body :JSON.stringify({
            name:topic,
            description:content,
            image
          })
        })

        const responseData = await response.json()
        console.log(responseData)
        if (!response.ok) {
          throw new Error(responseData.message)
        }

       setTopic('')
       setDesc('')
      } catch (err) { 
        console.log(err)
      }
      navigate('/postManagements')
    }

  return (
    <div className='edit-postManagement-container'>
      <form onSubmit={submitHandler}  className='edit-postManagement-form'>
          <h3>Add Post</h3>
          <div className='edit-postManagement-group'>
            <h5>Name</h5>
            <input onChange={topicHandler} value={topic} type='text' placeholder='Enter Name'/>
            {!topicValidate && <p style={{color:"Red"}}>Name should not be Empty</p>}
          </div>
	
          <div className='edit-postManagement-group'>
					<h5>Description</h5>
					<input onChange={contentHandler}  value={content} type='textarea' rows='4' placeholder='Enter Description'/>
					{!contentValidate && <p style={{color:"Red"}}>Description should not be empty</p>}
				</div>

         
				<div className='edit-postManagement-group edit-postManagement-group-image'>
              		<h5>Add Skill Image</h5>
					<ImageUploader onInput={catchFileDataHandler} />
					{!imageValidate && <p style={{color:"Red"}}>Image should be selected</p>}
				</div>
				<button type='submit' className='btn' color='primary'>Add</button>
      </form>
    </div>
  )


}

export default AddPostManagement
/* <Form onSubmit={submitHandler} className="form-control"> */
        
        /* <Row>
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
      </Form> */
