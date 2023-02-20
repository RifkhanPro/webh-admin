/* eslint-disable no-tabs */
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

function ViewApprovalPost() {
	// const [post, setPost] = useState()
	// const [userId, setUserId] = useState()
	// const [user, setUser] = useState()
	// const {id} = useParams()

	// useEffect(() => {
	//     fetch(`http://18.205.10.114:8070/post/${id}`).then((res) => {
	//         return res.json()
	//     }).then((resp) => {
	//         setPost(resp.post)
	//         setUserId(resp.post.userId)
	//         console.log(resp.post.userId)
	//     }).catch((err) => {
	//         console.log(err.message)
	//     })
	// }, [])

	// useEffect(() => {
	//     if (userId) {
	//         fetch(`http://18.205.10.114:8070/user/${userId}`).then((res) => {
	//             return res.json()
	//         }).then((resp) => {
	//             console.log(resp.result)
	//             setUser(resp.result)
	//         }).catch((err) => {
	//             console.log(err.message)
	//         })
	//     }

	// }, [userId])

	return (
		<>
			{/* <div className="container">
            <div className="card">
               
                <div className="card-body">
                <table className="table" style={{ width:'auto', overflow:'hidden'}}>
                        {post && <>
                                   { user && <><tr>
                                        <th>User Name : </th>
                                        <td>{user.firstname} {user.lastname}</td>
                                    </tr></>}
                                    <tr>
                                        <th>Category : </th>
                                        <td>{post.category}</td>
                                    </tr>

                                    <tr>
                                        <th>Description : </th>
                                        <td>{post.desc}</td>
                                    </tr>

                                    <tr>
                                        <th>status : </th>
                                        <td>{post.status === true ? "Activated" : "DeActivated"}</td>
                                    </tr>
                                    <tr>
                                        {
                                            post.image &&  <> <th>Image : </th>
                                            <td><img src={post.image} alt="" style={{width:200}} /></td></>
                                        }
                                       
                                    </tr>
                                </>
                        }
                    
                    </table>
                </div>
            </div>
        </div>  */}
		</>
	)
}

export default ViewApprovalPost
