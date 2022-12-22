import { React, useState } from "react"
import { Button, Card, CardGroup, CardTitle, FormGroup, Input, Row, Col, Label, InputGroup} from "reactstrap"

function AddPost() {
  
  const [name, setName] = useState()
  const [description, setDescription] = useState()

  const nameHandler = (e) => {
    setName(e.target.value)
  }
  const descriptionHandler = (e) => {
    setDescription(e.target.value)
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        "http://localhost:8070/postManagement/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: name,
            desc: description
          })
        }
      )

      const responseFormData = await response.json()

      console.log(responseFormData)

      if (!response.ok) {
        throw new Error(responseFormData.message)
      }

    //   setName('')
    //   setDescription('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <form onSubmit={formSubmitHandler} className="m-2">
        <CardGroup className="group">
          <CardTitle>Title</CardTitle>
          <Input onChange={nameHandler} value={name} type="text" />
        </CardGroup> 

        <CardGroup className="group">
          <CardTitle>Description</CardTitle>
          <Input
            onChange={descriptionHandler}
            value={description}
            type="text"
          />
        </CardGroup> 

        <Button type="submit" className="btn">
          Submit
        </Button>
      </form>
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