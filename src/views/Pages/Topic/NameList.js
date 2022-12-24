/* eslint-disable no-tabs */
import React from "react"
import NameItem from "./NameItem"
const NameList = (props) => {
	return <>
			<ul >
				{props.data.map((name) => (
					<li key={name}>
						<NameItem id={name} category={props.category} name= {name} />
					</li>
				)) }
			</ul>
		</>
}

export default NameList     
