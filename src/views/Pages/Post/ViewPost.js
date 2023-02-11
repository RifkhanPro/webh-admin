/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ViewPost = () => {
	const { id } = useParams()
	const [postData, setPostData] = useState()

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(
					`http://44.202.187.100:8070/postManagement/posts/${id}`
				)

				const responseData = await response.json()

				console.log(responseData.post)

				setPostData(responseData.post)

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
		<div className="container">
			<div className="card row" style={{ textAlign: 'left' }}>
				<div className="card-title"></div>
				<div className="card-body"></div>

				{postData && (
					<div className="m-2">
						<h2 className="mb-3">
							<b>{postData.name} </b>
						</h2>
						<h5 className="mb-3">Description : {postData.description}</h5>
						<Link className="btn btn-primary mb-3" to="/posts">
							All Posts
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}
export default ViewPost
