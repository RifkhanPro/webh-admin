/* eslint-disable no-tabs */
import React from "react"
import RecentSearchFeedItem from "./RecentSearchFeedItem"
import './Skill_Card.css'

const RecentSearchFeedList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<RecentSearchFeedItem id={item._id} title={item.title} desc={item.desc} />
					</li>
				))}
			</ul>
		</>
}

export default RecentSearchFeedList     
