/* eslint-disable no-tabs */
import React from "react"
import PostManagementItem from "./PostManagementItem"
import './Skill_Card.css'

const PostManagementList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<PostManagementItem id={item._id} name={item.name} desc={item.desc} />
					</li>
				))}
			</ul>
		</>
}

export default PostManagementList     
