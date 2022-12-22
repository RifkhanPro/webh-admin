import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, CardTitle, CardHeader, CardBody, Input, Row, Col, Label, InputGroup, Form} from "reactstrap"

const AddUser = () => {

    const [firstName, firstNameChange] = useState("")
    const [lastName, lastNameChange] = useState("")
    const [email, emailChange] = useState("")
    const [phone, phoneChange] = useState("")
    const [password, passwordChange] = useState("")
    const [status, statusChange] = useState("")
    // const [profilePoint, profilePointChange] = useState("")

    const navigate = useNavigate()

    const handlesubmit = (e) => {
      e.preventDefault()
      const postData = {firstName, lastName, email, phone, status }
      

      fetch("http://localhost:8070/user/signup", {
        method:"POST",
        headers:{"content-type":"application/json"}, 
        body:JSON.stringify(postData)
      }).then((res) => {
        alert('Saved successfully.')
        console.log(res)
        navigate('/')
      }).catch((err) => {
        console.log(err.message)
      })

    }

    return (
        <div>
          <Card>
              <CardHeader>
                <CardTitle tag='h4'>Add User</CardTitle>
              </CardHeader>
                <CardBody>
                  <Form onSubmit={handlesubmit}>
                    <Row>
                      <Col sm='12' className='mb-1'>
                        <Label className='form-label' for='firstName'>
                          First Name
                        </Label>
                        <Input 
                          type='text' 
                          name='firstname' 
                          id='firstName' 
                          placeholder='Enter First Name' 
                          onChange = { e => firstNameChange(e.target.value)}
                          value={firstName}
                        />
                      </Col>
                      <Col sm='12' className='mb-1'>
                        <Label className='form-label' for='lastName'>
                          Last Name
                        </Label>
                        <Input 
                          type='text' 
                          name='lastname' 
                          id='lastname' 
                          placeholder='Enter Last Name' 
                          onChange = { e => lastNameChange(e.target.value)}
                          value={lastName}
                        />
                      </Col>
                      <Col sm='12' className='mb-1'>
                        <Label className='form-label' for='mobileVertical'>
                          Email
                        </Label>
                        <Input 
                          type='email' 
                          name='email' 
                          id='email' 
                          placeholder='Enter Email'
                          onChange = { e => emailChange(e.target.value)}
                          value={email} 
                        />
                      </Col>
                      <Col sm='12' className='mb-1'>
                        <Label className='form-label' for='mobileVertical'>
                          Password
                        </Label>
                        <Input 
                          type='password' 
                          name='password' 
                          id='password' 
                          placeholder='Enter Password'
                          onChange = { e => passwordChange(e.target.value)}
                          value={password} 
                        />
                      </Col>
                      <Col sm='12' className='mb-1'>
                        <Label className='form-label' for='phone'>
                          Phone
                        </Label>
                        <Input 
                          type='text' 
                          name='phone' 
                          id='phone' 
                          placeholder='Enter Phone No' 
                          onChange = { e => phoneChange(e.target.value)}
                          value={phone} 
                        />
                      </Col>
                      <Col sm='12' className='mb-1'>
                        <Label className='form-label' for='status'>
                          Status
                        </Label>
                        <Input 
                          type='text' 
                          name='status' 
                          id='status' 
                          placeholder='Enter Status' 
                          onChange = { e => statusChange(e.target.value)}
                          value={status} 
                        />
                      </Col>
                      {/* <Col sm='12' className='mb-1'>
                        <Label className='form-label' for='profilePoint'>
                          Profile Point
                        </Label>
                        <Input 
                          type='text' 
                          name='profilePoint' 
                          id='profilePoint' 
                          placeholder='Enter Profile Point' 
                          onChange = { e => profilePointChange(e.target.value)}
                          value={profilePoint} 
                        />
                      </Col> */}
                      <Col sm='12'>
                        <div className='d-flex'>
                          <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                            Submit
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
        </div>
    )
}

export default AddUser