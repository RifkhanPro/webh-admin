/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardHeader, CardText, CardTitle } from "reactstrap"
import CommentsList from "./CommentsList"
import './DetailPost.css'

const PostDetails = () => {
    const {id} = useParams()
    const [post, setPost] = useState()

    useEffect(() => {

            const sendRequest = async () => {
                try {

                    const response = await fetch(`http://localhost:8070/topicPost/${id}/viewPost`)

                    const responseData = await response.json()
                    setPost(responseData)
                    if (!response.ok) {
                        throw new Error(responseData.message)
                    }


                } catch (err) { 
                        //
                }

            }
        
        sendRequest()

     }, [id])

    return <div className="post-details-container">
            <div className="post-details-card">
                {
                    post &&  <div className="post-details-card-details">
                        <h1>{post.category}</h1>
                        <h3>{post.name}</h3>
                            
                { post && post.comments.length > 0 &&   <div className="post-details-comment-list">
                            <h3 className="post-details-comment-heading">Comments</h3>
                            <CommentsList data = {post.comments}/>
                        </div>}
                    </div>

                }

            
                {post && post.comments.length === 0 && 
                    <p className="no-respond">There is no Comments</p>
                }
            </div>
        </div>
      
    }


export default PostDetails
