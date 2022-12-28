/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import { Button, Card, CardGroup, Row, CardTitle, Col, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ImageUploader from './ImageUploader'
import axios from 'axios'

const EditAnalytic = () => {
    
	const {id} = useParams()
	const navigate = useNavigate()

	const [title, setTitle] = useState()
	const [desc, setDesc] = useState()
	const [image, setImage] = useState("")
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
			const response = await fetch(`http://68.178.164.166:8070/analytics/${id}`)
	
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
			setDescValidate(false)
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
			const response = await fetch(`http://68.178.164.166:8070/analytics/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
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

		navigate('/analytics')
		}

	return (<Card>
			<Col className='col-12'>
				<Form onSubmit={submitHandler} className="form-control">
					<h3>Edit Analytics</h3>
					<Row>
						<Form.Group as={Col}>
							<CardTitle className='mt-1'>Title</CardTitle>
							<Input
							required
							type="text"
							value={title}
							onChange={titleHandler}
							placeholder="Enter Topic"
							/>
						{!titleValidate && <p>Title should not be Empty</p>}
						</Form.Group>
					</Row>
					<Row>
						<Form.Group as={Col}>
							<CardTitle className='mt-1'>Description</CardTitle>
							<Input
							required
							type="textarea"
							placeholder="Enter Description"
							rows='5'
							onChange={descHandler}
							value={desc}
							/>
						</Form.Group>
						{!descValidate && <p>Description should not be empty</p>}
					</Row>
					<Row>
						<Form.Group as={Col} >
							<CardGroup className='group'>
							</CardGroup>
						</Form.Group>
								<CardTitle className='mt-1'>Add Image</CardTitle>
								<ImageUploader onInput={catchFileDataHandler} value={selectedFile} image={image} />
								{!imageValidate && <p>image should be selected</p>}
					</Row>
				<Button type='submit' className='mt-2'  color='primary'>Update</Button>
				</Form>
			</Col>
	</Card>)
}

export default EditAnalytic