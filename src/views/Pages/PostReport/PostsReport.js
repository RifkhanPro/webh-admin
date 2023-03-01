/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './aprovalStyles.css'

const AllComments = () => {
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')
	const [posts, setPosts] = useState()
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

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`https://18.205.10.114:8070/post`)

				const responseData = await response.json()

				console.log(responseData)

				setPosts(responseData.posts)

				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [])

	const viewHandler = async postId => {
		navigate(`/postReport/${postId}`)
	}

	return (
		<>
			{user ? (
				<div className="post-container">
					<div className="post-card">
						<div className="card-title">
							<h2 className="m-2">All Posts</h2>
						</div>
						<div className="table-responsive">
							<table className="table">
								<thead className="primary">
									<tr>
										<th scope="col">Category</th>
										<th scope="col">Description</th>
										<th scope="col">Image</th>
										<th scope="col">Report</th>
									</tr>
								</thead>
								<tbody>
									{posts &&
										posts.map(item => (
											<tr
												key={item.id}
												className="tr"
												onClick={() => viewHandler(item.id)}>
												<td>{item.category}</td>
												<td>{item.desc}</td>
												<td>
													<img src={item.image} alt="" />
												</td>
												<td>
													{item.report === true ? 'Reported' : 'Accepted'}
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

export default AllComments
