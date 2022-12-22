import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"

const ViewPosts = () => {
  const [postsData, postDataChange] = useState()
  const navigate = useNavigate()
  const LoadDetail = (_id) => {
        navigate(`${_id}`)
  }
  const LoadEdit = (_id) => {
        navigate(`${_id}`)
   }

  useEffect(() => {
    fetch("http://localhost:8070/postManagement/posts")
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

//   const deleteHandler = async() => {
//     try {
//       const response = await fetch(`http://localhost:8070/article/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})
  
//       const responseData = await response.json()
  
//       if (!response.ok()) {
//         throw new Error(responseData.message)
//     }
  
//     } catch (err) {
//         console.log(err)
//     }

  return (
    <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2 className="m-2">All Posts</h2>
                </div>
                <div className="card-body">
                    {/* <div className="divbtn"> */}
                        <Link to="/addPost" className="btn btn-success mb-2">Add New (+)</Link>
                    {/* </div> */}
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Image</td>
                                {/* <td>Status</td> */}
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {postsData &&
                                postsData.map(item => (
                                    <tr key={item._id}>
                                        <td></td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td></td>
                                        {/* <td>{item.image}</td> */}
                                        <td><a onClick={() => { LoadEdit(item._id) }} className="btn btn-success button">Edit </a> 
                                            {/* <a onClick={deleteHandler}  className="btn btn-danger mr-1">Remove </a> */}
                                            <a onClick={() => { LoadDetail(item._id) }} className="btn btn-primary mr-1">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
  )
}
// }
export default ViewPosts
