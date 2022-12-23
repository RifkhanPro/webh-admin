/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, Col, Label, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'

function AddTopic() {

  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const [category, setCategory] = useState()
  const navigate = useNavigate()

  const nameHandler = (e) => {
    setName(e.target.value)
  }
  const descHandler = (e) => {
    setDesc(e.target.value)

  }
  const catchFileDataHandler = (e) => {
		console.log(e.pickedFile)
	}

  const categoryHandler = (e) => {
    setCategory(e.target.value)

  }

  const submitHandler =  async (e) => {
    e.preventDefault()

    try {
			const response = await fetch('http://localhost:8070/topicPost', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
          category,
          name,
					desc
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
      <form onSubmit={submitHandler} className='form-control'>
          <CardGroup className='group'>
              <Label>Category</Label>
              <Input onChange={categoryHandler} value={category} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <Label>Name</Label>
              <Input onChange={nameHandler} value={name} type='text'/>
          </CardGroup>


          <CardGroup className='group'>
              <Label>Description</Label>
              <Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
          </CardGroup>

          <CardGroup className='group'>
              <Label>Add Skill Image</Label>
              <ImageUploader onInput={catchFileDataHandler}/>
          </CardGroup>
          
          <Button type='submit' className='me-1' color='primary'>Submit</Button>
      </form>
    </Card>
  )
}

export default AddTopic
