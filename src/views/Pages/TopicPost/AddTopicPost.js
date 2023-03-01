/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useEffect, useState } from 'react'
import './AddPostManagement.css'
import {
	Button,
	Card,
	CardGroup,
	CardTitle,
	FormGroup,
	Input
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import ImageUploader from './ImageUploader'
import axios from 'axios'

function AddTopicPost() {
	const [name, setName] = useState('')
	const [desc, setDesc] = useState('')
	const [category, setCategory] = useState('')
	const navigate = useNavigate()
	const [selectedFile, setSelectedFile] = useState()
	const [nameValidate, setNameValidate] = useState(true)
	const [descValidate, setDescValidate] = useState(true)
	const [categoryValidate, setCategoryValidate] = useState(true)
	const [imageValidate, setImageValidate] = useState(true)
	const [categoryList, setCategoryList] = useState()

	const [names, setNames] = useState()

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch('https://18.205.10.114:8070/topic')

				const responseData = await response.json()

				setCategoryList(['Select Category', ...responseData])
				console.log(responseData)
				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [])

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(
					'https://18.205.10.114:8070/topic/topicNames',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							category
						})
					}
				)

				const responseData = await response.json()
				console.log(category)
				console.log(responseData)

				setNames(['Select Topic', ...responseData])

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [category])

	const categoryHandler = e => {
		setCategory(e.target.value)
	}

	const nameHandler = e => {
		setName(e.target.value)
	}

	const descHandler = e => {
		if (e.target.value.trim() === '') {
			setDescValidate(false)
		} else {
			setDescValidate(true)
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

		if (selectedFile === undefined) {
			setImageValidate(false)
			return
		}

		console.log('validate')
		// console.log(names)

		let image
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
					image = res.data.secure_url
				})
		} catch (error) {
			alert(error)
		}

		try {
			const response = await fetch('https://18.205.10.114:8070/topicPost', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					category,
					name,
					desc,
					image
				})
			})

			const responseData = await response.json()

			console.log(responseData)

			if (!response.ok) {
				throw new Error(responseData.message)
			}

			setName('')
			setCategory('')
			setDesc('')
		} catch (err) {
			//
		}

		navigate('/topicPosts')
	}

	return (
		<div className="edit-postManagement-container">
			<form onSubmit={submitHandler} className="edit-postManagement-form">
				<h3>Add Topic Post</h3>
				<div className="edit-postManagement-group">
					<h5>Category</h5>
					<select onChange={categoryHandler} className="form-control">
						{categoryList &&
							categoryList.map((option, index) => {
								return <option key={index}>{option}</option>
							})}
					</select>
					{/* <Input onChange={categoryHandler} value={category} type='text' placeholder='Enter Category'/> */}
					{!categoryValidate && (
						<p style={{ color: 'Red' }}> Category should not be Empty</p>
					)}
				</div>

				<div className="edit-postManagement-group">
					<h5>Topic</h5>
					<select onChange={nameHandler} className="form-control">
						{names &&
							names.map((option, index) => {
								return <option key={index}>{option}</option>
							})}
					</select>
					{/* <Input onChange={nameHandler} value={name} type='text' placeholder='Enter Name'/> */}
					{!nameValidate && (
						<p style={{ color: 'Red' }}> Name should not be Empty</p>
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
					<ImageUploader onInput={catchFileDataHandler} />
					{!imageValidate && (
						<p style={{ color: 'Red' }}>Image should be selected</p>
					)}
				</div>
				<button type="submit" className="btn" color="primary">
					Add
				</button>
			</form>
		</div>
	)
}

export default AddTopicPost
