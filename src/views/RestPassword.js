/* eslint-disable multiline-ternary */
/* eslint-disable no-tabs */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
// ** React Imports
import { Link, useParams, useNavigate } from 'react-router-dom'
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import './ForgotPassword.css'
// ** Icons Imports
import { ChevronLeft } from 'react-feather'
import logo from '../../src/assets/images/logo/webh_logo.png'

// ** Reactstrap Imports
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

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { useRef, useEffect, useState } from 'react'
import swal from 'sweetalert'

const ResetPassword = () => {
	// ** Hooks
	const { skin } = useSkin()
	const { token } = useParams()
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const navigate = useNavigate()

	const [passwordValidate, setPasswordValidate] = useState(false)
	const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(false)

	const [passwordTouched, setPasswordTouched] = useState(false)
	const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)
	const [formValidate, setFormValidate] = useState(false)

	const validPassword = !passwordValidate && passwordTouched
	const validConfirmPassword =
		!confirmPasswordValidate && confirmPasswordTouched

	useEffect(() => {
		setFormValidate(
			!(
				password.trim() === '' ||
				password.trim().length < 8 ||
				password.trim().length > 20
			) &&
				!(
					confirmPassword.trim() === '' ||
					confirmPassword.trim().length < 8 ||
					confirmPassword.trim().length > 20 ||
					password.trim() !== confirmPassword.trim()
				)
		)
	}, [password, confirmPassword])

	const passwordHandler = e => {
		setPasswordTouched(true)
		setConfirmPasswordTouched(false)

		if (
			e.target.value.trim() === '' ||
			e.target.value.trim().length < 8 ||
			e.target.value.trim().length > 20
		) {
			setPasswordValidate(false)
		} else {
			setPasswordValidate(true)
		}
		setPassword(e.target.value)
	}

	const passwordBlurHandler = () => {
		setPasswordTouched(true)
		if (
			password.trim() === '' ||
			password.trim().length < 8 ||
			password.trim().length > 20
		) {
			// console.log('invalid')
			setPasswordValidate(false)
		} else {
			setPasswordValidate(true)
		}
	}

	const confirmPasswordHandler = e => {
		setConfirmPasswordTouched(true)
		if (
			e.target.value.trim() === '' ||
			e.target.value.trim().length < 8 ||
			e.target.value.trim().length > 20 ||
			password !== e.target.value.trim()
		) {
			setConfirmPasswordValidate(false)
		} else {
			setConfirmPasswordValidate(true)
		}
		setConfirmPassword(e.target.value)
	}

	const confirmPasswordBlurHandler = () => {
		setConfirmPasswordTouched(true)
		if (
			confirmPassword.trim() === '' ||
			confirmPassword.trim().length < 8 ||
			confirmPassword.trim().length > 20 ||
			password.trim() !== confirmPassword.trim()
		) {
			console.log('invalid')

			setConfirmPasswordValidate(false)
		} else {
			setConfirmPasswordValidate(true)
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()

		setPasswordTouched(true)
		setConfirmPasswordTouched(true)
		console.log(validConfirmPassword)

		if (formValidate) {
			console.log(validConfirmPassword)
			try {
				const response = await fetch(
					`https://localhost:8070/user/reset-password/${token}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							password
						})
					}
				)

				const responseData = await response.json()
				console.log(responseData)
				if (!response.ok) {
					throw new Error(responseData.message)
				}

				swal(
					'Password Changed Successfully!',
					'You can login using new password!',
					'success'
				)
				navigate('/login')
			} catch (e) {
				if (e.message === 'Your token may expired!') {
					swal('Something went wrong!', 'Your token may expired!!', 'error')
				} else if (e.message === 'Your token may expired!') {
					swal('Something went wrong!', 'Your token may expired!!', 'error')
				}
			}
		} else if (!confirmPassword) {
			swal('Something went wrong!', 'Password is not matched!', 'error')
		}
	}

	const illustration =
			skin === 'dark'
				? 'forgot-password-v2-dark.svg'
				: 'forgot-password-v2.svg',
		source = require(`@src/assets/images/pages/${illustration}`).default

	return (
		<div className="auth-wrapper auth-cover">
			<Row className="auth-inner m-0">
				<Link className="brand-logo" to="/" onClick={e => e.preventDefault()}>
					<svg viewBox="0 0 139 95" version="1.1" height="28">
						<defs>
							<linearGradient
								x1="100%"
								y1="10.5120544%"
								x2="50%"
								y2="89.4879456%"
								id="linearGradient-1">
								<stop stopColor="#000000" offset="0%"></stop>
								<stop stopColor="#FFFFFF" offset="100%"></stop>
							</linearGradient>
							<linearGradient
								x1="64.0437835%"
								y1="46.3276743%"
								x2="37.373316%"
								y2="100%"
								id="linearGradient-2">
								<stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
								<stop stopColor="#FFFFFF" offset="100%"></stop>
							</linearGradient>
						</defs>
					</svg>
					<img src={logo} alt="" className="forgot-password-page-webh-logo" />
					<h2 className="brand-text text-primary mx-1 forgot-password-page-webh-text">
						WEBH
					</h2>
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
							Reset Password? 🔒
						</CardTitle>

						<Form
							className="auth-forgot-password-form mt-2"
							onSubmit={handleSubmit}>
							<div className="mb-1">
								<Label className="form-label" for="login-email">
									New Password
								</Label>
								<input
									className="forgot-password-input"
									value={password}
									type="password"
									onChange={passwordHandler}
									onBlur={passwordBlurHandler}
									required
									autoFocus
								/>
								{validPassword && (
									<span style={{ color: 'red' }}>
										* Password must greater than 8 and shorter than 20
										characters
									</span>
								)}
							</div>

							<div className="mb-1">
								<Label className="form-label" for="login-email">
									Confirm Password
								</Label>
								<input
									className="forgot-password-input"
									value={confirmPassword}
									type="password"
									onChange={confirmPasswordHandler}
									onBlur={confirmPasswordBlurHandler}
									required
								/>
								{validConfirmPassword && (
									<span style={{ color: 'red' }}>
										* Confirm Password is not same
									</span>
								)}
							</div>

							<button
								type="submit"
								className="reset-password-btn"
								disabled={!formValidate}>
								Update
							</button>
						</Form>
					</Col>
				</Col>
			</Row>
		</div>
	)
}

export default ResetPassword
