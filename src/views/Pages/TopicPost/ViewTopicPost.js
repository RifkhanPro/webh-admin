/* eslint-disable no-tabs */
import React from 'react'
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'
import './ViewPostManagement.css'

const ViewTopicPost = () => {
	const { id } = useParams()
	const [topicPost, setTopicPost] = useState()
	const navigate = useNavigate()

	const routeHandler = () => {
		navigate(`/topicPosts/edit/${id}`)
	}

	const deleteHandler = async () => {
		try {
			const response = await fetch(`http://localhost:8070/topicPost/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			})

			const responseData = await response.json()

			console.log(responseData)

			setTopicPost(responseData)

			if (!response.ok()) {
				throw new Error(responseData.message)
			}
		} catch (err) {}

		navigate('/topicPosts')
	}
	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(
					`http://localhost:8070/topicPost/${id}/viewPost`
				)

				const responseData = await response.json()

				console.log(responseData)

				setTopicPost(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [id])

	return (
		<div className="view-postManagement-container">
			{!topicPost && (
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
				{topicPost && (
					<div className="image">
						<img src={topicPost.image} />
					</div>
				)}
				{topicPost && (
					<div className="details">
						<h1>{topicPost.category}</h1>
						<h4>{topicPost.name}</h4>
						<h4>{topicPost.desc}</h4>
					</div>
				)}

				{!topicPost && <p className="no-respond">There is no topicPost</p>}

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

export default ViewTopicPost
