/* eslint-disable no-tabs */
import React from 'react'
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardText } from 'reactstrap'
import './ViewPostManagement.css'

const ViewNews = () => {
	const { id } = useParams()
	const [news, setNews] = useState()
	const navigate = useNavigate()

	const routeHandler = () => {
		navigate(`/news/edit/${id}`)
	}

	const deleteHandler = async () => {
		try {
			const response = await fetch(`http://18.205.10.114:8070/news/${id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			})

			const responseData = await response.json()

			if (!response.ok()) {
				throw new Error(responseData.message)
			}
		} catch (err) {}

		navigate('/news')
	}
	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://18.205.10.114:8070/news/${id}`)

				const responseData = await response.json()

				setNews(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [id])

	return (
		<div className="view-postManagement-container">
			{!news && (
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
				{news && (
					<div className="image">
						<img src={news.image} />
					</div>
				)}
				{news && (
					<div className="details">
						<h1>{news.title}</h1>
						<h4>{news.desc}</h4>
					</div>
				)}

				{!news && <p className="no-respond">There is no news</p>}

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

export default ViewNews
