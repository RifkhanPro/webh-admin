/* eslint-disable no-tabs */
import React, { useEffect, useRef, useState } from 'react'
import './ProfilePage.css'
import img1 from '../../../assets/images/users/avatar-1.jpg'

import { Link, useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import axios from 'axios'

function ProfilePage() {
    const [user, setUser] = useState("")
    const navigate = useNavigate()
    const inputFile = useRef(null) 
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()

    useEffect(() => {
            setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    useEffect(() => {
        if (!file) {
            return
        }


        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])

    const editProfile = () => {
        navigate(`${user._id}/edit`)
    }
   

    const pickImageHandler = () => {
        inputFile.current.click()
    }

    const pickHandler = (e) => {
        const pickedFile = e.target.files[0]
        setFile(pickedFile)
     
      }

      const imageUploadHandler = async () => {
        let image
        console.log(file)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "feed_images")
    
        try {
          await axios
            .post(
              "https://api.cloudinary.com/v1_1/movie-reservation/image/upload",
              formData
            )
            .then((res) => {
                image = res.data.secure_url
            })
        } catch (error) {
            alert(error)

        }

        try {
            console.log(image)
       
			const response = await fetch(`http://68.178.164.166:8070//user/${user._id}/profilePic`, {method:"PUT",
             headers : {"Content-Type":"application/json"},
              body :JSON.stringify({
                    image
				})
			})
			const responseData = await response.json()
           
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(responseData))
            window.location.reload()
			if (!response.ok) {
				throw new Error(responseData.message)
			}

            alert("profile pic changed")
            } catch (err) { 
                alert(err)
            }
            console.log(image)
      }

  return (
    <>
    <Card>
    <div className="row mb-5">
            <div className="col-lg-2 pro-left"></div>
            <div className="col-lg-8 pro-center">
                <div className="profile-line">
                    <div className="row" style={{ justifyContent:'center' }}>
                        <input type="file" name="" value="" ref={inputFile} style={{display:'none'}} accept='.jpg,.png,.jpeg' onChange={pickHandler} />
                        { !user.profilePicture && !previewUrl && <img  style={{cursor:'pointer'}}  className="profile-page-image" src={ img1} alt="profile-pic" onClick={pickImageHandler}/>}
                        { user.profilePicture && !previewUrl && <img  style={{cursor:'pointer'}}  className="profile-page-image" src={ user.profilePicture} alt="profile-pic" onClick={pickImageHandler}/>}
                        {user.profilePicture && previewUrl && <img  style={{cursor:'pointer'}}  className="profile-page-image" src={ previewUrl} alt="profile-pic" onClick={pickImageHandler}/>}
                        <div className="profile-content">
                            <span>FirstName : {user.firstname}</span>
                            <span>LastName : {user.lastname}</span>
                            <div className='btn'>
                            <button  
                                className="edit-profile-button"
                                onClick={editProfile}>Edit Profile</button>
                                {file && <button type='submit' className="edit-profile-button image-btn" onClick={imageUploadHandler}>Change Image</button>}
                            </div>
                          
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </Card>
       

    </>
  )
}

export default ProfilePage