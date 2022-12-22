/* eslint-disable no-tabs */
import React from "react"
import PostItem from "./PostItem"

const PostList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<PostItem id={item._id} title={item.title} desc={item.desc} />
					</li>
				))}
			</ul>
		</>
}

export default PostList     
