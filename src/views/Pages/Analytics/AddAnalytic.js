/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, Col, Label, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'

function AddAnalytic() {

  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
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
			const response = await fetch('http://localhost:8070/analytics', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
          title,
					desc
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
      <Col className='col-12'>
        <form onSubmit={submitHandler} className='form-control'>
            <CardGroup className='group'>
                <Label>Title</Label>
                <Input onChange={titleHandler} value={title} type='text'/>
            </CardGroup>

            <CardGroup className='group'>
                <Label>Description</Label>
                <Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
            </CardGroup>
            
            <CardGroup className='group'>
                <Label>Add Analytic Image</Label>
                <ImageUploader onInput={catchFileDataHandler}/>
            </CardGroup>

            <Button type='submit' className='me-1' color='primary'>Submit</Button>
        </form>
      </Col>
    </Card>
  )
}

export default AddAnalytic
