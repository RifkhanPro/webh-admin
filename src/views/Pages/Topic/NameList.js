/* eslint-disable no-tabs */
import React from "react"
const NameList = (props) => {
	console.log(props.data)
	return <>
			<ul >
				{props.data.map((item) => (
					<li key={item} >
						{item}
					</li>
				))}
			</ul>
		</>
}

export default NameList     
