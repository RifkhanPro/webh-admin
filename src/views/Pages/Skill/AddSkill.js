/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, Fragment } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, Col, Input, Label, ListGroupItem } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

import ImageUploader from './ImageUploader'

function AddSkill() {

  const [topic, setTitle] = useState()
  const [content, setDesc] = useState()
  // const [files, setFiles] = useState([])
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
			const response = await fetch('http://localhost:8070/skill', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
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

    navigate('/skills')
  }

  return (
    <Card>
      <Col className="col-12">
        <h3 className='m-2'>Add Skill</h3>
        <form onSubmit={submitHandler} className="m-2">
            <CardGroup className='group col-12'>
            <Label>Title</Label>
                <Input onChange={titleHandler} value={topic} type='text'/>
            </CardGroup>

            <CardGroup className='group'>
            <Label>Description</Label>
                <Input type="textarea" onChange={descHandler}  value={content} rows='5'/>
            </CardGroup>

            <CardGroup className='group'>
            <Label>Select Skill Image</Label>
            {/* <Row>
             
            </Row> */}
            </CardGroup>
            <CardGroup>
            <ImageUploader onInput={catchFileDataHandler}/>
            </CardGroup>

            <Button type='submit' color='primary' className='btn mt-2'>Submit</Button>
        </form>
      </Col>
    </Card>
  )
}

export default AddSkill
