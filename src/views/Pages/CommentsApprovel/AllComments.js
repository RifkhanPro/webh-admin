import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Home, FileText, Circle, Edit, Delete, Info, PlusCircle } from 'react-feather'
import './aprovalStyles.css'

const AllComments = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState("")
    const [comments, setComments] = useState()
    const navigate = useNavigate()
    useEffect(() => {
      //check whether user has signed in
      if (localStorage.getItem("userAuthToken")) {
          setIsSignedIn(true)
          console.log(isSignedIn)
  
          //get user data
          if (localStorage.getItem("user")) {
              setUser(JSON.parse(localStorage.getItem('user')))
              console.log(user)
          }
  
      } else {
        setIsSignedIn(false)
      }
    }, [])
  
    console.log(user, isSignedIn)  


    useEffect(() => {
        fetch("http://68.178.164.166:8070/post").then((res) => {
            return res.json()
        }).then((resp) => {
            setComments(resp)
            console.log(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    
    const viewHandler = (postId, id) => {
        console.log(postId, id)
        navigate(`/comments/${postId}/${id}`)
    }
    const approveHandler = async (postId, _id) => {
       
        try {
            const response = await fetch(`http://68.178.164.166:8070/post/${postId}/${_id}/checkComment`, {method:"PUT", 
            headers : {"Content-Type":"application/json"}})

            const responseData = await response.json()

            if (!response.ok) {
                throw new Error(responseData.message)
            }

        } catch (err) { 
            console.log(err)
        }

        window.location.reload()
    }
    return <>
        {user ? <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2 className="m-2">All Comments</h2>
                </div>
                <div className="table-responsive">
                <table className="table">
                    <thead className="primary">
                        <tr>
                            {/* <th scope="col">Comment</th> */}
                            <th scope="col">Created By</th>
                            {/* <th scope="col">postId</th> */}
                            <th scope="col">Category</th>
                            <th scope="col">Desc</th>
                            <th scope="col">Approve</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments && comments.map(item => (
                                    <tr key={item.id}>
                                        {/* <td>{item.id}</td> */}
                                        <td>{item.userId}</td>
                                        {/* <td>{item.postId}</td> */}
                                        <td>{item.category}</td>
                                        <td>{item.desc}</td>
                                        <td>{item.status === true ? 'Approved' : "Rejected"}</td>
                                       
                                          <td className="btns">
                                            <a onClick={() => approveHandler(item.postId, item.id)}   className={item.status === true ? 'btn btn-danger' : "btn btn-primary"}>{item.status === true ? 'Reject' : "Approve"}</a>
                                            <a onClick={() => viewHandler(item.postId, item.id)} className="btn btn-success">View</a>
                                        </td>
                                    </tr>
                                ))
                            } 
                    </tbody>
                    </table>
                </div>
            </div>
        </div> : <></> }
    </>
}

export default AllComments