/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import { Button, Card, CardGroup, CardTitle, Col, Input, Label } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import ImageUploader from './ImageUploader'

const EditSkill = () => {
    const navigate = useNavigate()
	const {id} = useParams()
	const [topic, setTitle] = useState()
	const [desc, setDesc] = useState()

	const titleHandler = (e) => {
		setTitle(e.target.value)
	}
	const descHandler = (e) => {
		setDesc(e.target.value)
	}
	
	 const catchFileDataHandler = (e) => {
		console.log(e.pickedFile)
	}
	useEffect(() => {
		const sendRequest = async () => {
		 try {
			 const response = await fetch(`http://localhost:8070/skill/${id}`)
	
			 const responseData = await response.json()
	
			 console.log(responseData)
	
			 setTitle(responseData.title)
			 setDesc(responseData.desc)

			 if (!response.ok()) {
			   throw new Error(responseData.message)
		   }
	
		 } catch (err) {
		 }
		} 
	
		sendRequest()
	}, [id])

	const submitHandler =  async (e) => {
		e.preventDefault()
	
		try {
			const response = await fetch(`http://localhost:8070/skill/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					desc,
					title:topic
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
		  		console.log(err)
			}
			navigate('/skills')
	  	}
	return (<Card>
				<Col className="col-12">
					<form onSubmit={submitHandler} className="m-2">
						<CardGroup className='group col-12'>
							<Label>Title</Label>
							<Input onChange={titleHandler} value={topic} type='text'/>
						</CardGroup>
			
						<CardGroup className='group'>
							<CardTitle>Description</CardTitle>
							<Input onChange={descHandler}  value={desc} type='text'/>
						</CardGroup>
						
						<CardGroup className='group'>
            				<Label>Select Skill Image</Label>
            
           				</CardGroup>
            			<CardGroup>
            				<ImageUploader onInput={catchFileDataHandler}/>
            			</CardGroup>
						<Button type='submit' className='btn' color='primary'>Update</Button>
					</form>
				</Col>
			</Card>)
}

export default EditSkill