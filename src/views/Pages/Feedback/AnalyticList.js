/* eslint-disable no-tabs */
import React from "react"
import AnalyticItem from "./AnalyticItem"
import './Skill_Card.css'

const AnalyticList = (props) => {
	console.log(props)
	return <>
			<ul>
				{/* {props.data.map((item) => (
					<li key={item._id}>
						<AnalyticItem id={item._id} title={item.title} desc={item.desc} />
					</li>
				))} */}
			</ul>
		</>
}

export default AnalyticList     
