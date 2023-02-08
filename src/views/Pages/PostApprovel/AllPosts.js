import { useEffect, useState } from "react"
import './aprovalStyles.css'
const AllPosts = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState()
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
        const sendRequest = async () => {
            try {
                const response = await fetch(`http://44.202.187.100/:8070/post`)
       
                const responseData = await response.json()
       
                console.log(responseData)
       
                setPosts(responseData.posts)
                   
                if (!response.ok()) {
                  throw new Error(responseData.message)
              }
       
            } catch (err) {
            }
           } 
       
           sendRequest()
      
      
    }, [])

    const approveHandler = async (id) => {
       
        try {
            const response = await fetch(`http://44.202.187.100:8070/post/${id}/report`, {method:"PUT", 
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


    const deleteHandler = async (postId) => {
       
        try {
            const response = await fetch(`http://44.202.187.100:8070/post/${postId}`, {method:"DELETE"})

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
                    <h2 className="m-2">All Posts</h2>
                </div>
                <div className="table-responsive">
                <table className="table" >
                    <thead className="primary">
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Report</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {posts && posts.map(item => (
                        
                                    <tr key={item.id} className="tr" >
                                     
                                        <td>{item.category}</td>
                                        <td>{item.desc}</td>
                                        <td>{item.report === true ? "Reported" : "Accepted"}</td>
                                        <td className="btns">
                                            {item.report === true  && <a onClick={() => approveHandler(item.id)}   className='btn btn-success'>Reject</a>}
                                            <a onClick={() => deleteHandler(item.id)}   className= 'btn btn-danger'>Delete</a>
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