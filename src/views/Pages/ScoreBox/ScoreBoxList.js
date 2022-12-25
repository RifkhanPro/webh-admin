/* eslint-disable no-tabs */
import React from "react"
import ScoreBoxItem from "./ScoreBoxItem"
import './Skill_Card.css'

const ScoreBoxList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<ScoreBoxItem id={item._id} image={item.image} title={item.title} desc={item.desc} />
					</li>
				))}
			</ul>
		</>
}

export default ScoreBoxList     
