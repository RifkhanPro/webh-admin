import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const ViewQuestion = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState()

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
                const response = await fetch(`http://68.178.164.166:8070/question/${id}`)

                const responseData = await response.json()

                console.log(responseData)

                setQuestion(responseData)

                if (!response.ok()) {
                    throw new Error(responseData.message)
                }
            } catch (err) {
                console.log(err)
            }
        } 
        sendRequest()
    }, [id])

  return <>
    {user ? <div className="container">
        <div className="card row" style={{ textAlign: "left" }}>
          <div className="card-title">
            {/* <h2>User Create</h2> */}
          </div>
          <div className="card-body"></div>

          {question && (
            <div className="m-2">
              <h2 className="mb-3">
                <b>{question.firstname} {question.lastname}</b> 
              </h2>
              <h3 className="mb-5">Question Details</h3>
              <h5>Question : {question.question}</h5>
              <h5>Email : {question.email}</h5>
              <h5>Mobile : {question.mobile}</h5>
               
              <div><img src={question.image} style={{ width:'20%', marginBottom: '1rem' }} /></div>
              <Link className="btn btn-primary mb-3" to="/questions">
                All Questions
              </Link>
            </div>
          )}
        </div>
      </div> : <></> }
  </>
}

export default ViewQuestion