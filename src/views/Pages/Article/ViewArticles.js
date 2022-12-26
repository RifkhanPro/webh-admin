import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, ButtonToggle, Button } from 'reactstrap'
import BlogList  from './ArticleList'
import './ViewBlogs.css'

function ViewArticles() {
  const [articles, setArticles] = useState()
  const navigate = useNavigate()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState("")

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
     {user ? <div>
        <Card>
       
        <CardBody>
          <Card>
             {articles && <BlogList  data = {articles}/>}
             {!articles && <p>There is no Articles</p>}
          </Card>
        </CardBody>
      </Card> 
      <Button className='btn' onClick={routerHandler}>Add Article</Button>
    </div> : <></> }
</>
}

export default ViewArticles
