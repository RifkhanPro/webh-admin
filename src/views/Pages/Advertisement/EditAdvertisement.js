/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'

const EditAdvertisement = () => {
    const navigate = useNavigate()
	const {id} = useParams()
	const [name, setName] = useState()
	const [desc, setDesc] = useState()
	const [expiry, setExpiry] = useState()

	const NameHandler = (e) => {
		setName(e.target.value)
	  }
	  const descHandler = (e) => {
		setDesc(e.target.value)
	  }

	  const expiryHandler = (e) => {
		setExpiry(e.target.value)
	  }

	 useEffect(() => {
		const sendRequest = async () => {
		 try {
			 const response = await fetch(`http://localhost:8070/advertisement/${id}`)
	
			 const responseData = await response.json()
	
			 console.log(responseData)
	
			 setName(responseData.name)
			 setExpiry(responseData.expiry)
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
				const response = await fetch(`http://localhost:8070/advertisement/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
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
		
			} catch (err) { 
		  			//
			}

			navigate('/advertisements')
	  }

	return (<Card>
			<form onSubmit={submitHandler}>

				<CardGroup className='group'>
					<CardTitle>Name</CardTitle>
					<Input onChange={NameHandler} value={name} type='text'/>
				</CardGroup>

				<CardGroup className='group'>
					<CardTitle>Description</CardTitle>
					<Input onChange={descHandler}  value={desc} type='text'/>
				</CardGroup>

				<CardGroup className='group'>
					<CardTitle>Expiry Date</CardTitle>
					<Input onChange={expiryHandler}  value={expiry} type='date'/>
				</CardGroup>

				<Button type='submit' className='btn'>Update</Button>
			</form>
	</Card>)
}

export default EditAdvertisement