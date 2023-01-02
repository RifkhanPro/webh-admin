import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ViewApprovalComment() {
    const [comment, setComment] = useState()
    const [userId, setUserId] = useState()
    const [user, setUser] = useState()
    const {id, cid} = useParams()

    useEffect(() => {
        fetch(`http://localhost:8070/post/${id}/${cid}/comment`).then((res) => {
            return res.json()
        }).then((resp) => {
            setComment(resp)
            setUserId(resp.userId)
            console.log(resp)
        }).catch((err) => {
            console.log(err.message)
        })
    }, [])

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8070/user/${userId}`).then((res) => {
                return res.json()
            }).then((resp) => {
                console.log(resp.result)
                setUser(resp.result)
            }).catch((err) => {
                console.log(err.message)
            })
        }
      
    }, [userId])

   
    return <>
        <div className="container">
            <div className="card">
               
                <div className="card-body">
                <table className="table" style={{ width:'auto', overflow:'hidden'}}>
                        {comment && <>
                                   { user && <><tr>
                                        <th>User Name : </th>
                                        <td>{user.firstname} {user.lastname}</td>
                                    </tr></>}
                                    <tr>
                                        <th>Category : </th>
                                        <td>{comment.category}</td>
                                    </tr>

                                    <tr>
                                        <th>Description : </th>
                                        <td>{comment.desc}</td>
                                    </tr>

                                    <tr>
                                        <th>status : </th>
                                        <td>{comment.status === true ? "Activated" : "DeActivated"}</td>
                                    </tr>
                                   
                                </>
                        }
                    
                    </table>
                </div>
            </div>
        </div> 
    </>
}


export default ViewApprovalComment
