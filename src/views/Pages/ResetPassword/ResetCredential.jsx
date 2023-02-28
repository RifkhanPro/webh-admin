import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddPostManagement.css'

function ResetCredential() {
        const navigate = useNavigate()
        // const {id} = useParams()
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        // const [newPassword, setNewPassword] = useState('')

        const [emailValidate, setEmailValidate] = useState(true)
        const [passwordValidate, setPasswordValidate] = useState(false)
   
        const [emailTouched, setEmailTouched] = useState(false)
        const [passwordTouched, setPasswordTouched] = useState(false)
        // const [newPasswordTouched, setNewPasswordTouched] = useState(false)

        const [formValidate, setFormValidate] = useState(false)

        const validEmail = !emailValidate && emailTouched
        const validPassword = !passwordValidate && passwordTouched
        // const validNewPassword = !lastNameValidate && lastNameTouched
        
        useEffect(() => {
            console.log(JSON.parse(localStorage.getItem('user')))
                setEmail(JSON.parse(localStorage.getItem('user')).email)
        }, [])

        useEffect(() => {
            setFormValidate(emailValidate && passwordValidate)
         }, [emailValidate, passwordValidate])
        

        const emailHandler = (e) => {
            setEmailTouched(true)
                if (e.target.value.trim() === '' || !e.target.value.length < 9) {
                    setEmailValidate(false)
                } else {
                    setEmailValidate(true)
                }
                setEmail(e.target.value)
        }


        const passwordHandler = (e) => {
            setPasswordTouched(true)
                if (e.target.value.trim() === '' || e.target.value.trim().length < 9) {
                    setPasswordValidate(false)
                } else {
                    setPasswordValidate(true)
                }
                setPassword(e.target.value)
        }

        const emailBlurHandler = () => {
            setEmailTouched(true)
            if (email.trim() === '' || !email.trim().length < 9) {
                setEmailValidate(false)
            } else {
                setEmailValidate(true)
            }
        }

        const passwordBlurHandler = () => {
            setPasswordTouched(true)
            if (password.trim() === '' ||  password.trim().length < 9) {
                setPasswordValidate(false)
            } else {
                setPasswordValidate(true)
            }
        }
  
        const submitHandler =  async (e) => {
            e.preventDefault()

            setEmailTouched(true)
            setPasswordTouched(true)
                try {
                const response = await fetch(`https://localhost:8070/user/${JSON.parse(localStorage.getItem('user'))._id}/resetAdminCredential`, 
                { method:"PUT", 
                    headers : {
                    "Content-Type":"application/json"
                    }, 
                    body :JSON.stringify({
                        email,
                        password
                    })
                })
                const responseData = await response.json()
                
                    if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setEmail('')
                setPassword('')
                console.log(responseData)

                localStorage.removeItem('user')
                localStorage.setItem('user', JSON.stringify(responseData))

                } catch (err) { 
                console.log(err)
                }
                navigate('/login')
            }
    
        return <div  className='edit-postManagement-container'>
                <form onSubmit={submitHandler}  className='edit-postManagement-form'>
                    <div className='edit-postManagement-group'>
                        <h5>New Password</h5>
                        <input  onChange={emailHandler} onBlur={emailBlurHandler} value={email}  type='password' placeholder='Enter New Password'/>
                        {validEmail && <p style={{color:"Red"}}>Email should not be Empty</p>}
                    </div>
                    <div className='edit-postManagement-group'>
                        <h5>Confirm Password</h5>
                        <input onChange={passwordHandler}  onBlur={passwordBlurHandler}    type='password' placeholder='Enter Confirm Password'/>
                        {validPassword && <p style={{color:"Red"}}>Password should not be Empty and has atleast 9 letters</p>}
                    </div>
                    <button type='submit' className='btn' color='primary' disabled={!formValidate}>Update</button>
                </form>
            </div>
       
}

export default ResetCredential
