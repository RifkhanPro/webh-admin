/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './AllFeedback.css'
const ViewFeedback = () => {
	const { id } = useParams()
	const [feedbackData, setFeedbackData] = useState()

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://localhost:8070/feedback/${id}`)

				const responseData = await response.json()

				console.log(responseData)

				setFeedbackData(responseData)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {
				console.log('Error Getting Data')
			}
		}
		sendRequest()
	}, [id])
	return (
		<div className="feedback-container">
			<div className="feedback-card ">
				<div className="card-title"></div>
				<div className="card-body"></div>

				{feedbackData && (
					<div className="m-2">
						<h4 className="mb-1">
							First Name
							<b>{feedbackData.firstName} </b>
						</h4>
						<h4 className="mb-1">
							Last Name
							<b>{feedbackData.lastName} </b>
						</h4>
						<h4 className="mb-1">
							Email
							<b>{feedbackData.email} </b>
						</h4>
						<h4 className="mb-1">
							Industry
							<b>{feedbackData.industry} </b>
						</h4>
						<h4 className="mb-1">
							Message
							<b>{feedbackData.message} </b>
						</h4>
						{/* <h5 className="mb-3">Description : {feedbackData.description}</h5> */}
						<Link className="btn btn-primary mb-3" to="/feedbacks">
							All Feedbacks
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
export default ViewFeedback
