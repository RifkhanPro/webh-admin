import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Card, CardTitle, Input, CardGroup, Label} from "reactstrap"


const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [name, nameChange] = useState("")
    const [description, descriptionChange] = useState("")

    useEffect(() => {
        fetch(`http://44.202.187.100:8070/postManagement/posts/${id}`).then((res) => {
            return res.json()
        }).then((resp) => {
            nameChange(resp.post.name)
            descriptionChange(resp.post.description)
            console.log(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    const handlesubmit = (e) => {
        e.preventDefault()
        const postData = {name, description}
        
  
        fetch(`http://44.202.187.100:8070/postManagement/updatePost/${id}`, {
          method:"PUT",
          headers:{"content-type":"application/json"},
          body:JSON.stringify(postData)
        }).then((res) => {
          console.log(res)
          alert('Updated successfully.')
          navigate('/posts')
        }).catch((err) => {
          console.log(err.message)
        })
  
      }
    return (
    <Card>
      <CardTitle className="mt-2"><h3 className="m-2">Edit Post</h3></CardTitle>
      <form onSubmit = {handlesubmit} className="m-2">
        <CardGroup className="group">
          <Label>Name</Label>
          <Input 
          onChange = {e => nameChange(e.target.value)}
          value = {name} 
          type = "text" />
        </CardGroup> 

        <CardGroup className="group">
          <Label>Description</Label>
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

        <Button type = "submit" className = "me-1 mt-1" color="primary">
          Submit
        </Button>
      </form>
    </Card>
  )
}

export default EditPost