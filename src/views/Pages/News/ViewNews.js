import React from "react"
// eslint-disable-next-line no-duplicate-imports
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardText } from "reactstrap"
import './ViewSkill.css'

const ViewNews = () => {
    const {id} = useParams()
    const [news, setNews] = useState()
    const navigate = useNavigate()
   
    const routeHandler = () => {
      navigate(`/news/edit/${id}`)
    }

    const deleteHandler = async() => {
        try {
          const response = await fetch(`http://68.178.164.166:8070/news/${id}`, {method:"DELETE", headers : {"Content-Type":"application/json"}})

          const responseData = await response.json()

          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }

      navigate('/news')
    }
  useEffect(() => {
    const sendRequest = async () => {
     try {
         const response = await fetch(`http://68.178.164.166:8070/news/${id}`)

         const responseData = await response.json()

         setNews(responseData)
            
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
                           {news && <img src={news.image} />}

          </div>
          {news && <div className="details">
              <h1>{news.title}</h1>
              <CardText>{news.desc}</CardText>
          </div>}

          {!news && 
              <CardText className="no-respond">There is no Such News</CardText>
          }

      </Card>

          <div className="btns">
            <Button onClick={routeHandler} className='btn'>Edit</Button>
            <Button onClick={deleteHandler} className='btn delete'>Delete</Button>
          </div>
  </>
}

export default ViewNews
