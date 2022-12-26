import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardTitle, CardHeader, CardBody, Input, Row, Col, Label, Form, CardGroup} from "reactstrap"

const EditUser = () => {
  
const { id } = useParams()

    const [firstname, fnamechange] = useState("")
    const [lastname, lnamechange] = useState("")
    const [email, emailchange] = useState("")
    const [phone, phonechange] = useState("")
    // const [password, passchange] = useState("")
    const [status, statuschange] = useState("")
    const [points, pointsChange] = useState(0)

    const min = 0
    const max = 100

    const pointsChangeHandler = (event) => {
      const value = Math.max(min, Math.min(max, Number(event.target.value)))
      pointsChange(value)
    }

    useEffect(() => {
        fetch(`http://68.178.164.166:8070/user/${id}`).then((res) => {
            return res.json()
        }).then((resp) => {
            // idchange(resp.id)
            fnamechange(resp.result.firstname)
            lnamechange(resp.result.lastname)
            emailchange(resp.result.email)
            phonechange(resp.result.phone)
            statuschange(resp.result.status)
            // pointsChange(resp.result.points)
            console.log(resp.result)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    // const[id,idchange]=useState("")


    const navigate = useNavigate()

    const handlesubmit = (e) => {
        e.preventDefault()
        const userData = {points}
        
  
        fetch(`http://68.178.164.166:8070/user/${id}/changePoints`, {
          method:"PUT",
          headers:{"content-type":"application/json"},
          body:JSON.stringify(userData)
        }).then((res) => {
          console.log(res)
          alert('Updated successfully.')
          navigate('/user')
        }).catch((err) => {
          console.log(err.message)
        })
  
      }
    return (
    // <div>EditUser</div>
    <Card>
      <form onSubmit = {handlesubmit} className="m-2">
        <CardGroup className="group">
          <CardTitle>First Name</CardTitle>
          <Input 
          onChange = {e => fnamechange(e.target.value)}
          value = {firstname} 
          disabled
          type = "text" />
        </CardGroup> 

        <CardGroup className="group">
          <CardTitle>Last Name</CardTitle>
          <Input
            onChange = {e => lnamechange(e.target.value)}
            value = {lastname}
            type = "text"
          disabled

          />
        </CardGroup> 

        <CardGroup className="group">
          <CardTitle>Email</CardTitle>
          <Input
            onChange = {e => emailchange(e.target.value)}
            value = {email}
            type = "email"
          disabled

          />
        </CardGroup> 

        <CardGroup className="group">
          <CardTitle>Phone</CardTitle>
          <Input
            onChange = {e => phonechange(e.target.value)}
            value = {phone}
            type = "text"
          disabled

          />
        </CardGroup> 
{/* 
        <CardGroup className="group">
          <CardTitle>Password</CardTitle>
          <Input
            onChange = {e => passchange(e.target.value)}
            value = {password}
            type="password"
          />
        </CardGroup>  */}

        <CardGroup className="group">
          <CardTitle>Status</CardTitle>
          <Input
            onChange = {e => statuschange(e.target.value)}
            value = {status}
            type = "text"
            disabled

          />
        </CardGroup> 

        <CardGroup className="group">
          <CardTitle>Profile Points</CardTitle>
          <Input
            onChange = {pointsChangeHandler}
            value = {points}
            type = "number"
          />
        </CardGroup> 
        <Button type = "submit" className = "btn">
          Submit
        </Button>
      </form>
    </Card>
  )
}

export default EditUser