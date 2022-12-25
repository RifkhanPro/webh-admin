/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddAdvertisement() {

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [expiry, setExpiry] = useState('')
  const [nameValidate, setNameValidate] = useState(true)
  const [descValidate, setDescValidate] = useState(true)
  const [expiryValidate, setExpiryValidate] = useState(true)
  const [imageValidate, setImageValidate] = useState(true)
  const [selectedFile, setSelectedFile] = useState()
  const navigate = useNavigate()

  const NameHandler = (e) => {
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

  const expiryHandler = (e) => {
    if (e.target.value.trim() === '') {
      setExpiryValidate(false)
    } else {
      setExpiryValidate(true)
      setExpiry(e.target.value)
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
    
    if (name.trim() === '') {
      setNameValidate(false)
      return
    }

    if (desc.trim === '') {
      setDescValidate(false)
      return
    }

    if (expiry.trim() === '') {
      setExpiryValidate(false)
      return
    }

    if (selectedFile === undefined) {
      setImageValidate(false)
      return
    }

    
    let image
    
    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("upload_preset", "feed_images")
    console.log('validate')

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
			const response = await fetch('http://localhost:8070/advertisement', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
          name,
					desc,
          expiry,
          image
				})
			})

			const responseData = await response.json()
      console.log(responseData)
			if (!response.ok) {
				throw new Error(responseData.message)
			}

      setName('')
      setDesc('')
      setExpiry('')
		} catch (err) { 
      //
    }

    navigate('/advertisements')
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
         

          <CardGroup className='group'>
              <CardTitle>Name</CardTitle>
              <Input onChange={NameHandler} value={name} type='text'/>
              {!nameValidate && <p>Name should not be Empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Description</CardTitle>
              <Input onChange={descHandler}  value={desc} type='textarea'/>
              {!descValidate && <p>Description should not be Empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Expiry Date</CardTitle>
              <Input onChange={expiryHandler}  value={expiry} type='date'/>
              {!expiryValidate && <p>Expiry Date should not be empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Add Advertisement Image</CardTitle>
              <ImageUploader onInput={catchFileDataHandler}/>
              {!imageValidate && <p>Image should be selected</p>}
          </CardGroup>

          <Button type='submit' className='btn'>Submit</Button>
      </form>
    </Card>
  )
}

export default AddAdvertisement
