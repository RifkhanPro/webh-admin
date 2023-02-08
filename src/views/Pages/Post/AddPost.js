/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import { React, useState } from "react"
import { Button, Card, CardGroup, CardTitle, FormGroup, Input, Row, Col, Label, InputGroup} from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

function AddPost() {
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [nameValidate, setNameValidate] = useState(true)
  const [descriptionValidate, setDescValidate] = useState(true)
  const [imageValidate, setImageValidate] = useState(true)
  const navigate = useNavigate()

  const nameHandler = (e) => {
    if (e.target.value.trim() === '') {
      setNameValidate(false)
    } else {
      setNameValidate(true)
      setName(e.target.value)

    }
  }
  const descHandler = (e) => {
    if (e.target.value.trim() === '') {
      setDescValidate(false)
    } else {
      setDescValidate(true)
      setDescription(e.target.value)

    }
  }
  const catchFileDataHandler = (e) => {
   
    if (e.name === '') {
      setImageValidate(false)
    } else {
      setImageValidate(true)
      setSelectedFile(e)
    }
	}

  const SubmitHandler = async (e) => {
    e.preventDefault()
    if (name.trim() === '') {
      setNameValidate(false)
      return
    }

    if (description.trim() === '') {
      setDescValidate(false)
      return
    }

    if (selectedFile === undefined) {
      setImageValidate(false)
      return
    }

    let image
    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("upload_preset", "feed_images")
    console.log('validate')

    try {
      await axios
        .post(
          "https://api.cloudinary.com/v1_1/movie-reservation/image/upload",
          formData
        )
        .then((res) => {
          image = res.data.secure_url
        })
    } catch (error) {
      alert(error)
    }

    try {
      const response = await fetch('http://44.202.187.100:8070/postManagement/create', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
          name,
          description,
          image
        })
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      }


      setName('')
      setDescription('')
    } catch (err) { 
      //
    }

  navigate('/postManagements')
}
    // fetch("http://44.202.187.100:8070/postManagement/create", {
    //     method:"POST",
    //     headers:{"content-type":"application/json"}, 
    //     body:JSON.stringify(postData)
    //   }).then((res) => {
    //     console.log(res)
    //     alert('Saved successfully.')
    //     navigate('/posts')
    //   }).catch((err) => {
    //     console.log(err.message)
    //   })

    // }
  return (
    <Card>
      <Col className="col-12">
      <form onSubmit={submitHandler} className='form-control'>
            <CardGroup className='group'>
                <Label>Name</Label>
                <Input onChange={nameHandler} value={name} type='text'/>
                {!nameValidate && <p>Name should not be Empty</p>}
            </CardGroup>

            <CardGroup className='group'>
                <Label>Description</Label>
                <Input onChange={descHandler}  value={description} type='textarea' rows='5'/>
                {!descriptionValidate && <p>Description should not be empty</p>}
            </CardGroup>
            
            <CardGroup className='group'>
                <Label>Add Post Image</Label>
            </CardGroup>
            <div>
            <ImageUploader onInput={catchFileDataHandler}/>
                {!imageValidate && <p>Image should be selected</p>}
            </div>

            <Button type='submit' className='me-1' color='primary'>Submit</Button>
        </form>
        {/* <form onSubmit={SubmitHandler} className="m-2">
          <CardGroup className="group col-12">
          <Label>Name</Label>
            <Input 
              onChange={nameHandler} 
              value={name} 
              type="text" 
              placeholder="Enter Name"
            />
            {!nameValidate && <p>Title should not be Empty</p>}
          </CardGroup> 

          <CardGroup className="group">
          <Label>Description</Label>
            <Input
              onChange={descHandler}
              value={description}
              type="textarea"
              rows='5'
              placeholder="Enter Description"
            />
          </CardGroup> 
          {!descriptionValidate && <p>Description should not be empty</p>}

          <CardGroup className='group'>
                <Label>Add Analytic Image</Label>
            </CardGroup>
            <div>
            <ImageUploader onInput={catchFileDataHandler}/>
                {!imageValidate && <p>Image should be selected</p>}
            </div>

          <Button className='me-1' color='primary' type='submit'>
            Submit
          </Button>
        </form> */}
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
