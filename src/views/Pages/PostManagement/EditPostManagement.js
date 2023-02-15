/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from 'react'
import './EditPostManagement.css'
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
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'

const EditPostManagement = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	const [topic, setTitle] = useState()
	const [desc, setDesc] = useState()
	const [image, setImage] = useState('')
	const [selectedFile, setSelectedFile] = useState()
	const [topicValidate, setTopicValidate] = useState(true)
	const [descValidate, setDescValidate] = useState(true)
	const [imageValidate, setImageValidate] = useState(true)

	const [nameTouched, setNameTouched] = useState(false)
	const [descTouched, setDescTouched] = useState(false)
	const [imageTouched, setImageTouched] = useState(false)

	const [formValidate, setFormValidate] = useState(false)

	const validName = !topicValidate && nameTouched
	const validDesc = !descValidate && descTouched
	const validImage = !imageValidate && imageTouched

	useEffect(() => {
		setFormValidate(topicValidate && descValidate)
	}, [topicValidate, descValidate])

	const topicHandler = e => {
		setNameTouched(true)

		if (e.target.value.trim() === '') {
			setTopicValidate(false)
		} else {
			setTopicValidate(true)
		}
		setTitle(e.target.value)
	}
	const descHandler = e => {
		setDescTouched(true)

		if (e.target.value.trim() === '') {
			setDescValidate(false)
		} else {
			setDescValidate(true)
		}
		setDesc(e.target.value)
	}
	const nameBlurHandler = () => {
		setNameTouched(true)
		if (topic.trim() === '') {
			setTopicValidate(false)
		} else {
			setTopicValidate(true)
		}
	}

	const descBlurHandler = () => {
		setDescTouched(true)
		if (desc.trim() === '') {
			setDescValidate(false)
		} else {
			setDescValidate(true)
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
					`http://44.202.187.100:8070/postManagement/posts/${id}`
				)

				const responseData = await response.json()

				setTitle(responseData.post.name)
				setDesc(responseData.post.description)
				setImage(responseData.post.image)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [id])

	//  function
	const submitHandler = async e => {
		e.preventDefault()

		setNameTouched(true)
		setDescTouched(true)
		setImageTouched(true)

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
					`http://44.202.187.100:8070/postManagement/updatePost/${id}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							name: topic,
							description: desc,
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

			navigate('/postManagements')
			window.location.reload(true)
		} else {
			try {
				const response = await fetch(
					`http://44.202.187.100:8070/postManagement/updatePost/${id}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							name: topic,
							description: desc,
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

			navigate('/postManagements')
			window.location.reload(true)
		}
	}

	return (
		<div className="edit-postManagement-container">
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
			<form onSubmit={submitHandler} className="edit-postManagement-form">
				<h3>Edit Post</h3>
				<div className="edit-postManagement-group">
					<h5>Name</h5>
					<input
						onChange={topicHandler}
						value={topic}
						onBlur={nameBlurHandler}
						type="text"
						placeholder="Enter Name"
					/>
					{validName && (
						<p style={{ color: 'Red' }}>Name should not be Empty</p>
					)}
				</div>

				<div className="edit-postManagement-group">
					<h5>Description</h5>
					<input
						onChange={descHandler}
						value={desc}
						onBlur={descBlurHandler}
						type="textarea"
						rows="4"
						placeholder="Enter Description"
					/>
					{validDesc && (
						<p style={{ color: 'Red' }}>Description should not be empty</p>
					)}
				</div>

				<div className="edit-postManagement-group edit-postManagement-group-image">
					<h5>Add Skill Image</h5>
					<ImageUploader onInput={catchFileDataHandler} image={image} />
					{validImage && (
						<p style={{ color: 'Red' }}>Image should be selected</p>
					)}
				</div>
				<button
					type="submit"
					className="btn"
					color="primary"
					disabled={!formValidate}>
					Update
				</button>
			</form>
		</div>
	)
}

export default EditPostManagement
