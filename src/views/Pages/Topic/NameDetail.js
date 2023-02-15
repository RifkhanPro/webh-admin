/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardText, CardTitle } from 'reactstrap'
import TopicList from './TopicList'
import TopicPostList from './TopicPostList'
import './NameDetails.css'
const NameDetail = () => {
	const { category, name } = useParams()
	const [posts, setPosts] = useState()
	const navigate = useNavigate()

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(
					'http://44.202.187.100:8070/topicPost/post',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							name,
							category
						})
					}
				)

				const responseData = await response.json()
				console.log(responseData)
				setPosts(responseData)
				if (!response.ok) {
					throw new Error(responseData.message)
				}
			} catch (err) {
				//
			}
		}

		sendRequest()
	}, [])

	return (
		<div className="nameDetails-container">
			<div className="nameDetails-card">
				{category && (
					<div className="details">
						<h1 className="nameDetails-card-category">{category}</h1>
						<h3 className="nameDetails-card-name">{name}</h3>
					</div>
				)}

				{!category && <p className="no-respond">There is no Such Category</p>}

				<div className="nameDetails-card-post-list">
					{posts && <TopicPostList data={posts} />}
					{posts && posts.length === 0 && <h4>There is no Posts</h4>}
				</div>
			</div>
		</div>
	)
}

export default NameDetail
