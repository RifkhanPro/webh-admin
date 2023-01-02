import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Home, FileText, Circle, Edit, Delete, Info, PlusCircle } from 'react-feather'
import './aprovalStyles.css'
const AllPosts = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState()
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
        fetch("http://68.178.164.166:8070/post", {method : 'PUT', headers : {"Content-Type":"application/json"}}).then((res) => {
            return res.json()
        }).then((resp) => {
            setPosts(resp.posts)
            console.log(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const approveHandler = async (postId) => {
       
        try {
            const response = await fetch(`http://68.178.164.166:8070/post/${postId}/check`, {method:"PUT", 
            headers : {"Content-Type":"application/json"}})

            const responseData = await response.json()

            if (!response.ok) {
                throw new Error(responseData.message)
            }

        } catch (err) { 
            console.log(err)
        }
        console.log('working')
        window.location.reload()
    }


    const viewHandler = (id) => {
        navigate(`/postApproval/${id}`)
    }
    return <>
        {user ? <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2 className="m-2">All Posts</h2>
                </div>
                <div className="card-body">
                <table className="table" style={{ width:'auto'}}>
                    <thead className="primary">
                        <tr>
                            {/* <th scope="col">Comment</th> */}
                            {/* <th scope="col">postId</th> */}
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            {/* <th scope="col">Likes</th>
                            <th scope="col">UnLikes</th>
                            <th scope="col">Shares</th> */}
                            <th scope="col">Approve</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {posts && posts.map(item => (
                        
                                    <tr key={item.id} className="tr" >
                                        {/* <td>{item.id}</td> */}
                                        {/* <td>{item.postId}</td> */}
                                        <td>{item.category}</td>
                                        <td>{item.desc}</td>
                                        {/* <td>{item.likes.length}</td>
                                        <td>{item.dislike.length}</td>
                                        <td>{item.shares.length}</td> */}
                                        <td>{item.status && item.status === true ? 'Approved' : "Rejected"}</td>
                                       
                                        <td className="btns">
                                            <a onClick={() => approveHandler(item.id)}   className={item.status === true ? 'btn btn-danger' : "btn btn-primary"}>{item.status === true ? 'Reject' : "Approve"}</a>
                                            <a onClick={() => viewHandler(item.id)} className="btn btn-success">View</a>
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


export default AllPosts