/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddAnalytic() {

  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState()

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
			const response = await fetch('http://localhost:8070/analytics', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
          title,
					desc,
          image
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

    navigate('/analytics')
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
         

          <CardGroup className='group'>
              <CardTitle>Title</CardTitle>
              <Input onChange={titleHandler} value={title} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Add Analytic Image</CardTitle>
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

export default AddAnalytic
