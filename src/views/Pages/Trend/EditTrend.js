/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, Row, Col, Label, Input, CardTitle } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ImageUploader from './ImageUploader'
import axios from 'axios'

const EditTrend = () => {

	const navigate = useNavigate()
	const {id} = useParams()

	const [title, setTitle] = useState()
	const [desc, setDesc] = useState()
	const [image, setImage] = useState('')
	const [selectedFile, setSelectedFile] = useState()
  	const [titleValidate, setTitleValidate] = useState(true)
  	const [descValidate, setDescValidate] = useState(true)
  	const [imageValidate, setImageValidate] = useState(true)

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
	 useEffect(() => {
		const sendRequest = async () => {
		 try {
			const response = await fetch(`http://68.178.164.166:8070/trend/${id}`)
	
			const responseData = await response.json()
	
			console.log(responseData)
	
			setTitle(responseData.title)
			setDesc(responseData.desc)
			setImage(responseData.image)

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
			if (title.trim() === '') {
				setTitleValidate(false)
				return
		  	}

			if (desc.trim() === '') {
				setContentValidate(false)
				return
			}
	  
	
		  	console.log('validate')
		   
			let imageUrl = ''

			if (selectedFile !== undefined) {
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
						imageUrl = res.data.secure_url
					})
				} catch (error) {
					alert(error)
				}
			}

			if (imageUrl !== '') {
				try {
					const response = await fetch(`http://68.178.164.166:8070/trend/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						desc,
						title,
						image:imageUrl
						})
					})
					const responseData = await response.json()
			
					if (!response.ok) {
						throw new Error(responseData.message)
					}
			
					setTitle('')
					setDesc('')
	
					} catch (err) { 
						console.log(err)
					}
					navigate('/trends')
					window.location.reload(true)

			} else {
				try {
					const response = await fetch(`http://68.178.164.166:8070/trend/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						desc,
						title,
						image
						})
					})
					const responseData = await response.json()
			
					if (!response.ok) {
						throw new Error(responseData.message)
					}
			
					setTitle('')
					setDesc('')
	
					} catch (err) { 
						console.log(err)
					}
					navigate('/trends')
				window.location.reload(true)

			}

			
		}

	return (<Card>
			<Col className='col-12'>
				<Form onSubmit={submitHandler} className="form-control">
					<Row>
						<Form.Group as={Col}>
							<Form.Label>Title</Form.Label>
							<Input
								required
								type="text"
								value={title}
								onChange={titleHandler}
							/>
							{!titleValidate && <p style={{color:"Red"}}>Title should not be Empty</p>}
						</Form.Group>
					</Row>
				<Row>
					<Form.Group as={Col}>
						<Form.Label>Description</Form.Label>
						<Input
							required
							type="textarea"
							placeholder="Enter Description"
							rows='5'
							onChange={descHandler}
							value={desc}
						/>
						{!descValidate && <p style={{color:"Red"}}>Description should not be empty</p>}
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} >
						<CardGroup className='group'>
						<Form.Label>Add Image</Form.Label>
						
					</CardGroup>
					</Form.Group>
				</Row>
				<Row>
				<ImageUploader onInput={catchFileDataHandler} value={selectedFile} image={image} />
						{!imageValidate && <p style={{color:"Red"}}>image should be selected</p>}
				</Row>
				<Button type='submit' className='mt-2'  color='primary'>Update</Button>
			</Form>
			</Col>
	</Card>)
}

export default EditTrend