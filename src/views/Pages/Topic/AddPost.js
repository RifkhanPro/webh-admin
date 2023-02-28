/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
import './AddSkill.css'
import {
	Button,
	Card,
	CardGroup,
	CardTitle,
	FormGroup,
	Input
} from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { DayTimeColsSlicer } from '@fullcalendar/timegrid'

function AddPost() {
	const {} = useParams()

	const [category, setCategory] = useState()
	const [name, setName] = useState()
	const [desc, setDesc] = useState()
	const navigate = useNavigate()

	const categoryHandler = e => {
		setTitle(e.target.value)
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`https://localhost:8070/topic/${id}`)

				const responseData = await response.json()

				setCategory(responseData.category)
				setDesc()
				setName()
				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	})
	const submitHandler = async e => {
		e.preventDefault()

		try {
			const response = await fetch('https://localhost:8070/topic', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					category: topic
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
		<Card>
			<form onSubmit={submitHandler}>
				<CardGroup className="group">
					<CardTitle>Category</CardTitle>
					<Input onChange={categoryHandler} value={category} type="text" />
				</CardGroup>

				<CardGroup className="group">
					<CardTitle>Name</CardTitle>
					<Input onChange={nameHandler} value={name} type="text" />
				</CardGroup>

				<CardGroup className="group">
					<CardTitle>Add Skill Image</CardTitle>
					<ImageUploader onInput={catchFileDataHandler} />
				</CardGroup>

				<CardGroup className="group">
					<CardTitle>Description</CardTitle>
					<Input onChange={descHandler} value={desc} type="text" />
				</CardGroup>
				<Button type="submit" className="btn">
					Submit
				</Button>
			</form>
		</Card>
	)
}

export default AddPost
