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
	const [topicValidate, setTopicValidate] = useState(true)
	const [nameValidate, setNameValidate] = useState(true)

	const titleHandler = (e) => {
		if (e.target.value.trim() === '') {
		  setTopicValidate(false)
		} else {
		  setTopicValidate(true)
		  setTitle(e.target.value)
	
		}
	
	}
	const descHandler = (e) => {   
		if (e.target.value.trim() === '') {
			setNameValidate(false)
		} else {
			setNameValidate(true)
			setName(e.target.value)
		}
	
	}

	const showNamesHandler = () => {
		navigate(`/topics/${id}/names`)
	}
	
	 useEffect(() => {
		const sendRequest = async () => {
		 try {
			 const response = await fetch(`http://68.178.164.166:8070/topic/${id}`)
	
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
    
		if (topic.trim() === '') {
			setTopicValidate(false)
			return
		}
		
		if (name.trim() === '') {
			setNameValidate(false)
			return
		}
	
		try {
				const response = await fetch(`http://68.178.164.166:8070/topic/${id}/create`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
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
					{!topicValidate && <p>Category should not be Empty</p>}
				</CardGroup>
	
				<CardGroup className='group'>
					<CardTitle>Name</CardTitle>
					<Input onChange={descHandler} value={name} type='text'/>
					{!nameValidate && <p>Name Should not be empty</p>}
				</CardGroup>
				<div className='btns'>
					<Button type='submit' className='btn'>Add Name</Button>
					<Button type='button' onClick={showNamesHandler} className='btn'>Show Names</Button>
				</div>
			</form>
	</Card>)
}

export default AddName