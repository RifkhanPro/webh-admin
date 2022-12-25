/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddNews() {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [titleValidate, setTitleValidate] = useState(true)
  const [descValidate, setDescValidate] = useState(true)
  const [imageValidate, setImageValidate] = useState(true)
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState()

  const titleHandler = (e) => {

    if (e.target.value.trim() === '') {
      setTitleValidate(false)
    } else {
      setTitleValidate(true)
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

  const submitHandler =  async (e) => {
    e.preventDefault()
    
    if (title.trim() === '') {
      setTitleValidate(false)
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
			const response = await fetch('http://localhost:8070/news', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
          title,
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

    navigate('/news')
  }

  return (
    <Card>
      <form onSubmit={submitHandler} className='form-control col-12'>
          <CardGroup className='group'>
              <CardTitle>Title</CardTitle>
              <Input onChange={titleHandler} value={title} type='text' placeholder='Enter Title'/>
              {!titleValidate && <p style={{color:"Red"}}>Title should not be Empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Description</CardTitle>
              <Input onChange={descHandler}  value={desc} type='textarea' rows='5' placeholder='Enter Description'/>
              {!descValidate && <p style={{color:"Red"}}>Description should not be Empty</p>}
          </CardGroup>

          
          <CardGroup className='group'>
              <CardTitle>Add Skill Image</CardTitle>
          </CardGroup>

          <div>
          <ImageUploader onInput={catchFileDataHandler}/>
              {!imageValidate && <p style={{color:"Red"}}>image should be selected</p>}

          </div>

          <Button type='submit' className='me-1 mt-1' color='primary'>Submit</Button>
      </form>
    </Card>
  )
}
export default AddNews
