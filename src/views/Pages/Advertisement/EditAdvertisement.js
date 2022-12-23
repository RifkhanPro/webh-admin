/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, Col, Label, Input } from 'reactstrap'
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

				<Button type='submit' className='me-1' color='primary'>Update</Button>
			</form>
		</Col>
	</Card>)
}

export default EditAdvertisement