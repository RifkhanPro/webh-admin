/* eslint-disable no-tabs */
import React from "react"
import SkillItem from "./SkillItem"
import { Button, Card, CardGroup, CardTitle, FormGroup, Input, Row, Col, Label, InputGroup} from "reactstrap"
import './Skill_Card.css'

const SkillList = (props) => {
	return <>
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
