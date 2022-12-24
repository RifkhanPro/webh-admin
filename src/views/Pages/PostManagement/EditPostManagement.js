/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'

const EditPostManagement = () => {
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

	 useEffect(() => {
		const sendRequest = async () => {
		 try {
			 const response = await fetch(`http://localhost:8070/postManagement/${id}`)
	
			 const responseData = await response.json()
	
			 console.log(responseData)
	
			 setTitle(responseData.name)
			 setDesc(responseData.description)

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
				const response = await fetch(`http://localhost:8070/postManagement/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						name:topic,
						desc
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

			navigate('/postManagements')
	  }

	return (<Card>
			<form onSubmit={submitHandler}>
				<CardGroup className='group'>
					<CardTitle>Name</CardTitle>
					<Input onChange={titleHandler} value={topic} type='text'/>
				</CardGroup>
	
				<CardGroup className='group'>
					<CardTitle>Description</CardTitle>
					<Input onChange={descHandler}  value={desc} type='text'/>
				</CardGroup>
				
				<Button type='submit' className='btn'>Update</Button>
			</form>
	</Card>)
}

export default EditPostManagement