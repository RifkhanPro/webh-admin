/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
// import './AddSkill.css'
import { Button, Card, Col, CardGroup, CardTitle, Input } from 'reactstrap'
import { useParams, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import ImageUploader from './ImageUploader'

const EditSkill = () => {
    
	const navigate = useNavigate()
	const {id}  = useParams()
	const [topic, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [selectedFile, setSelectedFile] = useState()
  	const [topicValidate, setTopicValidate] = useState(true)
  	const [descValidate, setDescValidate] = useState(true)
  	const [imageValidate, setImageValidate] = useState(true)
	
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

    useEffect(() => {
		const sendRequest = async () => {
		try {
			const response = await fetch(`http://localhost:8070/blog/${id}`)

			const responseData = await response.json()

			console.log(responseData)

			setTitle(responseData.name)
			setDesc(responseData.desc)
				
			if (!response.ok()) {
			throw new Error(responseData.message)
		}

		} catch (err) {
			console.log(err)
     	}
    } 

    sendRequest()
 	}, [id])
  
	const submitHandler =  async (e) => {
		e.preventDefault()
			if (topic.trim() === '') {
				setTopicValidate(false)
				return
		  	}

			if (desc.trim() === '') {
				setContentValidate(false)
				return
			}
	  
		  	if (selectedFile === undefined) {
				setImageValidate(false)
				return
		  	}
		  	console.log('validate')
		   
		  	let image

			const formData = new FormData()
			formData.append("file", selectedFile)
			formData.append("upload_preset", "feed_images")

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
				const response = await fetch(`http://localhost:8070/blog/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					name:topic,
					desc,
					image
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

			navigate('/blogs')
		}
  
	return (
	  <Card>
		<Col className='col-12'>
			{/* <Form noValidate validated={validated} onSubmit={submitHandler} className="form-control">
			<Row>
			<Form.Group as={Col} controlId="validationCustom01">
				<Form.Label>Topic</Form.Label>
				<Input
				required
				type="text"
				value={topic}
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
				<Form.Label>Description</Form.Label>
				<Input
				required
				type="textarea"
				placeholder="Enter Description"
				rows='5'
				onChange={descHandler}
				value={desc}
				/>
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Please Enter Description
				</Form.Control.Feedback>
			</Form.Group>
			</Row>
			<Button type='submit' className='mt-2'  color='primary'>Submit</Button>
		</Form> */}
		</Col>
		<form onSubmit={submitHandler}>
			<CardGroup className='group'>
				<CardTitle>Title</CardTitle>
				<Input onChange={titleHandler} value={topic} type='text'/>
				{!topicValidate && <p>Topic should not be Empty</p>}
			</CardGroup>
  
			<CardGroup className='group'>
				<CardTitle>Description</CardTitle>
				<Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
				{!descValidate && <p>Description should not be empty</p>}
			</CardGroup>
  
			<CardGroup className='group'>
              <CardTitle>Add Image</CardTitle>
              <ImageUploader onInput={catchFileDataHandler} value={selectedFile}/>
              {!imageValidate && <p>image should be selected</p>}
			  </CardGroup>

			<Button type='submit' color='primary' className='btn'>Update</Button>
		</form>
	  </Card>
	)
}

export default EditSkill
