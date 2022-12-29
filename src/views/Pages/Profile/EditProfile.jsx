import React, { useEffect, useState } from 'react'
import { Button, Card, CardGroup } from 'react-bootstrap'
// import { useNavigate, useParams } from 'react-router-dom'
import { CardTitle, Input } from 'reactstrap'

function EditProfile() {
        // const navigate = useNavigate()
        // const {id} = useParams()
        const [firstname, setFirstName] = useState('')
        const [lastname, setLastName] = useState('')
        const [firstNameValidate, setFirstNameValidate] = useState(true)
        const [lastNameValidate, setLastNameValidate] = useState(true)
   
        
        useEffect(() => {
                setFirstName(JSON.parse(localStorage.getItem('user')).firstname)
                setLastName(JSON.parse(localStorage.getItem('user')).lastname)
        }, [])

        const firstNameHandler = (e) => {
                if (e.target.value.trim() === '') {
                    setFirstNameValidate(false)
                } else {
                    setFirstNameValidate(true)
                    setFirstName(e.target.value)
                }
        }

        const lastNameHandler = (e) => {
                if (e.target.value.trim() === '') {
                    setLastNameValidate(false)
                } else {
                    setLastNameValidate(true)
                    setLastName(e.target.value)
                }
        }

  
        const submitHandler =  async (e) => {
            e.preventDefault()

            console.log(firstname)
            console.log(lastname)
                if (firstname.trim() === '') {
                    console.log('firstname', firstname)
                    setFirstNameValidate(false)
                    return
                }

                if (lastname.trim() === '') {
                    console.log('lastname', lastname)

                    lastNameValidate(false)
                    return
                }

            
               console.log('validate')
                // try {
                //     const response = await fetch(`http://68.178.164.166:8070//user/${id}/updateAdmin`, {method:"PUT", 
                //     headers : {"Content-Type":"application/json"}, 
                //     body :JSON.stringify({
                //         firstname,
                //         lastname,
                //         email
                //         })
                //     })
            
                //     const responseData = await response.json()
            
                //     console.log(responseData)

                //     localStorage.removeItem('user')
                //     localStorage.setItem('user', JSON.stringify(responseData))

                //     if (!response.ok) {
                //         throw new Error(responseData.message)
                //     }
            
                //     setEmail('')
                //     setFirstName('')
                //     setLastName('')
                //     } catch (err) { 
                //         console.log(err)
                //     }

                // navigate('/profile')
            }
    
        return (
        <Card>
            <form onSubmit={submitHandler} className='form-control col-12'>
                <CardGroup className='group'>
                    <CardTitle>FirstName</CardTitle>
                    <Input onChange={firstNameHandler} value={firstname}  />
                    {!firstNameValidate && <p style={{color:"Red"}}>FirstName should not be Empty</p>}
                </CardGroup>
    
                <CardGroup className='group'>
                    <CardTitle>LastName</CardTitle>
                    <Input onChange={lastNameHandler}  value={lastname}  />
                    {!lastNameValidate && <p style={{color:"Red"}}>LastName should not be empty</p>}
                </CardGroup>

               
                <Button type='submit' className='me-1 mt-1' color='primary'>Update</Button>
            </form>
        </Card>
        )
}

export default EditProfile
