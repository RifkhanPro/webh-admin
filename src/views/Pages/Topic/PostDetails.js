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

                    const response = await fetch(`http://44.202.187.100:8070/topicPost/${id}/viewPost`)

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

    return <>
        <Card className="card">
            {
                post && <div className="details">
                    <h1>{post.category}</h1>
                    <CardTitle>{post.name}</CardTitle>
                    
                    <h1 className="comment">Comments</h1>
                    <CommentsList data = {post.comments}/>
                </div>
            }

        
            {!post && 
                <CardText className="no-respond">There is no Such post</CardText>
            }

        </Card>

    </>
      
    }


export default PostDetails
