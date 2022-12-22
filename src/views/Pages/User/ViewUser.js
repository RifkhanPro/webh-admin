import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
const ViewUser = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState()

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
  return (
    <div>
     {userData && <div className="details">
            {userData.firstname}
            {userData.lastname}
        </div>}
    </div>
  )
}

export default ViewUser
