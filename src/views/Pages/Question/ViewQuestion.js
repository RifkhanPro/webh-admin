/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import './AllQuestion.css'
const ViewQuestion = () => {
	const { id } = useParams()
	const [question, setQuestion] = useState()

	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')
	const navigate = useNavigate()

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
	const Removefunction = (_id) => {
		if (window.confirm('Do you want to remove?')) {
			fetch(`http://44.202.187.100:8070/question/${_id}`, {
				method: 'DELETE'
			})
				.then((res) => {
					console.log(res)
					alert('Removed successfully.')
					window.location.reload()
				})
				.catch((err) => {
					console.log(err.message)
				})
		}

		navigate('/questions')
	}

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://44.202.187.100:8070/question/${id}`)

				const responseData = await response.json()

				console.log(responseData)

				setQuestion(responseData)

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
				<div className="question-container">
					<div className="question-card">
						<h3>Question Details</h3>

						{question && (
							<div className="question-card-div">
								<div className="question-card-div-img">
									<img src={question.image} />
								</div>

								<div className="question-card-div-div">
									<h3>
										<b>Question</b> : {question.question}
									</h3>
									<h3>
										<b>Email</b> : {question.email}
									</h3>
									<h3>
										<b>Mobile</b> : {question.mobile}
									</h3>
								</div>

								<div className="question-card-div-btn">
									<button
										type="button"
										onClick={() => Removefunction(question._id)}>
										Delete
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default ViewQuestion
