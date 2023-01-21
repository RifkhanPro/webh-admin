/* eslint-disable no-tabs */
import React from "react"
import TopicPostItem from "./TopicPostItem"
import './TopicPostList.css'

const TopicPostList = (props) => {
	return <>
			<ul className="topicpostlist-ul">
				{props.data.map((item) => (
					<li className="topicpostlist-ul" key={item._id}>
						<TopicPostItem id={item._id} name={item.name} desc={item.desc} category={props.category}/>
					</li>
				))}
			</ul>
		</>
}

export default TopicPostList     
