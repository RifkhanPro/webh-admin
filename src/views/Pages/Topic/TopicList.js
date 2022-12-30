/* eslint-disable no-tabs */
import React from "react"
import TopicItem from "./TopicItem"
import './Skill_Card.css'

const TopicList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<TopicItem id={item._id} category={item.category}  />
					</li>
				))}
			</ul>
		</>
}

export default TopicList     
