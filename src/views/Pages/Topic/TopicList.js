/* eslint-disable no-tabs */
import React from "react"
import TopicItem from "./TopicItem"
import './TopicList.css'

const TopicList = (props) => {
	return <>
			<ul className="TopicList-ul">
				{props.data.map((item) => (
					<li className="TopicList-li" key={item._id}>
						<TopicItem id={item._id} category={item.category}  />
					</li>
				))}
			</ul>
		</>
}

export default TopicList     
