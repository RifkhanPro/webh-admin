/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useEffect, useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddTopicPost() {

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState()
  const [nameValidate, setNameValidate] = useState(true)
  const [descValidate, setDescValidate] = useState(true)
  const [categoryValidate, setCategoryValidate] = useState(true)
  const [imageValidate, setImageValidate] = useState(true)
  const [categoryList, setCategoryList] = useState()

  const [names, setNames] = useState()

      useEffect(() => {
          const sendRequest = async () => {
            try {
                const response = await fetch('http://68.178.164.166:8070/topic')

                const responseData = await response.json()

                setCategoryList(responseData)
                console.log(responseData)
                if (!response.ok()) {
                  throw new Error(responseData.message)
                }

            } catch (err) {
             
            }
        } 

        sendRequest()
    }, [])

      useEffect(() => {
        const sendRequest = async () => {
          try {
              const response = await fetch('http://68.178.164.166:8070/topic/topicNames', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
                category
              })
            })
    
              const responseData = await response.json()
              console.log(category)
              console.log(responseData)
    
              setNames(responseData)
    
              if (!response.ok()) {
                throw new Error(responseData.message)
            }
    
          } catch (err) {
    
          }
        } 
  
        sendRequest()
      }, [category])
   

  const categoryHandler = (e) => {
      setCategory(e.target.value)
  }

  const nameHandler = (e) => {
      setName(e.target.value)
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
    
    if (category.trim() === '') {
      setCategoryValidate(false)
      return
    }
    if (name.trim() === '') {
      setNameValidate(false)
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
    // console.log(names)

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
			const response = await fetch('http://68.178.164.166:8070/topicPost', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
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


      setName('')
      setCategory('')
      setDesc('')
		} catch (err) { 
      //
    }

    navigate('/topicPosts')
  }

  return (
    <Card>
      <form onSubmit={submitHandler} className='form-control col-12'>
        <h3>Add Topic Post</h3>
          <CardGroup className='group'>
              <CardTitle className='mt-1'>Category</CardTitle>
              <select onChange={categoryHandler} className="form-control">
                {categoryList && categoryList.map((option, index) => {
                    return <option key={index} >
                        {option}
                    </option>
                })}
              </select>
              {/* <Input onChange={categoryHandler} value={category} type='text' placeholder='Enter Category'/> */}
              {!categoryValidate && <p style={{color:"Red"}}> Category should not be Empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Topic</CardTitle>
              <select onChange={nameHandler}  className="form-control">
                {names && names.map((option, index) => {
                    return <option key={index} >
                        {option}
                    </option>
                })}
              </select>
              {/* <Input onChange={nameHandler} value={name} type='text' placeholder='Enter Name'/> */}
              {!nameValidate && <p style={{color:"Red"}}> Name should not be Empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Description</CardTitle>
              <Input onChange={descHandler}  value={desc} type='textarea' placeholder='Enter Description' rows='4'/>
              {!descValidate && <p style={{color:"Red"}}>Description should not be Empty</p>}
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Add Image</CardTitle>
          </CardGroup>
          <div>
          <ImageUploader onInput={catchFileDataHandler}/>
              {!imageValidate && <p style={{color:"Red"}}>Image should not be Empty</p>}
          </div>

          <Button type='submit' className='me-1 mt-1' color='primary'>Submit</Button>
      </form>
    </Card>
  )
}

export default AddTopicPost
