/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardText,
	CardLink,
	Button
} from 'reactstrap'
import TopicList from './TopicList'
import './ViewBlogs.css'

function ViewTopics() {
	const [topics, setTopics] = useState()
	const navigate = useNavigate()
	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch('https://localhost:8070/topic/topics')

				const responseData = await response.json()

				console.log(responseData)

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
		<div>
			<Button className="btn mb-2" onClick={routerHandler}>
				Add Topic
			</Button>
			<Card>
				<CardBody>
					<Card>
						{topics && <TopicList data={topics} />}
						{!topics && <p>There is no topics</p>}
					</Card>
				</CardBody>
			</Card>
		</div>
	)
}

export default ViewTopics
