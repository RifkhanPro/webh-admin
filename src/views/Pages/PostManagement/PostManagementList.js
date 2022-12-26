/* eslint-disable no-tabs */
import React from "react"
import PostManagementItem from "./PostManagementItem"
import './Skill_Card.css'

const PostManagementList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<PostManagementItem id={item._id} image={item.image} name={item.name} description={item.description} />
					</li>
				))}
			</ul>
		</>
}

export default PostManagementList     
