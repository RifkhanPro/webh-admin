/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useEffect, useState } from 'react'
import './AddPostManagement.css'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddSkill() {

  const navigate = useNavigate()
  const [topic, setTitle] = useState('')
  const [content, setDesc] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [topicValidate, setTopicValidate] = useState(false)
  const [contentValidate, setContentValidate] = useState(false)
  const [imageValidate, setImageValidate] = useState(false)


  const [topicTouched, setTopicTouched] = useState(false)
  const [descTouched, setDescTouched] = useState(false)
  const [formValidate, setFormValidate] = useState(false)
  

  const validTopic = !topicValidate && topicTouched
  const validDesc = !contentValidate && descTouched

  useEffect(() => {
    setFormValidate(topicValidate && contentValidate && imageValidate)
 }, [topicValidate, contentValidate, imageValidate])


  const titleHandler = (e) => {
    setTopicTouched(true)
    if (e.target.value.trim() === '') {
      setTopicValidate(false)
    } else {
      setTopicValidate(true)

    }
    setTitle(e.target.value)

  }

  const descHandler = (e) => {
     setDescTouched(true)
        if (e.target.value.trim() === '') {
          setContentValidate(false)
        } else {
          setContentValidate(true)

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

  const topicBlurHandler = () => {
    setTopicTouched(true)
    if (topic.trim() === '') {
        setTopicValidate(false)
    } else {
      setTopicValidate(true)
    }
}

const descBlurHandler = () => {
  setDescTouched(true)
  if (content.trim() === '') {
    setContentValidate(false)
  } else {
    setContentValidate(true)
  }
}
  const submitHandler =  async (e) => {
    e.preventDefault()

    setTopicTouched(true)
    setDescTouched(true)

    
    if (selectedFile === undefined) {
      setImageValidate(false)
      return
    }


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
			const response = await fetch('http://localhost:8070/blog', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					name:topic,
					desc:content,
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

    navigate('/blogs')
  }

  
  return (
    <div className='edit-postManagement-container'>
      <form onSubmit={submitHandler}  className='edit-postManagement-form'>
        <h3>Add Blog</h3>

          <div className='edit-postManagement-group'>
            <h5>Name</h5>
            <input onChange={titleHandler} value={topic} onBlur={topicBlurHandler} type='text' placeholder='Enter Name'/>
            {validTopic && <p style={{color:"Red"}}>Name should not be Empty</p>}
          </div>
	
          <div className='edit-postManagement-group'>
					<h5>Description</h5>
					<input onChange={descHandler}  value={content}  onBlur={descBlurHandler} type='textarea' rows='4' placeholder='Enter Description'/>
					{validDesc && <p style={{color:"Red"}}>Description should not be empty</p>}
				</div>

         
				<div className='edit-postManagement-group edit-postManagement-group-image'>
          <h5>Add Blog Image</h5>
					<ImageUploader onInput={catchFileDataHandler} />
					{/* {!imageValidate && <p style={{color:"Red"}}>Image should be selected</p>} */}
				</div>
				<button type='submit' className='btn' color='primary' disabled={!formValidate}>Add</button>
      </form>
    </div>
  )
}

export default AddSkill
