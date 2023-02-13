/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
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
import ImageUploader from '../TopicPost/ImageUploader'
import axios from 'axios'

function AddTrend() {
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [titleValidate, setTitleValidate] = useState(true)
	const [descValidate, setDescValidate] = useState(true)
	const [imageValidate, setImageValidate] = useState(true)
	const navigate = useNavigate()
	const [selectedFile, setSelectedFile] = useState()

	// const [nameTouched, setNameTouched] = useState(false)
	// const [descTouched, setDescTouched] = useState(false)
	// const [imageTouched, setImageTouched] = useState(false)

	// const [formValidate, setFormValidate] = useState(false)

	// const [spinner, setSpinner] = useState(false)

	// const validName = !titleValidate && nameTouched
	// const validDesc = !descValidate && descTouched
	// const validImage = !imageValidate && imageTouched

	//   useEffect(() => {
	//     setFormValidate(nameValidate && descValidate && expiryValidate && imageValidate)
	//  }, [nameValidate, descValidate, expiryValidate, imageValidate])

	const titleHandler = e => {
		if (e.target.value.trim() === '') {
			setTitleValidate(false)
		} else {
			setTitleValidate(true)
		}
		setTitle(e.target.value)
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

	const submitHandler = async e => {
		e.preventDefault()

		if (title.trim() === '') {
			setTitleValidate(false)
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
			const response = await fetch('http://localhost:8070/trend', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title,
					desc,
					image
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

	return (
		<div className="edit-postManagement-container">
			<form onSubmit={submitHandler} className="edit-postManagement-form">
				<h3>Add Trend</h3>
				<div className="edit-postManagement-group">
					<h5>Title</h5>
					<input
						onChange={titleHandler}
						value={title}
						type="text"
						placeholder="Enter title"
					/>
					{!titleValidate && (
						<p style={{ color: 'Red' }}>title should not be Empty</p>
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

export default AddTrend
