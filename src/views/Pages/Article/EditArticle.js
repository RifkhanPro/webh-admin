/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
// import './AddSkill.css'
import { Button, Card, Row, Col, CardGroup, CardTitle, Input } from 'reactstrap'
import { useParams, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import ImageUploader from './ImageUploader'
import axios from 'axios'

const EditArticle = () => {

    const navigate = useNavigate()
	const {id}  = useParams()

	const [topic, setTitle] = useState()
	const [desc, setDesc] = useState()
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
			const response = await fetch(`http://localhost:8070/article/${id}`)

			const responseData = await response.json()

			console.log(responseData)

			setTitle(responseData.title)
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
				const response = await fetch(`http://localhost:8070/article/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					desc,
					title:topic,
					image
					})
				})
		
				const responseData = await response.json()
				console.log(responseData)
		
				if (!response.ok) {
					throw new Error(responseData.message)
				}
		
				setTitle('')
				setDesc('')
				} catch (err) { 
					console.log(err)
				}

			navigate('/articles')
			
		}
  
	return (
	  <Card>
		<Col className='col-12'>
			<Form onSubmit={submitHandler} className="form-control">
			<Row>
			<Form.Group as={Col}>
				<Form.Label>Topic</Form.Label>
				<Input
				required
				type="text"
				value={topic}
				onChange={titleHandler}
				/>
				{!topicValidate && <p>Topic should not be Empty</p>}
			</Form.Group>
			</Row>
			<Row>
			<Form.Group as={Col} >
				<Form.Label>Description</Form.Label>
				<Input
				required
				type="textarea"
				placeholder="Enter Description"
				rows='5'
				onChange={descHandler}
				value={desc}
				/>
				{!descValidate && <p>Description should not be empty</p>}
			</Form.Group>
			</Row>
			<Row>
			<Form.Group as={Col} >
				<CardGroup className='group'>
              <CardTitle>Add Image</CardTitle>
              <ImageUploader onInput={catchFileDataHandler} value={selectedFile}/>
              {!imageValidate && <p>image should be selected</p>}
			  </CardGroup>
			</Form.Group>
			</Row>
			<Button type='submit' className='mt-2'  color='primary'>Submit</Button>
		</Form>
		{/* <form onSubmit={submitHandler} className='form-control'>
			<CardGroup className='group'>
				<Label>Title</Label>
				<Input onChange={titleHandler} value={topic} type='text'/>
			</CardGroup>
  
			<CardGroup className='group'>
				<Label>Description</Label>
				<Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
			</CardGroup>
  
			<Button type='submit' className='me-1' color='primary'>Update</Button>
		</form> */}
		</Col>
	  </Card>
	)
}
export default EditArticle
