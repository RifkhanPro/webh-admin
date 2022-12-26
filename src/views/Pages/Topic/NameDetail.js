/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText, CardTitle } from "reactstrap"
import TopicList from "./TopicList"
import TopicPostList from "./TopicPostList"
import './ViewSkill.css'
const NameDetail = () => {
    const {category, name} = useParams()
    const [posts, setPosts] = useState()
    const navigate = useNavigate()


    useEffect(() => {

            const sendRequest = async () => {
                try {

                    const response = await fetch('http://68.178.164.166:8070/topicPost/post', {method:"POST",
                        headers : {"Content-Type":"application/json"},
                        body :JSON.stringify({
                            name,
                            category
                        })
                    })

                    const responseData = await response.json()
                    console.log(responseData)
                    setPosts(responseData)
                    if (!response.ok) {
                        throw new Error(responseData.message)
                    }


                } catch (err) { 
                        //
                }

            }
        
        sendRequest()

     }, [])

    return <>
        <Card className="card">
        {category && <div className="details">
                <h1>{category}</h1>
                <CardTitle>{name}</CardTitle>
            </div>}

            {!category && 
                <CardText className="no-respond">There is no Such Category</CardText>
            }

        </Card>

        <Card>
            {posts && <TopicPostList data = {posts}/>}
            {posts && posts.length === 0 && <p>There is no Posts</p>}
        </Card>

    </>
      
    }


export default NameDetail
