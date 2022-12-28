/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, Row, Col, CardTitle, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ImageUploader from './ImageUploader'
import axios from 'axios'

const EditAdvertisement = () => {

	
	const {id} = useParams()
    const navigate = useNavigate()
	const [name, setName] = useState()
	const [desc, setDesc] = useState()
	const [expiry, setExpiry] = useState()
	const [image, setImage] = useState("")
	const [selectedFile, setSelectedFile] = useState()
  	const [nameValidate, setNameValidate] = useState(true)
  	const [descValidate, setDescValidate] = useState(true)
	const [expiryValidate, setExpiryValidate] = useState(true)
  	const [imageValidate, setImageValidate] = useState(true)

	const nameHandler = (e) => {
		if (e.target.value.trim() === '') {
			setNameValidate(false)
		} else {
			setNameValidate(true)
			setName(e.target.value)
		}
  	}

	const expiryHandler = (e) => {
		if (e.target.value.trim() === '') {
			setExpiryValidate(false)
		} else {
			setExpiryValidate(true)
			setExpiry(e.target.value)
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
			const response = await fetch(`http://68.178.164.166:8070/advertisement/${id}`)
	
			const responseData = await response.json()
	
			console.log(responseData)
	
			setName(responseData.name)
			setExpiry(responseData.expiry)
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
			if (name.trim() === '') {
				setNameValidate(false)
				return
		  	}

			if (desc.trim() === '') {
				setDescValidate(false)
				return
			}
			
			if (expiry.trim() === '') {
				setExpiryValidate(false)
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
				const response = await fetch(`http://68.178.164.166:8070/advertisement/${id}`, 
				{
					method:"PUT", headers : {
						"Content-Type":"application/json"
					}, body :JSON.stringify({
							name,		
							desc,
							expiry,
							image
						})
					})
					const responseData = await response.json()
		
					if (!response.ok) {
						throw new Error(responseData.message)
					}
					setName('')
					setDesc('')
					setExpiry('')
			
			} catch (err) { 
				console.log(Err)
			}
			navigate('/advertisements')
			window.location.reload(true)

		}

	return (<Card>
		<Col className='col-12'>
			<Form onSubmit={submitHandler} className="form-control">
				<Row>
					<Form.Group as={Col} controlId="validationCustom01">
						<Form.Label>Name</Form.Label>
						<Input
							required
							type="text"
							value={name}
							onChange={nameHandler}
							placeholder="Enter name"
						/>
						{!nameValidate && <p style={{color:"Red"}}>Topic should not be Empty</p>}
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
						{!descValidate && <p style={{color:"Red"}}>Description should not be empty</p>}
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
							value={expiry}
						/>
						{!expiryValidate && <p style={{color:"Red"}}>Description should not be empty</p>}
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
				<ImageUploader onInput={catchFileDataHandler} value={selectedFile} image={image}/>
					{!imageValidate && <p style={{color:"Red"}}>Image should be selected</p>}
				</Row>
				<Button type='submit' className='mt-2'  color='primary'>Update</Button>
			</Form>
			</Col>
	</Card>
	)
}

export default EditAdvertisement
			/* <form onSubmit={submitHandler} className='form-control'>
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

				<Button type='submit' className='me-1' color='primary'>Update</Button>
			</form> */
	
