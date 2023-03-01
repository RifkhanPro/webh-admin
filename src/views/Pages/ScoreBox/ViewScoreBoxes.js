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
import ScoreBoxList from './ScoreBoxList'
import './ViewBlogs.css'

function ViewScoreBoxes() {
	const [skills, setSkills] = useState()
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
				const response = await fetch('https://18.205.10.114:8070/scoreBox')

				const responseData = await response.json()

				console.log(responseData)

				setSkills(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [])

	const routerHandler = () => {
		navigate('/addScoreBox')
	}

	return (
		<>
			<Button className="btn mb-2" onClick={routerHandler}>
				Add ScoreBox
			</Button>
			{user ? (
				<div>
					<Card>
						<CardBody>
							<Card>
								{skills && <ScoreBoxList data={skills} />}
								{!skills && <p>There is no ScoreBoxes</p>}
							</Card>
						</CardBody>
					</Card>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default ViewScoreBoxes
