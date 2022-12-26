import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Home, FileText, Circle, Edit, Delete, Info, PlusCircle } from 'react-feather'

const AllUsers = () => {
    const [userData, userDataChange] = useState(null)
    const navigate = useNavigate()

    const LoadDetail = (_id) => {
        navigate(`${_id}`)
    }
    const LoadEdit = (_id) => {
        navigate(`edit/${_id}`)
    }
    const Removefunction = (_id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(`http://localhost:8070/user/${_id}/activation`, {
                method: "PUT"
            }).then((res) => {
                console.log(res)
                alert('Update successfully.')
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
                <table class="table">
                    <thead className="primary">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Activation</th>
                        <th scope="col">Points</th>
                        {/* <th scope="col">Status</th> */}
                        <th scope="col">Action</th>
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
                                        <td>{item.status === true ? 'Active' : "InActive"}</td>
                                        <td>{item.profilePoints}</td>
                                        {/* <td>{item.image}</td> */}
                                         <td>
                                            <a onClick={() => { LoadEdit(item._id) }} className="btn btn-success"><Edit size={12} /> </a>   |  
                                            <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger"><Delete size={12} /><i class="fas fa-trash-alt"></i> </a>  | 
                                            <a onClick={() => { LoadDetail(item._id) }} className="btn btn-info"><Info size={12} /></a>
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