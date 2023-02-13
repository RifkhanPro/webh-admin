/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
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
import NewsList from './NewsList'
import './ViewPostManagements.css'

function ViewNewses() {
	const [newses, setNewses] = useState()
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
				const response = await fetch('http://localhost:8070/news')

				const responseData = await response.json()

				setNewses(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [])

	const routerHandler = () => {
		navigate('/addNews')
	}

	return (
		<>
			{user ? (
				<div className="postManagement-container">
					<div className="postManagement-card">
						<button className="btn" onClick={routerHandler}>
							Add News
						</button>
						<div className="postManagement-card-body">
							{newses && <NewsList data={newses} />}
							{newses && newses.length === 0 && <p>There is no Newses</p>}
							{!newses && (
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

export default ViewNewses
