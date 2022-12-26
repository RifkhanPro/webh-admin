import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
import './ViewSkill.css'

const ViewBlog = () => {
    const {id} = useParams()
    const [blog, setBlog] = useState()
    const navigate = useNavigate()

    const routeHandler = () => {
      navigate(`/blogs/edit/${id}`)
    }

  useEffect(() => {
    const sendRequest = async () => {
     try {
         const response = await fetch(`http://localhost:8070/blog/${id}`)

         const responseData = await response.json()

         console.log(responseData)

         setBlog(responseData)
            
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
        const response = await fetch(`http://localhost:8070/blog/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

        const responseData = await response.json()

        if (!response.ok()) {
          throw new Error(responseData.message)
      }

    } catch (err) {
    }

    navigate('/blogs')
    }
    return <>
      <Card className="card">
          <div className="image">
               {blog && <img src={blog.image} />}
          </div>
        {blog && <div className="details">
              <h1>{blog.name}</h1>
              <CardText>{blog.desc}</CardText>
          </div>}

          {!blog && 
              <CardText className="no-respond">There is no Such blog</CardText>
          }

      </Card>
     
      <div className="btns">
            <Button onClick={routeHandler} className='btn'>Edit</Button>
            <Button onClick={deleteHandler} className='btn delete'>Delete</Button>
        </div>

    </>
}

export default ViewBlog
