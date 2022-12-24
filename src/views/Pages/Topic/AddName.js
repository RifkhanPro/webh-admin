/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'

const AddName = () => {
    const navigate = useNavigate()
	const {id} = useParams()
	const [topic, setTitle] = useState()
	const [name, setName] = useState()

	const titleHandler = (e) => {
		setTitle(e.target.value)
	}

	const nameHandler = (e) => {
		setName(e.target.value)
	}

	const showNamesHandler = () => {
		navigate(`/topics/${id}/names`)
	}
	
	 useEffect(() => {
		const sendRequest = async () => {
		 try {
			 const response = await fetch(`http://localhost:8070/topic/${id}`)
	
			 const responseData = await response.json()
	
	
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
				const response = await fetch(`http://localhost:8070/topic/${id}/create`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						name
					})
				})
	
				const responseData = await response.json()
	
				if (!response.ok) {
					throw new Error(responseData.message)
				}
	
	
		  setName('')

			} catch (err) { 
		  			//
			}

			navigate(`/topics/${id}`)
	  }

	return (<Card>
			<form onSubmit={submitHandler}>
				<CardTitle>Add Name</CardTitle>
				<CardGroup className='group'>
					<CardTitle>Category</CardTitle>
					<Input onChange={titleHandler} value={topic} type='text' disabled/>
				</CardGroup>
	
				<CardGroup className='group'>
					<CardTitle>Name</CardTitle>
					<Input onChange={nameHandler} value={name} type='text'/>
				</CardGroup>
				<div className='btns'>
					<Button type='submit' className='btn'>Add Name</Button>
					<Button type='button' onClick={showNamesHandler} className='btn'>Show Names</Button>
				</div>
			</form>
	</Card>)
}

export default AddName