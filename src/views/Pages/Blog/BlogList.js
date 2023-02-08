/* eslint-disable no-tabs */
import React from "react"
import BlogItem from "./BlogItem"
import './PostManagementList.css'

const BlogList = (props) => {
	return <>
			<ul className="postManagementList">
				{props.data.map((item) => (
					<li key={item._id}>
						<BlogItem id={item._id} name={item.name} image={item.image} desc={item.desc} />
					</li>
				))}
			</ul>
		</>
}

export default BlogList     
