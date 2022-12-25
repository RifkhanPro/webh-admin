/* eslint-disable no-tabs */
import React from "react"
import SkillItem from "./SkillItem"
import './Skill_Card.css'

const SkillList = (props) => {
	return <>
			<ul>
				{props.data.map((item) => (
					<li key={item._id}>
						<SkillItem id={item._id} title={item.title} image={item.image} desc={item.desc} />
					</li>
				))}
			</ul>
		</>
}

export default SkillList     
