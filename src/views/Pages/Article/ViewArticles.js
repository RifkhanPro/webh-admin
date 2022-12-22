import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, ButtonToggle, Button } from 'reactstrap'
import BlogList  from './ArticleList'
import './ViewBlogs.css'

function ViewArticles() {
  const [articles, setArticles] = useState()
  const navigate = useNavigate()

  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://localhost:8070/article')

          const responseData = await response.json()
 
          console.log(responseData)

          setArticles(responseData)
             
          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }
     } 

     sendRequest()
  }, [])

  const routerHandler = () => {
    navigate('/addArticle')
  }

  return <>
     <div>
        <Card>
       
        <CardBody>
          <Card>
             {articles && <BlogList  data = {articles}/>}
             {!articles && <p>There is no Articles</p>}
          </Card>
        </CardBody>
      </Card> 
      <Button className='btn' onClick={routerHandler}>Add Article</Button>
    </div>
</>
}

export default ViewArticles
