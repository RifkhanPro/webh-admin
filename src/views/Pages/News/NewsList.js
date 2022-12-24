/* eslint-disable no-tabs */
import React from "react"
import NewsItem from "./NewsItem"
import './Skill_Card.css'

const NewsList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<NewsItem id={item._id} image={item.image} title={item.title} desc={item.desc}/>
					</li>
				))}
			</ul>
		</>
}

export default NewsList     
