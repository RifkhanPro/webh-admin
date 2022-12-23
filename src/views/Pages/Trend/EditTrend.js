/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect  } from 'react'
// import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, Col, Label, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'

const EditTrend = () => {
    const navigate = useNavigate()
	const {id} = useParams()
	const [title, setTitle] = useState()
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
			 const response = await fetch(`http://localhost:8070/trend/${id}`)
	
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
				const response = await fetch(`http://localhost:8070/trend/${id}`, {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						desc,
						title
					})
				})
				const responseData = await response.json()
	
				if (!response.ok) {
					throw new Error(responseData.message)
				}
	
	
		  setDesc('')
		  setTitle('')

			} catch (err) { 
		  			//
			}

			navigate('/trends')
	  }

	return (<Card>
			<Col className='col-12'>
				<form className='form-control' onSubmit={submitHandler}>
					<CardGroup className='group'>
						<Label>Title</Label>
						<Input onChange={titleHandler} value={title} type='text'/>
					</CardGroup>

					<CardGroup className='group'>
						<Label>Description</Label>
						<Input onChange={descHandler}  value={desc} type='textarea' rows='5'/>
					</CardGroup>

					<Button type='submit' color='primary' className='me-1'>Update</Button>
				</form>
			</Col>
	</Card>)
}

export default EditTrend