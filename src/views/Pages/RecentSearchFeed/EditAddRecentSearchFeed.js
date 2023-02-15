/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
// import './AddSkill.css'
import {
	Button,
	Card,
	CardGroup,
	CardTitle,
	FormGroup,
	Input
} from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'

const EditAddRecentSearchFeed = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const [topic, setTitle] = useState()
	const [desc, setDesc] = useState()
	const [image, setImage] = useState()
	const [selectedFile, setSelectedFile] = useState()
	const [topicValidate, setTopicValidate] = useState(true)
	const [contentValidate, setContentValidate] = useState(true)
	const [imageValidate, setImageValidate] = useState(true)

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

	const catchFileDataHandler = e => {
		if (e.name === '') {
			setImageValidate(false)
		} else {
			setImageValidate(true)
			setSelectedFile(e)
		}
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(
					`http://44.202.187.100:8070/recentSearchFeed/${id}`
				)

				const responseData = await response.json()

				console.log(responseData)

				setTitle(responseData.title)
				setDesc(responseData.desc)
				setImage(responseData.image)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
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

		let imageUrl = ''

		if (selectedFile !== undefined) {
			const formData = new FormData()
			formData.append('file', selectedFile)
			formData.append('upload_preset', 'feed_images')

			try {
				await axios
					.post(
						'https://api.cloudinary.com/v1_1/movie-reservation/image/upload',
						formData
					)
					.then(res => {
						imageUrl = res.data.secure_url
					})
			} catch (error) {
				alert(error)
			}
		}

		if (imageUrl !== '') {
			try {
				const response = await fetch(
					`http://44.202.187.100:8070/recentSearchFeed/${id}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							desc,
							title: topic,
							image: imageUrl
						})
					}
				)

				const responseData = await response.json()

				console.log(responseData)

				if (!response.ok) {
					throw new Error(responseData.message)
				}

				setTitle('')
				setDesc('')
			} catch (err) {
				//
			}

			navigate('/recentSearchFeeds')
			window.location.reload(true)
		} else {
			try {
				const response = await fetch(
					`http://44.202.187.100:8070/recentSearchFeed/${id}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							desc,
							title: topic,
							image
						})
					}
				)

				const responseData = await response.json()

				console.log(responseData)

				if (!response.ok) {
					throw new Error(responseData.message)
				}

				setTitle('')
				setDesc('')
			} catch (err) {
				//
			}

			navigate('/recentSearchFeeds')
			window.location.reload(true)
		}
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
						<CardGroup className="group">
							<CardTitle>Title</CardTitle>
							<Input
								onChange={titleHandler}
								value={topic}
								type="text"
								placeholder="Enter Title"
							/>
							{!topicValidate && (
								<p style={{ color: 'Red' }}>Title should not be Empty</p>
							)}
						</CardGroup>

						<CardGroup className="group">
							<CardTitle>Description</CardTitle>
							<Input
								onChange={descHandler}
								value={desc}
								type="textarea"
								rows="5"
								className="Enter Description"
							/>
							{!contentValidate && (
								<p style={{ color: 'Red' }}>Description not be empty</p>
							)}
						</CardGroup>

						<CardGroup className="group">
							<CardTitle>AddImage</CardTitle>
						</CardGroup>
						<div>
							<ImageUploader onInput={catchFileDataHandler} image={image} />
							{!imageValidate && (
								<p style={{ color: 'Red' }}>Image should be selected</p>
							)}
						</div>
						<Button type="submit" className="me-1 mt-1" color="primary">
							Update
						</Button>
					</form>
				</Card>
			)}
		</>
	)
}

export default EditAddRecentSearchFeed
