/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, Col, Label, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'

function AddAdvertisement() {

  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const [expiry, setExpiry] = useState()
  const navigate = useNavigate()

  const NameHandler = (e) => {
    setName(e.target.value)
  }

  const descHandler = (e) => {
    setDesc(e.target.value)
  }

  const expiryHandler = (e) => {
    setExpiry(e.target.value)
  }
  const catchFileDataHandler = (e) => {
		console.log(e.pickedFile)
	}

  const submitHandler =  async (e) => {
    e.preventDefault()

    try {
			const response = await fetch('http://localhost:8070/advertisement', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
          name,
					desc,
          expiry
				})
			})

			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(responseData.message)
			}


      setDesc('')
      setName('')
      setExpiry('')
		} catch (err) { 
      //
    }

    navigate('/advertisements')
  }

  return (
    <Card>
      <Col className='col-12'>
      <form onSubmit={submitHandler} className='form-control'>
          <CardGroup className='group'>
              <Label>Name</Label>
              <Input onChange={NameHandler} value={name} type='text'/>
          </CardGroup>


          <CardGroup className='group'>
              <Label>Description</Label>
              <Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
          </CardGroup>

          <CardGroup className='group'>
              <Label>Expiry Date</Label>
              <Input onChange={expiryHandler}  value={expiry} type='date'/>
          </CardGroup>
          <CardGroup className='group'>
              <Label>Add Advertisement Image</Label>
              <ImageUploader onInput={catchFileDataHandler}/>
          </CardGroup>

          <Button type='submit' className='btn'>Submit</Button>
      </form>
      </Col>
    </Card>
  )
}

export default AddAdvertisement
