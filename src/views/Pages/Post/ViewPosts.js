import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import PostList from './PostList'

const ViewPosts = (props) => {
  const [setPosts] = useState()

  useEffect(() => {
     const sendRequest = async () => {
      try {
          const response = await fetch('http://localhost:8070/postManagement/posts')

          const responseData = await response.json()
 
          console.log(responseData)

          setPosts(responseData)
             
          if (!response.ok()) {
            throw new Error(responseData.message)
        }

      } catch (err) {
      }
     } 

     sendRequest()
  }, [])

  return (
    <div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{props.name}</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
        {/* <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardBody>
          <Card>
             {posts && <PostList  data = {posts}/>}
             {!posts && <p>There is no Posts</p>}
          </Card>
        </CardBody>
      </Card> */}

    </div>
  )
}

export default ViewPosts
