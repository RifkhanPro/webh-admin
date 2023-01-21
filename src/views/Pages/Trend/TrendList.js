/* eslint-disable no-tabs */
import React from "react"
import TrendItem from "./TrendItem"
import './PostManagementList.css'

const TrendList = (props) => {
	return <ul className="postManagementList">
				{props.data.map((item) => (
					<li key={item._id}>
						<TrendItem id={item._id} title={item.title} image={item.image} desc={item.desc} />
					</li>
				))}
			</ul>
}

export default TrendList     
