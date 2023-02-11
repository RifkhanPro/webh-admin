/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ViewUser.css'
const ViewUser = () => {
	const { id } = useParams()
	const [userData, setUserData] = useState()
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')
	const [posts, setPosts] = useState()

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
				const response = await fetch(`http://44.202.187.100:8070/user/${id}`)

				const responseData = await response.json()

				console.log(responseData.result)

				setUserData(responseData.result)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {
				console.log(err)
			}
		}
		sendRequest()
	}, [id])

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(
					`http://44.202.187.100:8070/post/${id}/userPosts`
				)

				const responseData = await response.json()

				console.log(responseData)

				setPosts(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {
				console.log(err)
			}
		}
		sendRequest()
	}, [id])

	return (
		<>
			{user ? (
				<div className="user-view-container">
					<div className="user-view-card">
						{userData && (
							<>
								<div className="user-view-card-div user-view-card-personal-details">
									<h2 className="mb-1">Personal Details</h2>
									{userData.profilePicture && (
										<img src={userData.profilePicture} alt="" />
									)}
									<div className="user-view-card-personal-details-div">
										<h4 className="mt-1">
											FullName : {userData.firstname} {userData.lastname}
										</h4>
										<h4>Email : {userData.email} </h4>
										<h4>Profile Points : {userData.profilePoints} </h4>
										<h4>Webh ID : {userData.webhId} </h4>
										{userData.address && <h4>Address : {userData.address} </h4>}
										{userData.country && <h4>Country : {userData.country} </h4>}
										{userData.city && <h4>City : {userData.city} </h4>}
										{userData.phone && <h4>Phone : {userData.phone} </h4>}
										{userData.state && <h4>State : {userData.state} </h4>}
										{userData.zip && <h4>Zip : {userData.zip} </h4>}
										{userData.worksAt && (
											<h4>Works At : {userData.worksAt} </h4>
										)}
									</div>
								</div>
								{posts && posts.length > 0 && (
									<div className="user-view-card-div user-view-card-posts">
										<h2 className="mb-1">Posts</h2>
										<div className="user-view-card-posts-list">
											{posts.map((post) => (
												<img src={post.image} alt="" className="post-image" />
											))}
										</div>
									</div>
								)}
								{userData.interests && userData.interests.length > 0 && (
									<div className="user-view-card-div user-view-card-interests">
										<h2 className="mb-1">Interests</h2>
										<div className="user-view-card-skill-list">
											{userData.interests.map((interest) => (
												<p>{interest.name}</p>
											))}
										</div>
									</div>
								)}
								{userData.skills && userData.skills.length > 0 && (
									<div className="user-view-card-div user-view-card-skills">
										<h2 className="mb-1">Skills</h2>
										<div className="user-view-card-skill-list">
											{userData.skills.map((skill) => (
												<p>{skill.name}</p>
											))}
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default ViewUser
