/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddTopicPost() {

  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const [category, setCategory] = useState()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState()

  const nameHandler = (e) => {
    setName(e.target.value)
  }
  const descHandler = (e) => {
    setDesc(e.target.value)

  }
  const catchFileDataHandler = (e) => {
    setSelectedFile(e)

	}

  const categoryHandler = (e) => {
    setCategory(e.target.value)

  }

  const submitHandler =  async (e) => {
    e.preventDefault()
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
			const response = await fetch('http://localhost:8070/topicPost', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
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
      setName('')
      setCategory('')
		} catch (err) { 
      //
    }

    navigate('/topicPosts')
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
          <CardGroup className='group'>
              <CardTitle>Category</CardTitle>
              <Input onChange={categoryHandler} value={category} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Name</CardTitle>
              <Input onChange={nameHandler} value={name} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Add Skill Image</CardTitle>
              <ImageUploader onInput={catchFileDataHandler}/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Description</CardTitle>
              <Input onChange={descHandler}  value={desc} type='text'/>
          </CardGroup>

          <Button type='submit' className='btn'>Submit</Button>
      </form>
    </Card>
  )
}

export default AddTopicPost
