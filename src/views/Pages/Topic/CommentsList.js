import React from "react"
import CommentItem from "./CommentItem"
import './CommentList.css'
const CommentsList = (props) => {
    console.log(props.data)

  return (
        <ul className="ul">
        {props.data.map((item) => (
            <li key={item.userId}>
                <CommentItem value={item.value}  />
            </li>
        ))}
    </ul>
  ) 
  
}

export default CommentsList
