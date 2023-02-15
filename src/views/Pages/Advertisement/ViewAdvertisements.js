/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardText,
	CardLink,
	Button
} from 'reactstrap'
import AdvertisementList from './AdvertisementList'
import './ViewPostManagements.css'
import { RotatingLines } from 'react-loader-spinner'

function ViewAnalytics() {
	const [trends, setTrends] = useState()
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

	useEffect(
		() => {
			const sendRequest = async () => {
				try {
					const response = await fetch(
						'http://44.202.187.100:8070/advertisement'
					)

					const responseData = await response.json()

					setTrends(responseData)

					if (!response.ok()) {
						throw new Error(responseData.message)
					}
				} catch (err) {}
			}

			sendRequest()
		},
		() => {},
		[]
	)

	const routerHandler = () => {
		navigate('/addAdvertisement')
	}

	return (
		<>
			{user ? (
				<div className="postManagement-container">
					<div className="postManagement-card">
						<button className="btn" onClick={routerHandler}>
							Add Advertisement
						</button>
						<div className="postManagement-card-body">
							{trends && <AdvertisementList data={trends} />}
							{trends && trends.length <= 0 && <p>There is no Advertisement</p>}
							{!trends && (
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

export default ViewAnalytics
