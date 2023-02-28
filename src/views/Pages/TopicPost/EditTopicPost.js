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
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'

const EditTopicPost = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [name, setName] = useState()
	const [desc, setDesc] = useState()
	const [image, setImage] = useState('')
	const [category, setCategory] = useState()
	const [selectedFile, setSelectedFile] = useState()
	const [nameValidate, setNameValidate] = useState(true)
	const [descValidate, setDescValidate] = useState(true)
	const [categoryValidate, setCategoryValidate] = useState(true)
	const [imageValidate, setImageValidate] = useState(true)

	const categoryHandler = e => {
		if (e.target.value.trim() === '') {
			setCategoryValidate(false)
		} else {
			setCategoryValidate(true)
		}
		setCategory(e.target.value)
	}

	const nameHandler = e => {
		if (e.target.value.trim() === '') {
			setNameValidate(false)
		} else {
			setNameValidate(true)
		}
		setName(e.target.value)
	}

	const descHandler = e => {
		if (e.target.value.trim() === '') {
			setDescValidate(false)
		} else {
			setDescValidate(true)
		}
		setDesc(e.target.value)
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
					`https://localhost:8070/topicPost/${id}/viewPost`
				)

				const responseData = await response.json()

				console.log(responseData)

				setName(responseData.name)
				setDesc(responseData.desc)
				setCategory(responseData.category)
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

		if (category.trim() === '') {
			setCategoryValidate(false)
			return
		}
		if (name.trim() === '') {
			setNameValidate(false)
			return
		}

		if (desc.trim() === '') {
			setDescValidate(false)
			return
		}

		let imageUrl = ''

		console.log('validate')

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
					`https://localhost:8070/topicPost/${id}/update`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							category,
							name,
							desc,
							image: imageUrl
						})
					}
				)

				const responseData = await response.json()

				console.log(responseData)

				if (!response.ok) {
					throw new Error(responseData.message)
				}
			} catch (err) {
				//
			}

			navigate('/topicPosts')
		} else {
			try {
				const response = await fetch(
					`https://localhost:8070/topicPost/${id}/update`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							category,
							name,
							desc,
							image
						})
					}
				)

				const responseData = await response.json()

				console.log(responseData)

				if (!response.ok) {
					throw new Error(responseData.message)
				}
			} catch (err) {
				//
			}

			navigate('/topicPosts')
		}
	}

	return (
		<div className="edit-postManagement-container">
			{!name && !desc && !category && (
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
				<h3>Edit TopicPost</h3>
				<div className="edit-postManagement-group">
					<h5>Category</h5>
					<input
						onChange={categoryHandler}
						disabled
						value={category}
						type="text"
						placeholder="Enter Category"
					/>
					{!categoryValidate && (
						<p style={{ color: 'Red' }}>Category should not be Empty</p>
					)}
				</div>

				<div className="edit-postManagement-group">
					<h5>Name</h5>
					<input
						onChange={nameHandler}
						disabled
						value={name}
						type="text"
						placeholder="Enter Name"
					/>
					{!nameValidate && (
						<p style={{ color: 'Red' }}>Name should not be Empty</p>
					)}
				</div>

				<div className="edit-postManagement-group">
					<h5>Description</h5>
					<input
						onChange={descHandler}
						value={desc}
						type="textarea"
						rows="4"
						placeholder="Enter Description"
					/>
					{!descValidate && (
						<p style={{ color: 'Red' }}>Description should not be empty</p>
					)}
				</div>

				<div className="edit-postManagement-group edit-postManagement-group-image">
					<h5>Add Image</h5>
					<ImageUploader onInput={catchFileDataHandler} image={image} />
					{!imageValidate && (
						<p style={{ color: 'Red' }}>Image should be selected</p>
					)}
				</div>
				<button type="submit" className="btn" color="primary">
					Update
				</button>
			</form>
		</div>
	)
}

export default EditTopicPost
