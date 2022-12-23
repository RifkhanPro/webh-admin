/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, Input, Col, Label } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'

function AddSkill() {

  const [topic, setTitle] = useState()
  const [content, setDesc] = useState()

  const navigate = useNavigate()

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }
  const descHandler = (e) => {
    setDesc(e.target.value)

  }
  const catchFileDataHandler = (e) => {
		console.log(e.pickedFile)
	}

  const submitHandler =  async (e) => {
    e.preventDefault()

    try {
			const response = await fetch('http://localhost:8070/blog', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					name:topic,
					desc:content
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

    navigate('/blogs')
  }

  return (
    <Card>
      <Col className="col-12">
        <form onSubmit={submitHandler} className="m-2">
            <CardGroup className='group'>
                <Label>Name</Label>
                <Input onChange={titleHandler} value={topic} type='text'/>
            </CardGroup>

            <CardGroup className='group'>
                <Label>Description</Label>
                <Input onChange={descHandler}  value={content} type='textarea' rows='5'/>
            </CardGroup>

            <CardGroup className='group'>
                <Label>Add Blog Image</Label>
                <ImageUploader onInput={catchFileDataHandler}/>
            </CardGroup>

            <Button type='submit' className='me-1' color='primary'>Submit</Button>
        </form>
      </Col>
    </Card>
  )
}

export default AddSkill
