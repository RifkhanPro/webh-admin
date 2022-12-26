/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, CardGroup, CardTitle, FormGroup, Input } from 'reactstrap'
import { Edit, Delete, Info, PlusCircle } from 'react-feather'

const AllQuestion = () => {
  const [questionData, questionDataChange] = useState()
  const navigate = useNavigate()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [user, setUser] = useState("")

  useEffect(() => {
    //check whether user has signed in
    if (localStorage.getItem("userAuthToken")) {
        setIsSignedIn(true)
        console.log(isSignedIn)

        //get user data
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
            console.log(user)
        }

    } else {
      setIsSignedIn(false)
    }
  }, [])

  console.log(user, isSignedIn)

  const LoadDetail = (_id) => {
        navigate(`${_id}`)
  }

   useEffect(() => {
    fetch("http://localhost:8070/question")
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        questionDataChange(resp)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const Removefunction = (_id) => {
    if (window.confirm('Do you want to remove?')) {
        fetch(`http://localhost:8070/question/${_id}`, {
            method: "DELETE"
        }).then((res) => {
            console.log(res)
            alert('Removed successfully.')
            window.location.reload()
        }).catch((err) => {
            console.log(err.message)
        })
    }
}

  return <>
    {user ? <div className="container">
    <div className="card">
        <div className="card-title">
            <h2 className="m-2">All Questions</h2>
        </div>
        <div className="card-body">
            <table class="table">
            <thead className="primary">
                <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Image</th>
                <th scope="col">Quesions</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {questionData &&
                        questionData.map(item => (
                            <tr key={item._id}>
                                {/* <td>{}</td> */}
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                                <td>{item.image}</td>
                                <td>{item.question}</td>
                                {/* <td></td> */}
                                {/* <td>{item.image}</td> */}
                                 <td>
                                    <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger"><Delete size={12} /><i class="fas fa-trash-alt"></i> </a>  | 
                                    <a onClick={() => { LoadDetail(item._id) }} className="btn btn-info"><Info size={12} /></a>
                                </td>
                            </tr>
                        ))
                    } 
            </tbody>
            </table>
        </div>
    </div>
</div> : <></> }
  </>
}

export default AllQuestion

