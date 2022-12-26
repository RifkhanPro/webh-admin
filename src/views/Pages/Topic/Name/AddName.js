import React from "react";
import { useEffect } from "react";

const AddName = () => {
    const [topic, setTitle] = useState()
    const [content, setDesc] = useState()
    const [topics, setTopics] = useState()
    const navigate = useNavigate()
  
    const titleHandler = (e) => {
      setTitle(e.target.value)
    }
    const descHandler = (e) => {
      setDesc(e.target.value)
  
    }

    
	 useEffect(() => {
		const sendRequest = async () => {
		 try {
			 const response = await fetch('http://68.178.164.166:8070/topic/topics')
	
			 const responseData = await response.json()
	
			 setTopics(responseData.title)
			
			 if (!response.ok()) {
			   throw new Error(responseData.message)
		   }
	
		 } catch (err) {
		 }
		} 
	
		sendRequest()
	 }, [])

    const submitHandler =  async (e) => {
      e.preventDefault()
  
      try {
              const response = await fetch(`http://68.178.164.166:8070/topic/${}/create`, {method:"POST", headers : {"Content-Type":"application/json"}, body :JSON.stringify({
                      name:content
                  })
              })
  
              const responseData = await response.json()
  
        console.log(responseData)
  
              if (!response.ok) {
                  throw new Error(responseData.message)
              }
  
  
        setDesc('')
        setTitle('')
          } catch (err) { 
        //
      }
  
      navigate('/skills')
    }
  
    return (
      <Card>
        <form onSubmit={submitHandler}>
            <CardGroup className='group'>
                <CardTitle>Category</CardTitle>
                {/* <Select >
                    {topics.map(topic => (<Option value={topic._id}>{topic.category}</Option>))}
                </Select> */}
            </CardGroup>
  
            <CardGroup className='group'>
                <CardTitle>Name</CardTitle>
                <Input onChange={descHandler}  value={content} type='text'/>
            </CardGroup>
  
            <Button type='submit' className='btn'>Submit</Button>
        </form>
      </Card>
    )
  }


export default AddName;
