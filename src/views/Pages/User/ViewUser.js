import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const ViewUser = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState()
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
                const response = await fetch(`http://localhost:8070/user/${id}`)

                const responseData = await response.json()

                console.log(responseData.result)

                setUserData(responseData.result)

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

          {userData && (
            <div className="m-2">
              <h2 className="mb-3">
                <b>{userData.firstname} {userData.lastname}</b> 
              </h2>
              <h3 className="mb-5">Contact Details</h3>
              <h5>Email : {userData.email}</h5>
              <h5>Phone : {userData.phone}</h5>
              <h5>Address : {userData.address}</h5>
              <h5>City : {userData.city}</h5>
              <h5>Country : {userData.country}</h5>
              <h5 className="mb-3">Zip : {userData.zip}</h5>
              
              <h3 className="mb-2">Personal Information</h3>
              <h5 className="mb-2">Status : {userData.status}</h5>
              <Link className="btn btn-primary mb-3" to="/user">
                All Users
              </Link>
            </div>
          )}
        </div>
      </div> : <></> }
  </>
}

export default ViewUser
