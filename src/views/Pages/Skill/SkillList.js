/* eslint-disable no-tabs */
import React from "react"
import SkillItem from "./SkillItem"
import './Skill_Card.css'

const SkillList = (props) => {
	return <>
			<h2 className="m-2">All Skills</h2>
			<ul className="m-3">
				{props.data.map((item) => (
					<li key={item._id}>
						<SkillItem id={item._id} title={item.title} desc={item.desc} />
					</li>
				))}
			</ul>
		</>
}

export default SkillList     
