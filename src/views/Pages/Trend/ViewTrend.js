/* eslint-disable no-tabs */
import React from 'react'
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'
import './ViewPostManagement.css'

const ViewTrend = () => {
	const { id } = useParams()
	const [trend, setTrend] = useState()
	const navigate = useNavigate()

	const routeHandler = () => {
		navigate(`/trends/edit/${id}`)
	}

	const deleteHandler = async () => {
		try {
			const response = await fetch(`http://18.205.10.114:8070/trend/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			})

			const responseData = await response.json()

			setTrend(responseData)

			if (!response.ok()) {
				throw new Error(responseData.message)
			}
		} catch (err) {}

		navigate('/trends')
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://18.205.10.114:8070/trend/${id}`)

				const responseData = await response.json()

				setTrend(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [id])

	return (
		<div className="view-postManagement-container">
			{!trend && (
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
				{trend && (
					<div className="image">
						<img src={trend.image} />
					</div>
				)}
				{trend && (
					<div className="details">
						<h1>{trend.title}</h1>
						<h4>{trend.desc}</h4>
					</div>
				)}

				{!trend && <p className="no-respond">There is no Trend</p>}

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

export default ViewTrend
