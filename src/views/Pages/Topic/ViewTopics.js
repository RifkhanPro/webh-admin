/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopicList from './TopicList'
import './ViewPostManagements.css'
import { RotatingLines } from 'react-loader-spinner'

function ViewTopics() {
	const [topics, setTopics] = useState()
	const navigate = useNavigate()
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')

	useEffect(() => {
		//check whether user has signed in
		if (localStorage.getItem('userAuthToken')) {
			setIsSignedIn(true)
			console.log(isSignedIn)

			//get user data
			if (localStorage.getItem('user')) {
				setUser(JSON.parse(localStorage.getItem('user')))
				console.log(user)
			}
		} else {
			setIsSignedIn(false)
		}
	}, [])

	console.log(user, isSignedIn)

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch('http://44.202.187.100:8070/topic/topics')

				const responseData = await response.json()

				setTopics(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [])

	const routerHandler = () => {
		navigate('/addTopic')
	}

	return (
		<>
			{user ? (
				<div className="postManagement-container">
					<div className="postManagement-card">
						<button className="btn" onClick={routerHandler}>
							Add Topic
						</button>
						<div className="postManagement-card-body">
							{topics && <TopicList data={topics} />}
							{topics && topics.length === 0 && <p>There is no topics</p>}
							{!topics && (
								<RotatingLines
									className="text-center"
									strokeColor="grey"
									strokeWidth="5"
									animationDuration="1"
									width="96"
									visible={true}
								/>
							)}
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default ViewTopics
