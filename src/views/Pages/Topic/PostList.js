/* eslint-disable no-tabs */
import React from "react"
import PostItem from "./PostItem"
import './Skill_Card.css'

const PostList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<PostItem id={item._id} image={item.image} name={item.name} desc={item.desc} category={props.category} />
					</li>
				))}
			</ul>
		</>
}

export default PostList     
