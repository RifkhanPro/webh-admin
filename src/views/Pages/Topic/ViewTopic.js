import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
import avatar from './../../../assets/images/users/avatar-1.jpg'
import './ViewSkill.css'

const ViewTopic = () => {
    const {id} = useParams()
    const [topicPost, setTopicPost] = useState()
    const navigate = useNavigate()
   
    const routeHandler = () => {
      navigate(`/topicPosts/edit/${id}`)
    }

    const deleteHandler = async() => {
      try {
        const response = await fetch(`http://localhost:8070/topicPost/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

        const responseData = await response.json()

        console.log(responseData)

        setTopicPost(responseData)
           
        if (!response.ok()) {
          throw new Error(responseData.message)
      }

    } catch (err) {
    }

      navigate('/topicPosts')
    }
  useEffect(() => {
    const sendRequest = async () => {
     try {
         const response = await fetch(`http://localhost:8070/topicPost/${id}/viewPost`)

         const responseData = await response.json()

         console.log(responseData)

         setTopicPost(responseData)
            
         if (!response.ok()) {
           throw new Error(responseData.message)
       }

     } catch (err) {
     }
    } 

    sendRequest()
 }, [id])

  return <>
      <Card className="card">
          <div className="image">
              <img src={avatar} />
          </div>
        {topicPost && <div className="details">
              <h1>{topicPost.category}</h1>
              <h2>{topicPost.name}</h2>
              <CardText>{topicPost.desc}</CardText>
          </div>}

          {!topicPost && 
              <CardText className="no-respond">There is no Such TopicPosts</CardText>
          }

      </Card>

          <div className="btns">
            <Button onClick={routeHandler} className='btn'>Edit</Button>
            <Button onClick={deleteHandler} className='btn delete'>Delete</Button>
          </div>
  </>
}

export default ViewTopic
