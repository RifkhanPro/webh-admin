/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
import {
	Button,
	Card,
	CardGroup,
	CardTitle,
	FormGroup,
	Input
} from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'

const EditSkill = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const [topic, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [topicValidate, setTopicValidate] = useState(true)
	const [contentValidate, setContentValidate] = useState(true)

	const titleHandler = e => {
		if (e.target.value.trim() === '') {
			setTopicValidate(false)
		} else {
			setTopicValidate(true)
			setTitle(e.target.value)
		}
	}

	const descHandler = e => {
		if (e.target.value.trim() === '') {
			setContentValidate(false)
		} else {
			setContentValidate(true)
			setDesc(e.target.value)
		}
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://18.205.10.114:8070/skill/${id}`)

				const responseData = await response.json()

				console.log(responseData)

				setTitle(responseData.title)
				setDesc(responseData.desc)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {
				console.log(err)
			}
		}

		sendRequest()
	}, [id])

	const submitHandler = async e => {
		e.preventDefault()
		if (topic.trim() === '') {
			setTopicValidate(false)
			return
		}

		if (desc.trim() === '') {
			setContentValidate(false)
			return
		}
		console.log('validate')

		try {
			const response = await fetch(`http://18.205.10.114:8070/skill/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					desc,
					title: topic
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
			console.log(err)
		}

		navigate('/skills')
	}

	return (
		<>
			{!topic && !desc && (
				<RotatingLines
					className="text-center"
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="1"
					width="96"
					visible={true}
				/>
			)}

			{topic && desc && (
				<Card>
					<form onSubmit={submitHandler} className="form-control col-12">
						<h3>Edit Skill</h3>
						<CardGroup className="group mt-1">
							<CardTitle>Title</CardTitle>
							<Input onChange={titleHandler} value={topic} type="text" />
							{!topicValidate && <p>Topic should not be Empty</p>}
						</CardGroup>

						<CardGroup className="group">
							<CardTitle className="mt-1">Description</CardTitle>
							<Input
								onChange={descHandler}
								value={desc}
								type="textarea"
								rows="5"
							/>
							{!contentValidate && <p>Description should not be empty</p>}
						</CardGroup>
						<Button type="submit" className="me-1 mt-2" color="primary">
							Update
						</Button>
					</form>
				</Card>
			)}
		</>
	)
}

export default EditSkill
