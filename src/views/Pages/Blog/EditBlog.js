/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
// import './AddSkill.css'
import { Button, Card, Col, Row, Input } from 'reactstrap'
import { useParams, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'

const EditSkill = () => {

	const [validated, setValidated] = useState(false)
	const [topic, setTitle] = useState()
	const [desc, setDesc] = useState()
    const navigate = useNavigate()
	const {id}  = useParams()

	const titleHandler = (e) => {
	  setTitle(e.target.value)
	}
	const descHandler = (e) => {
	  setDesc(e.target.value)
  
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
		const form = e.currentTarget
		if (form.checkValidity() === false) {
		  e.preventDefault()
		  e.stopPropagation()
		} else {
			try {
					const response = await fetch(`http://localhost:8070/blog/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
							name:topic,
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
				
				}

			navigate('/blogs')
			}
			setValidated(true)
		}
  
	return (
	  <Card>
		<Col className='col-12'>
			<Form noValidate validated={validated} onSubmit={submitHandler} className="form-control">
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
		</Form>
		</Col>
		{/* <form onSubmit={submitHandler}>
			<CardGroup className='group'>
				<CardTitle>Title</CardTitle>
				<Input onChange={titleHandler} value={topic} type='text'/>
			</CardGroup>
  
			<CardGroup className='group'>
				<CardTitle>Description</CardTitle>
				<Input onChange={descHandler}  value={desc} type='text'/>
			</CardGroup>
  
			<Button type='submit' className='btn'>Update</Button>
		</form> */}
	  </Card>
	)
}

export default EditSkill
