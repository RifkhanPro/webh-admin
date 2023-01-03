/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import ImageUploader from './ImageUploader'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

const EditPostManagement = () => {
    const navigate = useNavigate()
	const {id} = useParams()
	
	const [topic, setTitle] = useState()
	const [desc, setDesc] = useState()
	const [image, setImage] = useState("")
	const [selectedFile, setSelectedFile] = useState()
	const [topicValidate, setTopicValidate] = useState(true)
	const [descValidate, setDescValidate] = useState(true)
	const [imageValidate, setImageValidate] = useState(true)

	const topicHandler = (e) => {
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
			 const response = await fetch(`http://68.178.164.166:8070/postManagement/posts/${id}`)
	
			 const responseData = await response.json()
	
			 setTitle(responseData.post.name)
			 setDesc(responseData.post.description)
			 setImage(responseData.post.image)

			 if (!response.ok()) {
			   throw new Error(responseData.message)
		   }
	
		 } catch (err) {
		 }
		} 
	
		sendRequest()
	 }, [id])
	
	//  function 
	const submitHandler =  async (e) => {
		e.preventDefault()

    if (topic.trim() === '') {
      setTopicValidate(false)
      return
    }

    if (desc.trim() === '') {
		setDescValidate(false)
      return
    }


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
				const response = await fetch(`http://68.178.164.166:8070/postManagement/updatePost/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						name:topic,
						description:desc,
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
							//
					}

					navigate('/postManagements')
					window.location.reload(true)

			} else {
				try {
					const response = await fetch(`http://68.178.164.166:8070/postManagement/updatePost/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
							name:topic,
							description:desc,
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
								//
						}
	
						navigate('/postManagements')
						window.location.reload(true)
	
			}
			
	}
	
	
	return (<Card>
			<form onSubmit={submitHandler} className='col-12 form-control'>
				<h3>Edit Post</h3>
				<CardGroup className='group mt-1'>
					<CardTitle>Name</CardTitle>
					<Input onChange={topicHandler} value={topic} type='text' placeholder='Enter Name'/>
					{!topicValidate && <p style={{color:"Red"}}>Name should not be Empty</p>}
				</CardGroup>
	
				<CardGroup className='group'>
					<CardTitle>Description</CardTitle>
					<Input onChange={descHandler}  value={desc} type='textarea' rows='4' placeholder='Enter Description'/>
					{!descValidate && <p style={{color:"Red"}}>Description should not be empty</p>}
				</CardGroup>
				
				<CardGroup className='group'>
              <CardTitle>Add Skill Image</CardTitle>
          </CardGroup>
            <div>
              <ImageUploader onInput={catchFileDataHandler} image={ image }/>
              {!imageValidate && <p style={{color:"Red"}}>Image should be selected</p>}
            </div>
			<Button type='submit' className='me-1 mt-1' color='primary'>Update</Button>
			</form>
	</Card>)
}

export default EditPostManagement