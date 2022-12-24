/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'

function AddScoreBox() {

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
			const response = await fetch('http://localhost:8070/scoreBox', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					title:topic,
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

    navigate('/scoreBoxes')
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
          <CardGroup className='group'>
              <CardTitle>Title</CardTitle>
              <Input onChange={titleHandler} value={topic} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Add ScoreBox Image</CardTitle>
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

export default AddScoreBox