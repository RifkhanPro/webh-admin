/* eslint-disable no-tabs */
import React from "react"
import TopicPostItem from "./TopicPostItem"
import './PostManagementList.css'

const TopicPostList = (props) => {
	return <ul className="postManagementList">
				{props.data.map((item) => (
					<li key={item._id}>
						<TopicPostItem id={item._id} name={item.name} desc={item.desc} category={props.category}/>
					</li>
				))}
			</ul>
}

export default TopicPostList     
