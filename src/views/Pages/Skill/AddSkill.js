/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, {  useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddSkill() {

  const [topic, setTitle] = useState('')
  const [content, setDesc] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [topicValidate, setTopicValidate] = useState(true)
  const [contentValidate, setContentValidate] = useState(true)
  const [imageValidate, setImageValidate] = useState(true)
  const navigate = useNavigate()
 

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

    if (selectedFile === undefined) {
      setImageValidate(false)
      return
    }

    if (content.trim() === '') {
      setContentValidate(false)
      return
    }

    console.log('validate')
 
    let imageUrl

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
    
    try {
			const response = await fetch('http://68.178.164.166:8070/skill', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					title:topic,
					desc:content,
          imageUrl
				})
			})

			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(responseData.message)
			}


      setDesc('')
      setTitle('')
		} catch (err) { 
      //
    }

    navigate('/skills')
  }

  return (
    <Card>
      <form onSubmit={submitHandler} className='form-control col-12'>
          <CardGroup className='group'>
              <CardTitle>Title</CardTitle>
              <Input onChange={titleHandler} value={topic} type='text' placeholder='Enter Title'/>
              {!topicValidate && <p style={{color:"Red"}}>Topic should not be Empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Description</CardTitle>
              <Input onChange={descHandler}  value={content} type='textarea'  placeholder='Enter Description' row='4'/>
              {!contentValidate && <p style={{color:"Red"}}>Description should not be empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Add Skill Image</CardTitle>
          </CardGroup>
          <div>
          <ImageUploader onInput={catchFileDataHandler}/>
              {!imageValidate && <p style={{color:"Red"}}>image should be selected</p>}
          </div>
          <Button type='submit' className='btn' >Submit</Button>
      </form>
    </Card>
  )
}

export default AddSkill
