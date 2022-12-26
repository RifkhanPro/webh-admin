/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'

const EditTopic = () => {
    const navigate = useNavigate()
	const {id} = useParams()
	const [topic, setTitle] = useState()

	const titleHandler = (e) => {
		setTitle(e.target.value)
	}

	 useEffect(() => {
		const sendRequest = async () => {
		 try {
			 const response = await fetch(`http://68.178.164.166:8070/topic/${id}`)
	
			 const responseData = await response.json()
	
			 console.log(responseData)
	
			 setTitle(responseData.category)

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
				const response = await fetch(`http://68.178.164.166:8070/topic/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						category:topic
					})
				})
	
				const responseData = await response.json()
	
		  console.log(responseData)
	
				if (!response.ok) {
					throw new Error(responseData.message)
				}
	
	
		  setTitle('')

			} catch (err) { 
		  			//
			}

			navigate('/topics')
	  }

	return (<Card>
			<form onSubmit={submitHandler}>
				<CardGroup className='group'>
					<CardTitle>Category</CardTitle>
					<Input onChange={titleHandler} value={topic} type='text'/>
				</CardGroup>
	
				<Button type='submit' className='btn'>Update</Button>
			</form>
	</Card>)
}

export default EditTopic