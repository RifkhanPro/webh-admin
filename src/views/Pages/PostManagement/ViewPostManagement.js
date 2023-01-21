import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import './ViewPostManagement.css'

const ViewPostManagement = () => {
    const {id} = useParams()
    const [post, setPost] = useState()
    const navigate = useNavigate()
   
    const routeHandler = () => {
      navigate(`/postManagements/edit/${id}`)
    }
    
  useEffect(() => {
    const sendRequest = async () => {
     try {
         const response = await fetch(`http://localhost:8070/postManagement/posts/${id}`)

         const responseData = await response.json()
         setPost(responseData.post)
            
         if (!response.ok()) {
           throw new Error(responseData.message)
       }

     } catch (err) {
     }
    } 

    sendRequest()
 }, [id])

   const deleteHandler = async() => {
        try {
          const response = await fetch(`http://localhost:8070/postManagement/deletePost/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

          const responseData = await response.json()

          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }

      navigate('/postManagements')
    }

  return <div className="view-postManagement-container">
          <div className="view-postManagement-card">
            {post && <div className="image">
                    <img src={post.image} />
                </div>}
            {post && <div className="details">
                  <h1>{post.name}</h1>
                  <h4>{post.description}</h4>
              </div>}

              {!post && 
                  <p className="no-respond">There is no Such postManagement</p>
              }

            <div className="btns">
                  <button onClick={routeHandler} className='btn'>Edit</button>
                  <button onClick={deleteHandler} className='btn delete'>Delete</button>
            </div>
          </div>

      </div>
}

export default ViewPostManagement
