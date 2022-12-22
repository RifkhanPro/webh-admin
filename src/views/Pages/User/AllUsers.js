import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const AllUsers = () => {
    const [userData, userDataChange] = useState(null)
    const navigate = useNavigate()

    const LoadDetail = (_id) => {
        navigate(`${_id}`)
    }
    const LoadEdit = (_id) => {
        navigate(`${_id}`)
    }
    const Removefunction = (_id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(`http://localhost:8070/user/${_id}`, {
                method: "DELETE"
            }).then((res) => {
                console.log(res)
                alert('Removed successfully.')
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8070/user").then((res) => {
            return res.json()
        }).then((resp) => {
            userDataChange(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2 className="m-2">All Users</h2>
                </div>
                <div className="card-body">
                    {/* <div className="divbtn"> */}
                        {/* <Link to="/addUser" className="btn btn-success mb-2">Add New (+)</Link> */}
                    {/* </div> */}
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>FirstName</td>
                                <td>LastName</td>
                                <td>Email</td>
                                <td>Phone</td>
                                {/* <td>Status</td> */}
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {userData &&
                                userData.map(item => (
                                    <tr key={item._id}>
                                        <td></td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td><a onClick={() => { LoadEdit(item._id) }} className="btn btn-success button">Edit </a> 
                                            <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger mr-1">Deactivate </a>
                                            <a onClick={() => { LoadDetail(item._id) }} className="btn btn-warning mr-1">Details</a>
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

export default AllUsers