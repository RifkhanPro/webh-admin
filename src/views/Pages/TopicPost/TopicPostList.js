/* eslint-disable no-tabs */
import React from "react"
import TopicPostItem from "./TopicPostItem"
import './PostManagementList.css'

const TopicPostList = (props) => {
	return <ul className="postManagementList">
				{props.data.map((item) => (
					<li key={item._id}>
						<TopicPostItem id={item._id} image={item.image} name={item.name} desc={item.desc} category={item.category}/>
					</li>
				))}
			</ul>
}

export default TopicPostList     
