/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import { Button, Card, CardGroup, CardTitle, Col, Input, Label, Row } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import ImageUploader from './ImageUploader'
import Form from 'react-bootstrap/Form'

const EditSkill = () => {
    
	const [validated, setValidated] = useState(false)
	const navigate = useNavigate()
	const {id} = useParams()
	const [topic, setTitle] = useState()
	const [desc, setDesc] = useState()

	const titleHandler = (e) => {
		setTitle(e.target.value)
	}
	const descHandler = (e) => {
		setDesc(e.target.value)
	}
	
	 const catchFileDataHandler = (e) => {
		console.log(e.pickedFile)
	}
	useEffect(() => {
		const sendRequest = async () => {
		 try {
			 const response = await fetch(`http://localhost:8070/skill/${id}`)
	
			 const responseData = await response.json()
	
			 console.log(responseData)
	
			 setTitle(responseData.title)
			 setDesc(responseData.desc)

			 if (!response.ok()) {
			   throw new Error(responseData.message)
		   }
	
		 } catch (err) {
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
				const response = await fetch(`http://localhost:8070/skill/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						desc,
						title:topic
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
			navigate('/skills')
				
			}
			setValidated(true)
		}
	return (<Card>
				<Col className="col-12">
					<Form noValidate validated={validated} onSubmit={submitHandler} className="form-control">
						<Row>
							<Form.Group as={Col} controlId="validationCustom01">
								<Form.Label className="mt-1">Title</Form.Label>
								<Input
								required
								type="text"
								placeholder="Enter Title"
								value={topic}
								onChange={titleHandler}
								/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									Please Enter Title
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Row>
							<Form.Group as={Col} controlId="validationCustom02">
								<Form.Label className="mt-1">Description</Form.Label>
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
						<Row>
							{/* <CardGroup> */}
							<Form.Group as={Col} controlId="validationCustom02">
								<Form.Label className="mt-1">Image</Form.Label>
									<ImageUploader onInput={catchFileDataHandler}/>
							</Form.Group>
							{/* </CardGroup> */}
						</Row>
						<Button type='submit' className='mt-2'  color='primary'>Submit</Button>
					</Form>
					{/* <form onSubmit={submitHandler} className="m-2">
						<CardGroup className='group col-12'>
							<Label>Title</Label>
							<Input onChange={titleHandler} value={topic} type='text'/>
						</CardGroup>
			
						<CardGroup className='group'>
							<CardTitle>Description</CardTitle>
							<Input onChange={descHandler}  value={desc} type='text'/>
						</CardGroup>
						
						<CardGroup className='group'>
            				<Label>Select Skill Image</Label>
            
           				</CardGroup>
            			<CardGroup>
            				<ImageUploader onInput={catchFileDataHandler}/>
            			</CardGroup>
						<Button type='submit' className='btn' color='primary'>Update</Button>
					</form> */}
				</Col>
			</Card>)
}

export default EditSkill