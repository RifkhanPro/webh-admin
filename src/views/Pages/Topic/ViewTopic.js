/* eslint-disable no-tabs */
import React from 'react'
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'
import NameList from './NameList'
import { RotatingLines } from 'react-loader-spinner'

import './ViewSkill.css'

const ViewTopic = () => {
	const { id } = useParams()
	const [skill, setSkill] = useState()
	const navigate = useNavigate()

	const routeHandler = () => {
		navigate(`/topics/edit/${id}`)
	}

	const addNameHandler = () => {
		navigate(`/topics/${id}/AddName`)
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://18.205.10.114:8070/topic/${id}`)

				const responseData = await response.json()

				setSkill(responseData)
				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [id])

	const deleteHandler = async () => {
		try {
			const response = await fetch(`http://18.205.10.114:8070/topic/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			})

			const responseData = await response.json()

			if (!response.ok()) {
				throw new Error(responseData.message)
			}
		} catch (err) {}

		navigate('/topics')
	}

	return (
		<>
			{!skill && (
				<RotatingLines
					className="text-center"
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="1"
					width="96"
					visible={true}
				/>
			)}
			<div className="topic-view-container">
				<div className="topic-view-card">
					{skill && (
						<h1 className="topic-view-card-category">{skill.category}</h1>
					)}

					{skill && (
						<div className="topic-view-card-name-list">
							<NameList category={skill.category} data={skill.names} />
						</div>
					)}

					{skill && skill.length === 0 && (
						<p className="no-respond">There is no Such Skill</p>
					)}
				</div>

				<div className="topic-view-container-btns">
					<button onClick={routeHandler} className="btn">
						Edit Category
					</button>
					<button onClick={addNameHandler} className="btn">
						Add Name
					</button>
					<button onClick={deleteHandler} className="btn delete">
						Delete Category
					</button>
				</div>
			</div>
		</>
	)
}

export default ViewTopic
