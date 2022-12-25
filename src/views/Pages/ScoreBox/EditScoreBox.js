/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

const EditScoreBox = () => {
    const navigate = useNavigate()
	const {id} = useParams()
	
	const [topic, setTitle] = useState()
	const [desc, setDesc] = useState()
	const [selectedFile, setSelectedFile] = useState()
  	const [topicValidate, setTopicValidate] = useState(true)
  	const [contentValidate, setContentValidate] = useState(true)
  	const [imageValidate, setImageValidate] = useState(true)

	const titleHandler = (e) => {
	if (e.target.value.trim() === '') {
		  setTopicValidate(false)
		} else {
		  setTopicValidate(true)
		  setTitle(e.target.value)
	
		}
	}
	
	const descHandler = (e) => {   
		if (e.target.value.trim() === '') {
		  setContentValidate(false)
		} else {
		  setContentValidate(true)
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
			const response = await fetch(`http://localhost:8070/scoreBox/${id}`)
	
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
		e.preventDefault()
    
    if (topic.trim() === '') {
      setTopicValidate(false)
      return
    }

    if (desc.trim() === '') {
      setContentValidate(false)
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
		const response = await fetch(`http://localhost:8070/scoreBox/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
			desc,
			title:topic,
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

		navigate('/scoreBoxes')
	  }

	return (<Card>
			<form onSubmit={submitHandler}>
				<CardGroup className='group'>
					<CardTitle>Title</CardTitle>
					<Input onChange={titleHandler} value={topic} type='text'/>
					{!topicValidate && <p>Title should not be Empty</p>}
				</CardGroup>
	
				<CardGroup className='group'>
					<CardTitle>Description</CardTitle>
					<Input onChange={descHandler}  value={desc} type='text'/>
					{!contentValidate && <p>Description not be empty</p>}
				</CardGroup>
				
				<CardGroup className='group'>
              		<CardTitle>Add ScoreBox Image</CardTitle>
              		<ImageUploader onInput={catchFileDataHandler}/>
              		{!imageValidate && <p>Image should be selected</p>}
          		</CardGroup>

				<Button type='submit' className='btn'>Update</Button>
			</form>
	</Card>)
}

export default EditScoreBox