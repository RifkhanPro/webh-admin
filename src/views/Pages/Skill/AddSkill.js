/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddSkill() {

  const [topic, setTitle] = useState()
  const [content, setDesc] = useState()
  const [selectedFile, setSelectedFile] = useState()

  const navigate = useNavigate()


  const titleHandler = (e) => {
    setTitle(e.target.value)
  }
  const descHandler = (e) => {
    setDesc(e.target.value)

  }
  const catchFileDataHandler = (e) => {
    setSelectedFile(e)
	}

  const submitHandler =  async (e) => {
    e.preventDefault()
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
			const response = await fetch('http://localhost:8070/skill', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
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
      <form onSubmit={submitHandler}>
          <CardGroup className='group'>
              <CardTitle>Title</CardTitle>
              <Input onChange={titleHandler} value={topic} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Add Skill Image</CardTitle>
              <ImageUploader onInput={catchFileDataHandler}/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Description</CardTitle>
              <Input onChange={descHandler}  value={content} type='text'/>
          </CardGroup>

          <Button type='submit' className='btn'>Submit</Button>
      </form>
    </Card>
  )
}

export default AddSkill
