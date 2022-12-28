import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row } from 'reactstrap'
import './homeItem.css'
import { Mail, FileText, Folder, Award, User, List, TrendingUp, Search, HelpCircle, MessageCircle, BarChart2, Paperclip, Type, Info, Eye } from 'react-feather'
const Home = () => {
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

    return <>
      {user ? <div>
        <Card>
         <CardBody>
          <Row>
           {/* Post Count  */}
          <div className="skill_card">
            <div className="title">Total Posts</div>
            <div className="count">{40}</div>
            <Link to='/postManagements' className='btn btn-primary mb-1'>All Posts</Link>
          </div>

          {/* Blog Count  */}
          <div className="skill_card">
            <div className="title">Total Blogs</div>
            <div className="count">{100}</div>
             <Link to='/blogs' className='btn btn-primary mb-1'>All Blogs</Link>
          </div>
        
          {/* Article Count  */}
          <div className="skill_card">
            <div className="title">Total Articles</div>
            <div className="count">{250}</div>
            <Link to='/articles' className='btn btn-primary mb-1'>All Articles</Link>
          </div>

          {/* Topic Count  */}
          <div className="skill_card">
            <div className="title">Total Topic</div>
            <div className="count">{0}</div>
            <Link to='/topics' className='btn btn-primary mb-1'>All Topics</Link>
          </div>
        
          {/* Topic Posts Count  */}
          <div className="skill_card">
            <div className="title">TopicPosts</div>
            <div className="count">{2}</div>
            <Link to='/topicPosts' className='btn btn-primary mb-1'>All TopicPosts</Link>
          </div>

          {/* Advertisements Count  */}
          <div className="skill_card">
            <div className="title">Advertisements</div>
            <div className="count">{10}</div>
            <Link to='/advertisements' className='btn btn-primary mb-1'>Advertisement</Link>
          </div>

          {/* News Count  */}
          <div className="skill_card">
            <div className="title">News</div>
            <div className="count">{30}</div>
            <Link to='/news' className='btn btn-primary mb-1'>All News</Link>
          </div>
        
          {/* User Count  */}
          <div className="skill_card">
            <div className="title">Users</div>
            <div className="count">{11}</div>
            <Link to='/user' className='btn btn-primary mb-1'>All Users</Link>
          </div>
          </Row>
          </CardBody>
        </Card>
      </div> : <></> }
    </>
}

export default Home
