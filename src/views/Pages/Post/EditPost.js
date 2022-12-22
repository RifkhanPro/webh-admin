import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardTitle, Input, CardGroup} from "reactstrap"

const EditPost = () => {
const { id } = useParams()

    const [name, nameChange] = useState("")
    const [description, descriptionChange] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8070/postManagement/posts/${id}`).then((res) => {
            return res.json()
        }).then((resp) => {
            nameChange(resp.post.name)
            descriptionChange(resp.post.description)
            console.log(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const navigate = useNavigate()

    const handlesubmit = (e) => {
        e.preventDefault()
        const postData = {nameChange, descriptionChange}
        
  
        fetch(`http://localhost:8070/postManagement/posts/${id}`, {
          method:"PUT",
          headers:{"content-type":"application/json"},
          body:JSON.stringify(postData.post)
        }).then((res) => {
          console.log(res)
          alert('Updated successfully.')
          navigate('/')
        }).catch((err) => {
          console.log(err.message)
        })
  
      }
    return (
    <Card>
      <form onSubmit = {handlesubmit} className="m-2">
        <CardGroup className="group">
          <CardTitle>Name</CardTitle>
          <Input 
          onChange = {e => nameChange(e.target.value)}
          value = {name} 
          type = "text" />
        </CardGroup> 

        <CardGroup className="group">
          <CardTitle>Description</CardTitle>
          <Input
            onChange = {e => descriptionChange(e.target.value)}
            value = {description}
            type = "text"
          />
        </CardGroup> 

        {/* <CardGroup className="group">
          <CardTitle>Email</CardTitle>
          <Input
            onChange = {e => emailchange(e.target.value)}
            value = {email}
            type = "email"
          />
        </CardGroup>  */}

        <Button type = "submit" className = "btn">
          Submit
        </Button>
      </form>
    </Card>
  )
}

export default EditPost