/* eslint-disable no-tabs */
import React from "react"
import NameItem from "./NameItem"
import './NameList.css'
const NameList = (props) => {
	return <>
			<ul className="namelist-ul">
				{props.data.map((name) => (
					<li className="namelist-li" key={name}>
						<NameItem id={name} category={props.category} name= {name} />
					</li>
				)) }
			</ul>
		</>
}

export default NameList     
