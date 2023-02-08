/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import { Button, Card, CardGroup, Row, Col, CardTitle, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ImageUploader from './ImageUploader'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import './EditPostManagement.css'

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
		}
		setName(e.target.value)
	}

	const expiryHandler = (e) => {
		if (e.target.value.trim() === '') {
			setExpiryValidate(false)
		} else {
			setExpiryValidate(true)
		}
		setExpiry(e.target.value)
  	}

  	const descHandler = (e) => {
		if (e.target.value.trim() === '') {
			setDescValidate(false)
		} else {
			setDescValidate(true)
		}
		setDesc(e.target.value)
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
			const response = await fetch(`http://44.202.187.100:8070/advertisement/${id}`)
	
			const responseData = await response.json()
	
			console.log(responseData)
	
			setName(responseData.name)
			setExpiry(responseData.expiry)
			setDesc(responseData.desc)
			if (responseData.image) {
				setImage(responseData.image)
			}

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
					const response = await fetch(`http://44.202.187.100:8070/advertisement/${id}`, 
					{
						method:"PUT", headers : {
							"Content-Type":"application/json"
						}, body :JSON.stringify({
								name,		
								desc,
								expiry,
								image:imageUrl
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
					console.log(err)
				}
				
				navigate('/advertisements')
				window.location.reload(true)

			} else {
				try {
					const response = await fetch(`http://44.202.187.100:8070/advertisement/${id}`, 
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
					console.log(err)
				}
				
				navigate('/advertisements')
				window.location.reload(true)
			}


		}

	
	return (<div className='edit-postManagement-container'>

			<form onSubmit={submitHandler} className='edit-postManagement-form'>
				<h3 >Edit Advertisement</h3>
				<div className='edit-postManagement-group'>
					<h5>Name</h5>
					<input onChange={nameHandler} value={name} type='text' placeholder='Enter Name'/>
					{!nameValidate && <p style={{color:"Red"}}>Name should not be Empty</p>}
				</div>
	
				<div className='edit-postManagement-group'>
					<h5>Description</h5>
					<input onChange={descHandler}  value={desc} type='textarea' rows='4' placeholder='Enter Description'/>
					{!descValidate && <p style={{color:"Red"}}>Description should not be empty</p>}
				</div>

				<div className='edit-postManagement-group'>
					<h5>Description</h5>
					<input onChange={expiryHandler}  value={expiry} type='date' rows='4' placeholder='Enter Expiry Date'/>
					{!expiryValidate && <p style={{color:"Red"}}>Description should not be empty</p>}
				</div>

				<div className='edit-postManagement-group edit-postManagement-group-image'>
              		<h5>Add Image</h5>
					  <ImageUploader onInput={catchFileDataHandler} value={selectedFile} image={image}/>
					{!imageValidate && <p style={{color:"Red"}}>Image should be selected</p>}
				</div>
				<button type='submit' className='btn' color='primary'>Update</button>
			</form>
	</div>)
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
	
