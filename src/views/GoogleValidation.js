/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
import { useSkin } from '@hooks/useSkin'
import { Link, useNavigate } from 'react-router-dom'

import InputPasswordToggle from '@components/input-password-toggle'
import './Login.css'
import {
	Row,
	Col,
	CardTitle,
	CardText,
	Form,
	Label,
	Input,
	Button
} from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'
import swal from 'sweetalert'
import logo from '../../src/assets/images/logo/webh_logo.png'

const GoogleValidation = () => {
	const { skin } = useSkin()
	const [password, setPassword] = useState('')
	const email = JSON.parse(localStorage.getItem('userData')).email
	const tokenId = JSON.parse(localStorage.getItem('userData')).result
	const navigate = useNavigate()
	const [user, setUser] = useState({ password: '', err: '' })

	const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
		source = require(`@src/assets/images/pages/${illustration}`).default

	async function signIn(event) {
		event.preventDefault()

		try {
			//getting data from backend
			const { data } = await axios.post(
				'https://localhost:8070/user/admin_google_login/validation',
				{ password, tokenId }
			)

			//setting the user authorization token

			if (data.loggedIn) {
				localStorage.setItem('userAuthToken', `User ${data.token}`)
				//setting user
				localStorage.setItem('user', JSON.stringify(data.result))
				navigate('/home')
			}
		} catch (error) {
			if (error.response.status === 404) {
				swal(
					'User cannot find by email!',
					'Check the email and password!',
					'error'
				)
			} else if (error.response.status === 400) {
				swal(
					'Incorrect Email or Password!',
					'Check the email and password!',
					'error'
				)
			} else {
				swal(
					'Incorrect Email or Password!',
					'Check the email and password!',
					'error'
				)
			}
		}
	}

	return (
		<div className="auth-wrapper auth-cover">
			<Row className="auth-inner m-0">
				<Link className="brand-logo" to="/" onClick={e => e.preventDefault()}>
					<div style={{ display: 'flex' }}>
						<img
							src={logo}
							style={{ width: '50px', height: '40px', marginTop: '5px' }}
						/>
						<h1
							className="brand-text text-primary ms-1"
							style={{ fontSize: '40px' }}>
							WebH Admin
						</h1>
					</div>
				</Link>
				<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img className="img-fluid" src={source} alt="Login Cover" />
					</div>
				</Col>
				<Col
					className="d-flex align-items-center auth-bg px-2 p-lg-5"
					lg="4"
					sm="12">
					<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
						<CardTitle tag="h2" className="fw-bold mb-1">
							Welcome to WebH Admin Panel! 👋
						</CardTitle>
						<CardText className="mb-2">Please give the password</CardText>
						<Form
							className="auth-login-form mt-2"
							// onSubmit={e => e.preventDefault()}
							onSubmit={signIn}>
							<div className="mb-1">
								<Label className="form-label" for="login-email" disabled={true}>
									Email
								</Label>
								<Input
									type="email"
									id="login-email"
									disabled={true}
									value={email}
								/>
							</div>
							<div className="mb-1">
								<div className="d-flex justify-content-between">
									<Label className="form-label" for="login-password">
										Password
									</Label>
								</div>
								<InputPasswordToggle
									className="input-group-merge"
									id="login-password"
									name="password"
									onChange={event => {
										setPassword(event.target.value)
									}}
								/>
							</div>
							<div className="form-check mb-1">
								<Input type="checkbox" id="remember-me" />
								<Label className="form-check-label" for="remember-me">
									Remember Me
								</Label>
							</div>
							<Button
								type="submit"
								color="primary"
								// onClick={handleshowpassword}
								block>
								Sign in
								{/* { showPassword ? "ok" : "not" } */}
							</Button>
						</Form>
					</Col>
				</Col>
			</Row>
		</div>
	)
}

export default GoogleValidation
