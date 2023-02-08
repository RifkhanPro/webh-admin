/* eslint-disable no-tabs */
/* eslint-disable object-property-newline */
import React, { useState } from 'react'
// import './AddSkill.css'
import './AddPostManagement.css'
import { useNavigate } from 'react-router-dom'

function AddTopic() {

  const navigate = useNavigate()
  const [topic, setTitle] = useState('')
  const [topicValidate, setTopicValidate] = useState(true)


  const titleHandler = (e) => {
    if (e.target.value.trim() === '') {
      setTopicValidate(false)
    } else {
      setTopicValidate(true)
      
    }
    setTitle(e.target.value)
  }

  // const categoryHandler = (e) => {
  //   if (e.target.value.trim() === '') {
  //     setTopicValidate(false)
  //   } else {
  //     setTopicValidate(true)
  //     setTitle(e.target.value)
  //   }
  // }

  const submitHandler =  async (e) => {
    e.preventDefault()
    
    if (topic.trim() === '') {
      setTopicValidate(false)
      return
    }

    try {
			const response = await fetch('http://44.202.187.100:8070/topic', {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
					category:topic
				})
			})

			const responseData = await response.json()

      console.log(responseData)

			if (!response.ok) {
				throw new Error(responseData.message)
			}

      setTitle('')
		} catch (err) { 
      //
    }

    navigate('/topics')
  }

  return (
    <div className='edit-postManagement-container'>
      <form onSubmit={submitHandler} className='edit-postManagement-form'>
          <div className='edit-postManagement-group'>
              <h5>Category</h5>
              <input onChange={titleHandler} value={topic} type='text' placeholder='Enter Category'/>
              {!topicValidate && <p style={{color:"Red"}}>Category should not be Empty</p>}
          </div>
          <button type='submit' className='btn' color='primary' >Add</button>
      </form>
    </div>
  )
}

export default AddTopic
