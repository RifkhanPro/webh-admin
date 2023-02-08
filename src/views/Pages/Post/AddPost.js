/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import { React, useState } from "react"
import { Button, Card, CardGroup, CardTitle, FormGroup, Input, Row, Col, Label, InputGroup} from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import './AddPostManagement.css'
import { RotatingLines } from 'react-loader-spinner'

function AddPost() {
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [nameValidate, setNameValidate] = useState(false)
  const [descriptionValidate, setDescValidate] = useState(false)
  const [imageValidate, setImageValidate] = useState(false)
  const navigate = useNavigate()

  const [nameTouched, setNameTouched] = useState(false)
  const [descTouched, setDescTouched] = useState(false)
  const [imageTouched, setImageTouched] = useState(false)

  const [formValidate, setFormValidate] = useState(false)
  const [spinner, setSpinner] = useState(false)

  const validName = !nameValidate && nameTouched
  const validDesc = !descriptionValidate && descTouched
  const validImage = !imageValidate && imageTouched

  useEffect(() => {
    setFormValidate(nameValidate && descriptionValidate  && imageValidate)
 }, [nameValidate, descriptionValidate, imageValidate])

  const nameHandler = (e) => {
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
    setDescription(e.target.value)
  }
  const catchFileDataHandler = (e) => {
   
    if (e.name === '') {
      setImageValidate(false)
    } else {
      setImageValidate(true)
      setSelectedFile(e)
    }
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
    if (description.trim() === '') {
        setDescValidate(false)
    } else {
      setDescValidate(true)
    }
  }

  const submitHandler = async (e) => {

    e.preventDefault()
    setSpinner(true)
    setNameTouched(true)
    setDescTouched(true)
    setImageTouched(true)

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
      const response = await fetch('http://44.202.187.100:8070/postManagement/create', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
          name,
          description,
          image
        })
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      }


      setName('')
      setDescription('')
    } catch (err) { 
      //
    }

  navigate('/postManagements')
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
            <input onChange={nameHandler} value={name} onBlur={nameBlurHandler} type='text'/>
            {validName && <p style={{color:"Red"}}>Name should not be Empty</p>}
          </div>

          <div className='edit-postManagement-group'>
            <h5>Description</h5>
            <input onChange={descHandler}  value={description} onBlur={descBlurHandler} type='textarea' rows='5'/>
            {validDesc && <p style={{color:"Red"}}>Description should not be empty</p>}
				  </div>

				<div className='edit-postManagement-group edit-postManagement-group-image'>
          <h5>Add Image</h5>
					<ImageUploader onInput={catchFileDataHandler} />
					{validImage && <p style={{color:"Red"}}>Image should be selected</p>}
				</div>
				<button type='submit' className='btn' color='primary' disabled={!formValidate}>Submit</button>
      </form>
    </div>
  )
}

export default AddPost

