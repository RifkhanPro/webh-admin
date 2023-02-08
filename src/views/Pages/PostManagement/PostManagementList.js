/* eslint-disable no-tabs */
import React from "react"
import PostManagementItem from "./PostManagementItem"
import './PostManagementList.css'

const PostManagementList = (props) => {
	return <ul className="postManagementList">
				{props.data.map((item) => (
					<li key={item._id}>
						<PostManagementItem id={item._id} image={item.image} name={item.name} description={item.description} />
					</li>
				))}
			</ul>

}

export default PostManagementList     
