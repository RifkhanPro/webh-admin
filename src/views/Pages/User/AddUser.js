/* eslint-disable no-tabs */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
	Button,
	Card,
	CardTitle,
	CardHeader,
	CardBody,
	Input,
	Row,
	Col,
	Label,
	Form,
	CardGroup
} from 'reactstrap'

const AddUser = () => {
	const [firstName, setFirstName] = useState('')
	const [lastname, setlastName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	// const [status, setStatus] = useState("")
	// const [profilePoint, setProfilePoint] = useState("")

	const navigate = useNavigate()

	const nameHandler = e => {
		setFirstName(e.target.value)
	}
	const lastNameHandler = e => {
		setlastName(e.target.value)
	}
	const emailHandler = e => {
		setEmail(e.target.value)
	}
	const phoneHandler = e => {
		setPhone(e.target.value)
	}
	const passwordHandler = e => {
		setPassword(e.target.value)
	}

	const handlesubmit = async e => {
		e.preventDefault()
		const postData = { firstName, lastname, email, phone, password, status }

		fetch('http://44.202.187.100:8070/user/signup', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(postData)
		})
			.then(res => {
				alert('Saved successfully.')
				console.log(res)
				navigate('/')
			})
			.catch(err => {
				console.log(err.message)
			})
	}

	return (
		<Card>
			<form onSubmit={handlesubmit} className="m-2">
				<CardGroup className="group">
					<CardTitle>First Name</CardTitle>
					<Input onChange={nameHandler} value={firstName} type="text" />
				</CardGroup>

				<CardGroup className="group">
					<CardTitle>Last Name</CardTitle>
					<Input onChange={lastNameHandler} value={lastname} type="text" />
				</CardGroup>

				<CardGroup className="group">
					<CardTitle>Email</CardTitle>
					<Input onChange={emailHandler} value={email} type="email" />
				</CardGroup>

				<CardGroup className="group">
					<CardTitle>Phone</CardTitle>
					<Input onChange={phoneHandler} value={phone} type="text" />
				</CardGroup>

				<CardGroup className="group">
					<CardTitle>Password</CardTitle>
					<Input onChange={passwordHandler} value={password} type="password" />
				</CardGroup>

				<CardGroup className="group">
					<CardTitle>Status</CardTitle>
					<Input
						// onChange={statusChange}
						// value={status}
						type="text"
					/>
				</CardGroup>

				<Button type="submit" className="btn">
					Submit
				</Button>
			</form>
		</Card>
		// <div>
		//   <Card>
		//       <CardHeader>
		//         <CardTitle tag='h4'>Add User</CardTitle>
		//       </CardHeader>
		//         <CardBody>
		//           <Form onSubmit={handlesubmit}>
		//             <Row>
		//               <Col sm='12' className='mb-1'>
		//                 <Label className='form-label' for='firstName'>
		//                   First Name
		//                 </Label>
		//                 <Input
		//                   type='text'
		//                   name='firstname'
		//                   id='firstname'
		//                   placeholder='Enter First Name'
		//                   onChange = { e => firstNameChange(e.target.value)}
		//                   value={firstname}
		//                 />
		//               </Col>
		//               <Col sm='12' className='mb-1'>
		//                 <Label className='form-label' for='lastName'>
		//                   Last Name
		//                 </Label>
		//                 <Input
		//                   type='text'
		//                   name='lastname'
		//                   id='lastname'
		//                   placeholder='Enter Last Name'
		//                   onChange = { e => lastNameChange(e.target.value)}
		//                   value={lastname}
		//                 />
		//               </Col>
		//               <Col sm='12' className='mb-1'>
		//                 <Label className='form-label' for='mobileVertical'>
		//                   Email
		//                 </Label>
		//                 <Input
		//                   type='email'
		//                   name='email'
		//                   id='email'
		//                   placeholder='Enter Email'
		//                   onChange = { e => emailChange(e.target.value)}
		//                   value={email}
		//                 />
		//               </Col>
		//               <Col sm='12' className='mb-1'>
		//                 <Label className='form-label' for='mobileVertical'>
		//                   Password
		//                 </Label>
		//                 <Input
		//                   type='password'
		//                   name='password'
		//                   id='password'
		//                   placeholder='Enter Password'
		//                   onChange = { e => passwordChange(e.target.value)}
		//                   value={password}
		//                 />
		//               </Col>
		//               <Col sm='12' className='mb-1'>
		//                 <Label className='form-label' for='phone'>
		//                   Phone
		//                 </Label>
		//                 <Input
		//                   type='text'
		//                   name='phone'
		//                   id='phone'
		//                   placeholder='Enter Phone No'
		//                   onChange = { e => phoneChange(e.target.value)}
		//                   value={phone}
		//                 />
		//               </Col>
		//               <Col sm='12' className='mb-1'>
		//                 <Label className='form-label' for='status'>
		//                   Status
		//                 </Label>
		//                 <Input
		//                   type='text'
		//                   name='status'
		//                   id='status'
		//                   placeholder='Enter Status'
		//                   onChange = { e => statusChange(e.target.value)}
		//                   value={status}
		//                 />
		//               </Col>
		//               {/* <Col sm='12' className='mb-1'>
		//                 <Label className='form-label' for='profilePoint'>
		//                   Profile Point
		//                 </Label>
		//                 <Input
		//                   type='text'
		//                   name='profilePoint'
		//                   id='profilePoint'
		//                   placeholder='Enter Profile Point'
		//                   onChange = { e => profilePointChange(e.target.value)}
		//                   value={profilePoint}
		//                 />
		//               </Col> */}
		//               <Col sm='12'>
		//                 <div className='d-flex'>
		//                   <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
		//                     Submit
		//                   </Button>
		//                 </div>
		//               </Col>
		//             </Row>
		//           </Form>
		//         </CardBody>
		//       </Card>
		// </div>
	)
}

export default AddUser
