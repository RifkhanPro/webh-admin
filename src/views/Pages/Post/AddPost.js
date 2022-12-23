import { React, useState } from "react"
import { Button, Card, CardGroup, CardTitle, FormGroup, Input, Row, Col, Label, InputGroup} from "reactstrap"
import { Link, useNavigate } from "react-router-dom"

function AddPost() {
  
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const navigate = useNavigate()
  const nameHandler = (e) => {
    setName(e.target.value)
  }
  const descriptionHandler = (e) => {
    setDescription(e.target.value)
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault()
    const postData = {name, description }
    
    fetch("http://localhost:8070/postManagement/create", {
        method:"POST",
        headers:{"content-type":"application/json"}, 
        body:JSON.stringify(postData)
      }).then((res) => {
        console.log(res)
        alert('Saved successfully.')
        navigate('/posts')
      }).catch((err) => {
        console.log(err.message)
      })

    }
  return (
    <Card>
      <Col className="col-12">
        <form onSubmit={formSubmitHandler} className="m-2">
          <CardGroup className="group col-12">
          <Label>Name</Label>
            <Input 
              onChange={nameHandler} 
              value={name} 
              type="text" 
              placeholder="Enter Name"
            />
          </CardGroup> 

          <CardGroup className="group">
          <Label>Description</Label>
            <Input
              onChange={descriptionHandler}
              value={description}
              type="textarea"
              rows='5'
              placeholder="Enter Description"
            />
          </CardGroup> 

          <Button className='me-1' color='primary' type='submit'>
            Submit
          </Button>
        </form>
      </Col>
    </Card>
  )
}

export default AddPost

// <Row>
//           <Col sm="12">
//             <Label className="form-label">Name</Label>
//             <InputGroup className="input-group-merge mb-1">
//               <Input
//                 type="text"
//                 name="name"
//                 placeholder="Enter Name"
//                 onChange={nameHandler}
//                 value={name}
//                 // onChange={(e) => setName(e.target.value)}
//               />
//             </InputGroup>
//           </Col>
//           <Col sm="12">
//             <Label className="form-label" for="EmailVerticalIcons">
//               Topic
//             </Label>
//             <InputGroup className="input-group-merge mb-1">
//               <Input
//                 type="text"
//                 name="description"
//                 placeholder="Enter Description"
//                 // onChange={(e) => setTopic(e.target.value)}
//                 onChange={descriptionHandler}
//                 value={description}
//               />
//             </InputGroup>
//           </Col>
//           <Col sm="12">
//             <Label className="form-label" for="IconsMobile">
//               Image
//             </Label>
//             <InputGroup className="input-group-merge mb-1">
//               <Input type="file" id="postImage" name="image" />
//             </InputGroup>
//           </Col>
//           <Col sm="12">
//             <div className="d-flex">
//               <Button
//                 className="me-1"
//                 color="primary"
//                 type="submit"
//                 // onClick={(e) => e.preventDefault()}
//               >
//                 Submit
//               </Button>
//               <Button
//                 outline
//                 color="secondary"
//                 type="reset"
//                 // onClick={postData}
//               >
//                 Reset
//               </Button>
//             </div>
//           </Col>
//         </Row>