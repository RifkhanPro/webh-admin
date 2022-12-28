/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddRecentSearchFeed() {

  const [topic, setTitle] = useState('')
  const [content, setDesc] = useState('')
  const navigate = useNavigate()
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

  const submitHandler =  async (e) => {
    e.preventDefault()
    
    if (topic.trim() === '') {
      setTopicValidate(false)
      return
    }
    
    if (content.trim() === '') {
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
			const response = await fetch('http://68.178.164.166:8070/recentSearchFeed', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					title:topic,
					desc:content,
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

    navigate('/recentSearchFeeds')
  }

  return (
    <Card>
      <form onSubmit={submitHandler} className='form-control col-12'>
        <h3>Add Recent Search Feed</h3>
          <CardGroup className='group mt-1'>
              <CardTitle>Title</CardTitle>
              <Input onChange={titleHandler} value={topic} type='text'placeholder='Enter Title'/>
              {!topicValidate && <p style={{color:"Red"}}>Title should not be Empty</p>}
          </CardGroup>


          <CardGroup className='group'>
              <CardTitle>Description</CardTitle>
              <Input onChange={descHandler}  value={content} type='textarea' rows='5' placeholder='Enter Description'/>
              {!contentValidate && <p style={{color:"Red"}}>Description not be empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              {!imageValidate && <p style={{color:"Red"}}>Image should be selected</p>}
          </CardGroup>
              <CardTitle>Add Image</CardTitle>
              <ImageUploader onInput={catchFileDataHandler}/>
         <Button type='submit' className='me-1 mt-1' color='primary'>Submit</Button>
      </form>
    </Card>
  )
}

export default AddRecentSearchFeed
