/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
import './AddSkill.css'
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
// import { useNavigate } from 'react-router-dom'

function AddFeedback() {

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [industry, setIndustry] = useState()
  const [valid, setValid] = useState(false)

  // const navigate = useNavigate()
  useEffect(() => {
      setValid(
        // firstName.
      )
  }, [])
  const firstNameHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      console.log(e.target.value)
      setFirstName(e.target.value)
    }
  }
  const lastNameHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      console.log(e.target.value)

      setLastName(e.target.value)
    }

  }
  const emailHandler = (e) => {
    if (e.target.value.trim().length > 0 && e.target.value.trim().includes('@')) {
      console.log(e.target.value)

      setEmail(e.target.value)
    }

	}

  const messageHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      console.log(e.target.value)

      setMessage(e.target.value)
    }
	}

  const industryHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      console.log(e.target.value)

      setIndustry(e.target.value)
    }
	}


  const submitHandler =  async (e) => {
    e.preventDefault()

    if (valid) {
     
      // try {
      //   const response = await fetch('http://localhost:8070/feedback', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
      //       firstName,
      //       lastName,
      //       email,
      //       industry,
      //       message
      //     })
      //   })
  
      //   const responseData = await response.json()
  
      //   if (!response.ok) {
      //     throw new Error(responseData.message)
      //   }
  
  
      //   setFirstName('')
      //   setLastName('')
      //   setMessage('')
      //   setEmail('')
      //   setIndustry('')

      // } catch (err) { 
      //   //
      // }
    }

    // navigate('/feedbacks')
  }

  return (
    <Card>
      <form onSubmit={submitHandler}>
         

          <CardGroup className='group'>
              <CardTitle>FirstName</CardTitle>
              <Input onChange={firstNameHandler} value={firstName} type='text'/>
          </CardGroup>

          
          <CardGroup className='group'>
              <CardTitle>LastName</CardTitle>
              <Input onChange={lastNameHandler} value={lastName} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Email</CardTitle>
              <Input onChange={emailHandler} value={email} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Industry</CardTitle>
              <Input onChange={industryHandler} value={industry} type='text'/>
          </CardGroup>

          <CardGroup className='group'>
              <CardTitle>Message</CardTitle>
              <Input onChange={messageHandler} value={message} type='text'/>
          </CardGroup>

          <Button type='submit' className='btn' >Submit</Button>
      </form>
    </Card>
  )
}

export default AddFeedback
