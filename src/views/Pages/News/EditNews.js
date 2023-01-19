/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import { Button, Card, CardGroup, Row, CardTitle, Col, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ImageUploader from './ImageUploader'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'


const EditNews = () => {

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
			const response = await fetch(`http://localhost:8070/news/${id}`)
	
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
					const response = await fetch(`http://localhost:8070/news/${id}`, 
					{
						method:"PUT", headers : {
							"Content-Type":"application/json"
						}, body :JSON.stringify({
							desc,
							title,
							image:imageUrl
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
	
				navigate('/news')
				window.location.reload(true)

			} else {
				try {
					const response = await fetch(`http://localhost:8070/news/${id}`, 
					{
						method:"PUT", headers : {
							"Content-Type":"application/json"
						}, body :JSON.stringify({
							desc,
							title,
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
	
			navigate('/news')
			window.location.reload(true)

			}
			
		}

	return (
		<>
			{ !title && !desc  &&     <RotatingLines className="text-center"
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="1"
					width="96"
					visible={true}
			/>}
		{title && desc && <Card>
			<Col className='col-12'>
				<Form onSubmit={submitHandler} className="form-control">
					<h3>Edit News</h3>
					<Row>
						<Form.Group as={Col}>
							<CardTitle className='mt-1'>Topic</CardTitle>
							<Input
								required
								type="text"
								value={title}
								onChange={titleHandler}
								placeholder='Enter Topic'
							/>
							{!titleValidate && <p style={{color:"Red"}}>Topic should not be Empty</p>}
						</Form.Group>
					</Row>
					<Row>
						<Form.Group as={Col} controlId="validationCustom02">
							<CardTitle className='mt-1'>Description</CardTitle>
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
							</CardGroup>
						</Form.Group>
								<CardTitle className='mt-1'>Add Image</CardTitle>
					</Row>
								<ImageUploader onInput={catchFileDataHandler} value={selectedFile} image={image} />
								{!imageValidate && <p style={{color:"Red"}}>image should be selected</p>}
					<Button type='submit' className='mt-2'  color='primary'>Submit</Button>
				</Form>
			</Col>
		</Card>}
		</>
	)
}

export default EditNews
				/* <form onSubmit={submitHandler} className='form-control'>
					<CardGroup className='group'>
					<Label>Title</Label>
					<Input onChange={titleHandler} value={title} type='text'/>
				</CardGroup>

				<CardGroup className='group'>
					<Label>Description</Label>
					<Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
				</CardGroup>

				<Button type='submit' className='me-1' color='primary'>Update</Button>
			// </form> */

