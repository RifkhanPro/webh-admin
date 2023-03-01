/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
import { useSkin } from '@hooks/useSkin'
import { Link, useNavigate } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
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
import { GoogleLogin } from '@leecheuk/react-google-login'
import { gapi } from 'gapi-script'

const Login = () => {
	const { skin } = useSkin()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const [user, setUser] = useState({ email: '', password: '', err: '' })
	// const [showPassword, setShowPassword] = useState()

	const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
		source = require(`@src/assets/images/pages/${illustration}`).default

	//show hide password
	// function handleshowpassword () {
	//     setShowPassword((prevShowPassword) => !prevShowPassword)
	// }

	async function signIn(event) {
		event.preventDefault()

		const config = {
			headers: {
				'content-Type': 'application/json'
			}
		}

		try {
			//getting data from backend
			const { data } = await axios.post(
				'https://18.205.10.114:8070/user/admin-signin',
				{ email, password },
				config
			)

			//setting the user authorization token
			localStorage.setItem('userAuthToken', `User ${data.token}`)
			//setting user
			localStorage.setItem('user', JSON.stringify(data.result))
			navigate('/home')
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
	const googleAuthHandler = e => {
		e.preventDefault()
		window.open('/https:18.205.10.114:8070/user/google/callback', '_self')
	}

	useEffect(() => {
		gapi.load('client:auth2', () => {
			gapi.auth2.init({
				clientId:
					'266665356257-hegodqq6j6ivro28ml8bta1tgmlbqnq8.apps.googleusercontent.com'
			})
		})
	})

	const responseGoogle = async response => {
		if (response) {
			try {
				const res = await axios.post(
					'https://18.205.10.114:8070/user/admin_google_login',
					{ tokenId: response.tokenId }
				)
				//setting the user authorization token

				if (res.data.loggedIn) {
					console.log(res.data.loggedIn)
					localStorage.setItem('userAuthToken', `User ${res.data.token}`)
					//setting user
					localStorage.setItem('user', JSON.stringify(res.data.result))
					navigate('/home')
				} else if (!res.data.loggedIn) {
					localStorage.setItem('userData', JSON.stringify(res.data))
					navigate('/google-check')
				}

				console.log(res)
			} catch (error) {
				console.log(error)
				if (error.response.status === 404) {
					swal(
						'User cannot find by email!',
						'Check the email and password!',
						'error'
					)
				} else if (error.response.status === 400) {
					swal(
						'Your Cant Access this Site!',
						'Check the email and password!',
						'error'
					)
				} else if (error.response.status === 401) {
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
						<CardText className="mb-2">
							Please sign-in to your account as an admin
						</CardText>
						<Form
							className="auth-login-form mt-2"
							// onSubmit={e => e.preventDefault()}
							onSubmit={signIn}>
							<div className="mb-1">
								<Label className="form-label" for="login-email">
									Email
								</Label>
								<Input
									type="email"
									id="login-email"
									placeholder="john@example.com"
									name="email"
									autoFocus
									onChange={event => {
										setEmail(event.target.value)
									}}
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
									// handleShowPassword={handleshowpassword}
								/>
								<Link to="/forgot-password">
									<small style={{ float: 'right' }}>Forgot Password?</small>
								</Link>
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
							<div className="login-with-google">
								<GoogleLogin
									// clientId= "395423356530-p3dcv116o61fa80d2rsv8sivettc562k.apps.googleusercontent.com"
									clientId="266665356257-hegodqq6j6ivro28ml8bta1tgmlbqnq8.apps.googleusercontent.com"
									buttonText="Login with google"
									onSuccess={responseGoogle}
									cookiePolicy={'single_host_origin'}
								/>
							</div>
						</Form>
					</Col>
				</Col>
			</Row>
		</div>
	)
}

export default Login
