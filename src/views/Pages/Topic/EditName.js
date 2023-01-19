/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState  } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { useNavigate, useParams} from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'

const EditName = () => {
    const navigate = useNavigate()
	const {name, category} = useParams()
    const [newName, setNewName] = useState()

	const titleHandler = (e) => {
		setNewName(e.target.value)
	}

	
	const submitHandler =  async (e) => {
		e.preventDefault()
	
		try {
				const response = await fetch('http://localhost:8070/topicPost/changeName', {method:"PUT", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
						category,
                        name,
                        newName
					})
				})
	
				const responseData = await response.json()
                console.log(responseData)
				if (!response.ok) {
					throw new Error(responseData.message)
				}
	
	
			} catch (err) { 
		  			//
			}

			navigate('/topics')
	  }

	return (
	
		<>
			{ !name &&  <RotatingLines className="text-center"
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="1"
                  width="96"
                  visible={true}
            />}

		{name && <Card>
					<form onSubmit={submitHandler}>
						<CardGroup className='group'>
							<CardTitle>Category</CardTitle>
							<Input  value={category} type='text' disabled/>
						</CardGroup>

						<CardGroup className='group'>
							<CardTitle>Name</CardTitle>
							<Input  value={name} type='text' disabled/>
						</CardGroup>

						<CardGroup className='group'>
							<CardTitle>New Name</CardTitle>
							<Input onChange={titleHandler} value={newName} type='text'/>
						</CardGroup>
			
						<Button type='submit' className='btn'>Update</Button>
					</form>
			</Card>}
		</>
		)
}

export default EditName