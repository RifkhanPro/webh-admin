import {React, useState} from 'react'
// import {
//     MDBValidation,
//     MDBValidationItem,
//     MDBInput,
//     MDBBtn,
//     MDBCheckbox
//   } from 'mdb-react-ui-kit'

const Test = () => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    // const navigate = useNavigate()
    // const nameHandler = (e) => {
    //   setName(e.target.value)
    // }
    // const descriptionHandler = (e) => {
    //   setDescription(e.target.value)
    // }
    return (
        <MDBValidation className='row g-3'>
        <MDBValidationItem className='col-md-4'>
            <MDBInput
            onChange = {e => setName(e.target.value)}
            name='fname'
            // onChange={onChange}
            value={name}
            id='validationCustom01'
            required
            label='First name'
            placeholder='Name'
            />
        </MDBValidationItem>
        <MDBValidationItem className='col-md-4'>
            <MDBInput
            onChange = {e => setDescription(e.target.value)}
            name='lname'
            // onChange={onChange}
            id='validationCustom02'
            value={description}
            required
            label='Last name'
            />
        </MDBValidationItem>
        <div className='col-12'>
            <MDBBtn type='submit'>Submit form</MDBBtn>
            <MDBBtn type='reset'>Reset form</MDBBtn>
        </div>
        </MDBValidation>
    )
}

export default Test