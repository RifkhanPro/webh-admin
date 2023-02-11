/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardText,
	CardLink
} from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Edit, Delete, Info, PlusCircle } from 'react-feather'

const ViewPosts = () => {
	const [postsData, postDataChange] = useState()
	//   const [postDataChange] = useState()
	const navigate = useNavigate()
	const LoadDetail = (_id) => {
		navigate(`${_id}`)
	}
	const LoadEdit = (_id) => {
		navigate(`edit/${_id}`)
	}

	useEffect(() => {
		fetch('http://44.202.187.100:8070/postManagement/posts')
			.then((res) => {
				return res.json()
			})
			.then((resp) => {
				postDataChange(resp)
			})
			.catch((err) => {
				console.log(err.message)
			})
	}, [])

	const Removefunction = (_id) => {
		if (window.confirm('Do you want to remove?')) {
			fetch(`http://44.202.187.100:8070/postManagement/deletePost/${_id}`, {
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
	}

	return (
		<div className="container">
			<div className="card">
				<div className="card-title">
					<h2 className="m-2">All Posts</h2>
				</div>
				<div className="table-responsive">
					<Link to="/addPost" className="btn btn-success mb-2">
						<PlusCircle size={12} />
					</Link>
					<table class="table">
						<thead className="primary">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Description</th>
								<th scope="col">Image</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{postsData &&
								postsData.map((item) => (
									<tr key={item._id}>
										<td></td>
										<td>{item.name}</td>
										<td>{item.description}</td>
										<td></td>
										{/* <td>{item.image}</td> */}
										<td>
											<a
												onClick={() => {
													LoadEdit(item._id)
												}}
												className="btn btn-success">
												<Edit size={12} />{' '}
											</a>{' '}
											|
											<a
												onClick={() => {
													Removefunction(item._id)
												}}
												className="btn btn-danger">
												<Delete size={12} />
												<i class="fas fa-trash-alt"></i>{' '}
											</a>{' '}
											|
											<a
												onClick={() => {
													LoadDetail(item._id)
												}}
												className="btn btn-info">
												<Info size={12} />
											</a>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
// }
export default ViewPosts
