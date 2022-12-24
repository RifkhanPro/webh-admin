/* eslint-disable no-tabs */
import React from "react"
import ArticleItem from "./ArticleItem"
import './Skill_Card.css'

const ArticleList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<ArticleItem id={item._id} image={item.image} title={item.title} desc={item.desc} />
					</li>
				))}
			</ul>
		</>
}

export default ArticleList     
