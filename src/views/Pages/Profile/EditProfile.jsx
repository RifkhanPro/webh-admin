import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddPostManagement.css'
function EditProfile() {
        const navigate = useNavigate()
        // const {id} = useParams()
        const [firstname, setFirstName] = useState('')
        const [lastname, setLastName] = useState('')
        const [firstNameValidate, setFirstNameValidate] = useState(true)
        const [lastNameValidate, setLastNameValidate] = useState(true)
   
        const [firstNameTouched, setFirstNameTouched] = useState(false)
        const [lastNameTouched, setLastNameTouched] = useState(false)

        const [formValidate, setFormValidate] = useState(false)

        const validFirstName = !firstNameValidate && firstNameTouched
        const validLastName = !lastNameValidate && lastNameTouched
        
        useEffect(() => {
            console.log(JSON.parse(localStorage.getItem('user')))
                setFirstName(JSON.parse(localStorage.getItem('user')).firstname)
                setLastName(JSON.parse(localStorage.getItem('user')).lastname)
        }, [])

        useEffect(() => {
            setFormValidate(firstNameValidate && lastNameValidate)
         }, [firstNameValidate, lastNameValidate])
        

        const firstNameHandler = (e) => {
            setFirstNameTouched(true)
                if (e.target.value.trim() === '') {
                    setFirstNameValidate(false)
                } else {
                    setFirstNameValidate(true)
                }
                setFirstName(e.target.value)
        }


        const lastNameHandler = (e) => {
            setLastNameTouched(true)
                if (e.target.value.trim() === '') {
                    setLastNameValidate(false)
                } else {
                    setLastNameValidate(true)
                }
                setLastName(e.target.value)
        }

        const firstNameBlurHandler = () => {
            setFirstNameTouched(true)
            if (firstname.trim() === '') {
                setFirstNameValidate(false)
            } else {
                setFirstNameValidate(true)
            }
        }

        const lastNameBlurHandler = () => {
            setLastNameTouched(true)
            if (lastname.trim() === '') {
                setLastNameValidate(false)
            } else {
                setLastNameValidate(true)
            }
        }
  
        const submitHandler =  async (e) => {
            e.preventDefault()

            setFirstNameTouched(true)
            setLastNameTouched(true)
            // /:id/updateAdmin
                try {
                const response = await fetch(`http://localhost:8070/user/${JSON.parse(localStorage.getItem('user'))._id}/updateAdmin`, 
                { method:"PUT", 
                    headers : {
                    "Content-Type":"application/json"
                    }, 
                    body :JSON.stringify({
                        firstname,
                        lastname
                    })
                })
                const responseData = await response.json()
                
                    if (!response.ok) {
                    throw new Error(responseData.message)
                }
                setFirstName('')
                setLastName('')
                console.log(responseData)

                localStorage.removeItem('user')
                localStorage.setItem('user', JSON.stringify(responseData))

                } catch (err) { 
                console.log(err)
                }
                console.log('validate')
                navigate('/profile')
               window.location.reload(true)
           
            }
    
        return <div  className='edit-postManagement-container'>
                <form onSubmit={submitHandler}  className='edit-postManagement-form'>
                    <div className='edit-postManagement-group'>
                        <h5>FirstName</h5>
                        <input  onChange={firstNameHandler} onBlur={firstNameBlurHandler} value={firstname}  type='text' placeholder='Enter Firstname'/>
                        {validFirstName && <p style={{color:"Red"}}>FirstName should not be Empty</p>}
                    </div>
                    <div className='edit-postManagement-group'>
                        <h5>LastName</h5>
                        <input onChange={lastNameHandler}  value={lastname} onBlur={lastNameBlurHandler}    type='text' placeholder='Enter Lastname'/>
                        {validLastName && <p style={{color:"Red"}}>LastName should not be Empty</p>}
                    </div>
                    <button type='submit' className='btn' color='primary' disabled={!formValidate}>Update</button>
                </form>
            </div>
       
}

export default EditProfile
