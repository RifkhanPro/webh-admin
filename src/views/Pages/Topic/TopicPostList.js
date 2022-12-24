/* eslint-disable no-tabs */
import React from "react"
import TopicPostItem from "./TopicPostItem"
import './Skill_Card.css'

const TopicPostList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<TopicPostItem id={item._id} name={item.name} desc={item.desc} category={props.category}/>
					</li>
				))}
			</ul>
		</>
}

export default TopicPostList     
