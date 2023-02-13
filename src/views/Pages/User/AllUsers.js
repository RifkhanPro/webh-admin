/* eslint-disable no-tabs */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
	Mail,
	Home,
	FileText,
	Circle,
	Edit,
	Delete,
	Info,
	PlusCircle
} from 'react-feather'
import './user.css'
const AllUsers = () => {
	const [userData, userDataChange] = useState(null)
	const navigate = useNavigate()
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')
	const [allData, setAllData] = useState('')
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

	const LoadDetail = _id => {
		navigate(`${_id}`)
	}

	// const LoadEdit = (_id) => {
	//     navigate(`edit/${_id}`)
	// }
	// const Removefunction = (_id) => {
	//     if (window.confirm('Do you want to Change the Status?')) {
	//         fetch(`http://localhost:8070/user/${_id}/activation`, {
	//             method: "PUT"
	//         }).then((res) => {
	//             console.log(res)
	//             alert('Update successfully.')
	//             window.location.reload()
	//         }).catch((err) => {
	//             console.log(err.message)
	//         })
	//     }
	// }

	useEffect(() => {
		fetch('http://localhost:8070/user')
			.then(res => {
				return res.json()
			})
			.then(resp => {
				userDataChange(resp)
				console.log(resp)
				setAllData(Object.keys(resp).length)
				console.log(allData)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])
	return (
		<>
			{user ? (
				<div className="user-container">
					<div className="user-card">
						<div className="card-title">
							<h2 className="m-2">Users</h2>
						</div>
						<div className="table-responsive">
							<table className="table">
								<thead className="primary">
									<tr style={{ textAlign: 'left' }}>
										<th scope="col">First Name</th>
										<th scope="col">Last Name</th>
										<th scope="col">Email</th>
										<th scope="col">Phone</th>
										<th scope="col">Activation</th>
										<th scope="col">Points</th>
									</tr>
								</thead>

								<tbody style={{ textAlign: 'left' }}>
									{userData &&
										userData.map(item => (
											<tr key={item._id} onClick={() => LoadDetail(item._id)}>
												<td>{item.firstname}</td>
												<td>{item.lastname}</td>
												<td>{item.email}</td>
												<td>{item.phone}</td>
												<td>{item.status === true ? 'Active' : 'Inactive'}</td>
												<td>{item.profilePoints}</td>
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

export default AllUsers
