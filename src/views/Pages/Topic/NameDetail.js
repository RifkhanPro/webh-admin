/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText, CardTitle } from "reactstrap"
import TopicList from "./TopicList"
import './ViewSkill.css'
const NameDetail = () => {
    const {category, name} = useParams()
    const [posts, setPosts] = useState()
    const navigate = useNavigate()

    const routeHandler = () => {
        navigate(`/topicPost/${name}/${category}/editName`)
  
      navigate('/topics')
    }

    useEffect(() => {

            const sendRequest = async () => {
                try {
                    const response = await fetch('http://localhost:8070/topicPost', {method:"GET",
                        headers : {"Content-Type":"application/json"},
                        body :JSON.stringify({
                            name,
                            category
                        })
                    })

                    const responseData = await response.json()
                    setPosts(responseData)
                    if (!response.ok) {
                        throw new Error(responseData.message)
                    }


                } catch (err) { 
                        //
                }

            }
        
        sendRequest()

     }, [name, category])

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
            {posts && <TopicList data = {posts}/>}
        </Card>

    </>
      
    }


export default NameDetail
