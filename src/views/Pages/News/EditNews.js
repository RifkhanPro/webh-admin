/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import { Button, Card, CardGroup, Row, CardTitle, Col, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ImageUploader from './ImageUploader'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import './EditPostManagement.css'

const EditNews = () => {

	const navigate = useNavigate()
	const {id} = useParams()
	const [title, setTitle] = useState()
	const [desc, setDesc] = useState()
	const [image, setImage] = useState('')
	const [selectedFile, setSelectedFile] = useState()
  	const [titleValidate, setTitleValidate] = useState(true)
  	const [descValidate, setDescValidate] = useState(true)

	const [formValidate, setFormValidate] = useState(false)

	const [titleTouched, setTitleTouched] = useState(false)
	const [descTouched, setDescTouched] = useState(false)

	const validTitle = !titleValidate && titleTouched
	const validDesc = !descValidate && descTouched

	useEffect(() => {
		setFormValidate(titleValidate && descValidate)
	}, [titleValidate, descValidate])

	const titleHandler = (e) => {
		setTitleTouched(true)

		if (e.target.value.trim() === '') {
		setTitleValidate(false)
		} else {
		setTitleValidate(true)
		
		}
		setTitle(e.target.value)
	}

	const descHandler = (e) => {
		setDescTouched(true)

		if (e.target.value.trim() === '') {
		setDescValidate(false)
		} else {
		setDescValidate(true)
		}
		setDesc(e.target.value)
	}

	const catchFileDataHandler = (e) => {
	
		  setSelectedFile(e)
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

	const titleBlurHandler = () => {
		setTitleTouched(true)
		if (title.trim() === '') {
			setTitleValidate(false)
		} else {
		  setTitleValidate(true)
		}
	}
	
	  const descBlurHandler = () => {
		setDescTouched(true)
		if (desc.trim() === '') {
			setDescValidate(false)
		} else {
		  setDescValidate(true)
		}
	  }
	
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
	
				
			}
		navigate('/news')
		window.location.reload(true)
			
	}

	
	return (<div className='edit-postManagement-container'>
	{ !title && !desc  &&     <RotatingLines className="text-center"
				strokeColor="grey"
				strokeWidth="5"
				animationDuration="1"
				width="96"
				visible={true}
		/>}
		 <form onSubmit={submitHandler} className='edit-postManagement-form'>
			<h3 >Edit Post</h3>
			<div className='edit-postManagement-group'>
				<h5>Name</h5>
				<input onChange={titleHandler} value={title} type='text' onBlur={titleBlurHandler} placeholder='Enter Topic'/>
				{validTitle && <p style={{color:"Red"}}>Name should not be Empty</p>}
			</div>

			<div className='edit-postManagement-group'>
				<h5>Description</h5>
				<input onChange={descHandler}  value={desc} type='textarea' onBlur={descBlurHandler} rows='4' placeholder='Enter Description'/>
				{validDesc && <p style={{color:"Red"}}>Description should not be empty</p>}
			</div>

			<div className='edit-postManagement-group edit-postManagement-group-image'>
				  <h5>Add Image</h5>
				  <ImageUploader onInput={catchFileDataHandler} value={selectedFile} image={image} />

			</div>
			<button type='submit' className='btn' color='primary' disabled={!formValidate}>Update</button>
		</form>
</div>)
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

