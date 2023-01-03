/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'

const EditTopicPost = () => {
    const navigate = useNavigate()
	const {id} = useParams()
	const [name, setName] = useState()
	const [desc, setDesc] = useState()
	const [image, setImage] = useState('')
	const [category, setCategory] = useState()
	const [selectedFile, setSelectedFile] = useState()
  	const [nameValidate, setNameValidate] = useState(true)
  	const [descValidate, setDescValidate] = useState(true)
  	const [categoryValidate, setCategoryValidate] = useState(true)
  	const [imageValidate, setImageValidate] = useState(true)
	
	const categoryHandler = (e) => {
		if (e.target.value.trim() === '') {
		  setCategoryValidate(false)
		} else {
		  setCategoryValidate(true)
		  setCategory(e.target.value)
		}
	}
	
	const nameHandler = (e) => {
		if (e.target.value.trim() === '') {
		  setNameValidate(false)
		} else {
		  setNameValidate(true)
		  setName(e.target.value)
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
			 const response = await fetch(`http://68.178.164.166:8070/topicPost/${id}/viewPost`)
	
			 const responseData = await response.json()
	
			 console.log(responseData)
	
			 setName(responseData.name)
			 setDesc(responseData.desc)
			 setCategory(responseData.category)
			 setImage(responseData.image)

			 if (!response.ok()) {
			   throw new Error(responseData.message)
		   }
	
		 } catch (err) {
		 }
		} 
	
		sendRequest()
	 }, [id])

	const submitHandler =  async (e) => {
		e.preventDefault()
    
    if (category.trim() === '') {
      setCategoryValidate(false)
      return
    }
    if (name.trim() === '') {
      setNameValidate(false)
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
				const response = await fetch(`http://68.178.164.166:8070/topicPost/${id}/update`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						category,
						name,
						desc,
						image
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
		  			//
			}

			navigate('/topicPosts')
	  }

	return (
		<>
			{
			!name && !desc && !category &&     <RotatingLines className="text-center"
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="1"
					width="96"
					visible={true}
					/>
				}

		{name && desc && category &&
			<Card>
				<form onSubmit={submitHandler} className='form-control col-12'>
					<CardGroup className='group'>
					<CardTitle>Category</CardTitle>
					<Input onChange={categoryHandler} value={category} type='text' placeholder='Enter Category'/>
					{!categoryValidate && <p style={{color:"Red"}}>Category should not be Empty</p>}
				</CardGroup>

				<CardGroup className='group'>
					<CardTitle>Name</CardTitle>
					<Input onChange={nameHandler} value={name} type='text' placeholder='Enter Name'/>
					{!nameValidate && <p style={{color:"Red"}}>Name should not be Empty</p>}
				</CardGroup>

				<CardGroup className='group'>
					<CardTitle>Description</CardTitle>
					<Input onChange={descHandler}  value={desc} type='text' placeholder='Enter Description' rows='5'/>
					{!descValidate && <p style={{color:"Red"}}>Description should not be Empty</p>}
				</CardGroup>

				<CardGroup className='group'>
				<CardTitle>Add Image</CardTitle>
					
				</CardGroup>
				<div>
				<ImageUploader onInput={catchFileDataHandler} image={image}/>
					{!imageValidate && <p style={{color:"Red"}}>Image should not be Empty</p>}
				</div>
						
				<Button type='submit' className='me-1 mt-1' color='primary'>Submit</Button>
					</form>
			</Card>
		}
		</>
	
	
	)
}

export default EditTopicPost