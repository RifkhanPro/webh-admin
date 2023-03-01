/* eslint-disable no-tabs */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ViewPostReport.css'
import { RotatingLines } from 'react-loader-spinner'

function ViewPostReport() {
	const [userId, setUserId] = useState()
	const [user, setUser] = useState()
	const [post, setPost] = useState()
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		fetch(`https://18.205.10.114:8070/post/${id}`)
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setUserId(resp.post.userId)
				setPost(resp.post)
				console.log(resp.post)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	useEffect(() => {
		if (userId) {
			fetch(`https://18.205.10.114:8070/user/${userId}`)
				.then(res => {
					return res.json()
				})
				.then(resp => {
					console.log(resp.result)
					setUser(resp.result)
				})
				.catch(err => {
					console.log(err.message)
				})
		}
	}, [userId])

	const approveHandler = async () => {
		console.log(id)
		try {
			const response = await fetch(
				`https://18.205.10.114:8070/post/${id}/report`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' }
				}
			)

			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(responseData.message)
			}
		} catch (err) {
			console.log(err)
		}
		navigate('/postReport')
	}

	const deleteHandler = async () => {
		try {
			const response = await fetch(`https://18.205.10.114:8070/post/${id}`, {
				method: 'DELETE'
			})

			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(responseData.message)
			}
		} catch (err) {
			console.log(err)
		}
		navigate('/postReport')
		window.location.reload()
	}
	return (
		<>
			<div className="post-container">
				<div className="post-card">
					<div className="post-card-body">
						{!user && !post && (
							<RotatingLines
								className="text-center"
								strokeColor="grey"
								strokeWidth="5"
								animationDuration="1"
								width="96"
								visible={true}
							/>
						)}

						{post && (
							<div className="div-img">
								<img src={post.image} alt="" />
							</div>
						)}
						{user && (
							<>
								<div className="div-group">
									<p>
										{' '}
										<span>User Name : </span> {user.firstname} {user.lastname}
									</p>
								</div>

								<div className="div-group">
									<p>
										{' '}
										<span>Category : </span> {post.category}
									</p>
								</div>

								<div className="div-group">
									<p>
										{' '}
										<span>Description : </span>
										{post.desc}
									</p>
								</div>

								<div className="div-group">
									<p>
										{' '}
										<span>Report : </span>
										{post.report === true ? 'Reported' : 'Accepted'}
									</p>
								</div>

								<div className="div-btn">
									{post.report && (
										<button type="button" onClick={approveHandler}>
											Reject
										</button>
									)}
									<button onClick={deleteHandler}>Delete</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default ViewPostReport
