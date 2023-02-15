/* eslint-disable no-tabs */
import React from 'react'
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'
import './ViewPostManagement.css'

const ViewBlog = () => {
	const { id } = useParams()
	const [blog, setBlog] = useState()
	const navigate = useNavigate()

	const routeHandler = () => {
		navigate(`/blogs/edit/${id}`)
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://44.202.187.100:8070/blog/${id}`)

				const responseData = await response.json()

				console.log(responseData)

				setBlog(responseData.blog)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [id])

	const deleteHandler = async () => {
		try {
			const response = await fetch(`http://44.202.187.100:8070/blog/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			})

			const responseData = await response.json()

			if (!response.ok()) {
				throw new Error(responseData.message)
			}
		} catch (err) {}

		navigate('/blogs')
	}

	return (
		<div className="view-postManagement-container">
			{!blog && (
				<RotatingLines
					className="text-center"
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="1"
					width="96"
					visible={true}
				/>
			)}
			<div className="view-postManagement-card">
				{blog && (
					<div className="image">
						<img src={blog.image} />
					</div>
				)}
				{blog && (
					<div className="details">
						<h1>{blog.name}</h1>
						<h4>{blog.desc}</h4>
					</div>
				)}

				{!blog && <p className="no-respond">There is no Such blog</p>}

				<div className="btns">
					<button onClick={routeHandler} className="btn">
						Edit
					</button>
					<button onClick={deleteHandler} className="btn delete">
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}

export default ViewBlog
