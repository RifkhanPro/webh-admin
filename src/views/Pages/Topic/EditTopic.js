/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
import './AddSkill.css'
import { useNavigate, useParams } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'

const EditTopic = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [topic, setTopic] = useState('')
	const [valid, setValid] = useState(true)

	const titleHandler = e => {
		setTopic(e.target.value)
		console.log(e.target.value)
		if (e.target.value.trim().length === 0) {
			console.log('false')
			setValid(false)
			return
		}
		setValid(true)
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://localhost:8070/topic/${id}`)

				const responseData = await response.json()

				setTopic(responseData.category)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [id])

	const submitHandler = async e => {
		e.preventDefault()

		if (!valid) {
			return
		}
		try {
			const response = await fetch(`http://localhost:8070/topic/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					category: topic
				})
			})

			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(responseData.message)
			}

			setTopic('')
		} catch (err) {
			//
		}

		navigate('/topics')
	}

	return (
		<>
			<div className="edit-topic-container">
				<div className="edit-topic-card">
					<form className="edit-topic-card-form" onSubmit={submitHandler}>
						<div className="group">
							<h2>Category</h2>
							<input onChange={titleHandler} value={topic} type="text" />
							{!valid && (
								<p className="input-invalid-feedback">It should not be empty</p>
							)}
						</div>

						<button type="submit" className="btn" disabled={!valid}>
							Update
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default EditTopic
