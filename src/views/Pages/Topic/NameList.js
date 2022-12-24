/* eslint-disable no-tabs */
import React from "react"
import NameItem from "./NameItem"
const NameList = (props) => {
	console.log(props.data)
	return <>
			<ul >
				{props.data.map((name) => (
					<li key={name}>
						<NameItem id={name} name= {name} />
					</li>
				)) }
			</ul>
		</>
}

export default NameList     
