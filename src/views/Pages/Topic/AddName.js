/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
import './AddName.css'
import { useNavigate, useParams } from 'react-router-dom'

const AddName = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [topic, setTitle] = useState()
	const [name, setName] = useState('')
	const [nameValidate, setNameValidate] = useState(true)

	const nameHandler = (e) => {
		if (e.target.value.trim() === '') {
			setNameValidate(false)
		} else {
			setNameValidate(true)
		}
		setName(e.target.value)
	}

	// const showNamesHandler = () => {
	// 	navigate(`/topics/${id}/names`)
	// }

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://44.202.187.100:8070/topic/${id}`)

				const responseData = await response.json()

				setTitle(responseData.category)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [id])

	const submitHandler = async (e) => {
		e.preventDefault()

		if (name.trim() === '') {
			setNameValidate(false)
			return
		}

		try {
			const response = await fetch(`http://44.202.187.100:8070/topic/${id}/create`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
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

	return (
		<div className="addName-container">
			<div className="addName-card">
				<form className="addName-form " onSubmit={submitHandler}>
					<h2 className="addName-form-heading">Add Name</h2>
					<div className="group">
						<h3>Category</h3>
						<input value={topic} disabled />
					</div>

					<div className="group">
						<h4>Name</h4>
						<input onChange={nameHandler} value={name} type="text" />
						{!nameValidate && (
							<p className="input-invalid-feedback">Name Should not be empty</p>
						)}
					</div>
					<div className="btns">
						<button type="submit" className="btn" disabled={!nameValidate}>
							Add Name
						</button>
						{/* <button type='button' onClick={showNamesHandler} className='btn'>Show Names</button> */}
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddName
