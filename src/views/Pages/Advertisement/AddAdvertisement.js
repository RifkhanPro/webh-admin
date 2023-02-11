/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import './AddPostManagement.css'
function AddAdvertisement() {

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [expiry, setExpiry] = useState('')
  const [selectedFile, setSelectedFile] = useState()

  const [nameValidate, setNameValidate] = useState(false)
  const [descValidate, setDescValidate] = useState(false)
  const [expiryValidate, setExpiryValidate] = useState(false)
  const [imageValidate, setImageValidate] = useState(false)

  const [nameTouched, setNameTouched] = useState(false)
  const [expiryTouched, setExpiryTouched] = useState(false)
  const [descTouched, setDescTouched] = useState(false)
  const [imageTouched, setImageTouched] = useState(false)

  const [formValidate, setFormValidate] = useState(false)

  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate()

  const validName = !nameValidate && nameTouched
  const validDesc = !descValidate && descTouched
  const validExpiry = !expiryValidate && expiryTouched
  const validImage = !imageValidate && imageTouched


  useEffect(() => {
    setFormValidate(nameValidate && descValidate && expiryValidate && imageValidate)
 }, [nameValidate, descValidate, expiryValidate, imageValidate])

  const NameHandler = (e) => {
 
    setNameTouched(true)
    if (e.target.value.trim() === '') {
       setNameValidate(false)
    } else {
      setNameValidate(true)

    }
    setName(e.target.value)
  }

  const descHandler = (e) => {
        setDescTouched(true)
        if (e.target.value.trim() === '') {
            setDescValidate(false)
        } else {
          setDescValidate(true)

        }
        setDesc(e.target.value)
  }

  const expiryHandler = (e) => {
        setExpiryTouched(true)
        if (e.target.value.trim() === '') {
            setExpiryValidate(false)
        } else {
          setExpiryValidate(true)

        }
        setExpiry(e.target.value)
  }

  const nameBlurHandler = () => {
      setNameTouched(true)
      if (name.trim() === '') {
          setNameValidate(false)
      } else {
        setNameValidate(true)
      }
  }

  const descBlurHandler = () => {
    setDescTouched(true)
    if (desc.trim() === '') {
        setDescValidate(false)
    } else {
      setDescValidate(true)
    }
  }

  const expiryBlurHandler = () => {
    setExpiryTouched(true)
    if (expiry.trim() === '') {
        setExpiryValidate(false)
    } else {
      setExpiryValidate(true)
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
    setSpinner(true)
    
    setNameTouched(true)
    setDescTouched(true)
    setExpiryTouched(true)
    setImageTouched(true)

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
			const response = await fetch('http://44.202.187.100:8070/advertisement', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
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
    <div className='edit-postManagement-container'>
      {spinner &&    <RotatingLines className="text-center"
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="1"
                  width="96"
                  visible={true}
                />}
              
      <form onSubmit={submitHandler}  className='edit-postManagement-form'>
          <h3>Add Advertisement</h3>
          <div className='edit-postManagement-group'>
            <h5>Name</h5>
            <input onChange={NameHandler} value={name} onBlur={nameBlurHandler} type='text' placeholder='Enter Name'/>
            {validName && <p style={{color:"Red"}}>Name should not be Empty</p>}
          </div>

          <div className='edit-postManagement-group'>
            <h5>Description</h5>
            <input onChange={descHandler}  value={desc} type='textarea' onBlur={descBlurHandler} rows='4' placeholder='Enter Description'/>
            {validDesc && <p style={{color:"Red"}}>Description should not be empty</p>}
				  </div>

          <div className='edit-postManagement-group'>
            <h5>Expiry Date</h5>
            <input onChange={expiryHandler} value={expiry} onBlur={expiryBlurHandler} type='date' placeholder='Enter Name'/>
            {validExpiry && <p style={{color:"Red"}}>Expiry Date should not be empty</p>}
          </div>
         
				<div className='edit-postManagement-group edit-postManagement-group-image'>
          <h5>Add Image</h5>
					<ImageUploader onInput={catchFileDataHandler} />
					{validImage && <p style={{color:"Red"}}>Image should be selected</p>}
				</div>
				<button type='submit' className='btn' color='primary' disabled={!formValidate}>Add</button>
      </form>
    </div>
  )
}

export default AddAdvertisement
