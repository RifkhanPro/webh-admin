/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'

const EditTopicPost = () => {
    const navigate = useNavigate()
	const {id} = useParams()
	const [name, setName] = useState()
	const [desc, setDesc] = useState()
	const [category, setCategory] = useState()

	const nameHandler = (e) => {
		setName(e.target.value)
	  }
	  const descHandler = (e) => {
		setDesc(e.target.value)
	  }
	
	  const categoryHandler = (e) => {
		setCategory(e.target.value)
	  }

	 useEffect(() => {
		const sendRequest = async () => {
		 try {
			 const response = await fetch(`http://localhost:8070/topicPost/${id}/viewPost`)
	
			 const responseData = await response.json()
	
			 console.log(responseData)
	
			 setName(responseData.name)
			 setDesc(responseData.desc)
			 setCategory(responseData.category)

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
				const response = await fetch(`http://localhost:8070/topicPost/${id}/update`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						category,
						name,
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

			navigate('/topicPosts')
	  }

	return (<Card>
			<form onSubmit={submitHandler}>
				<CardGroup className='group'>
				<CardTitle>Category</CardTitle>
				<Input onChange={categoryHandler} value={category} type='text'/>
			</CardGroup>

			<CardGroup className='group'>
				<CardTitle>Name</CardTitle>
				<Input onChange={nameHandler} value={name} type='text'/>
			</CardGroup>

			<CardGroup className='group'>
				<CardTitle>Description</CardTitle>
				<Input onChange={descHandler}  value={desc} type='text'/>
			</CardGroup>

				
				<Button type='submit' className='btn'>Update</Button>
			</form>
	</Card>)
}

export default EditTopicPost