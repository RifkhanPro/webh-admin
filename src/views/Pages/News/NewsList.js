/* eslint-disable no-tabs */
import React from "react"
import NewsItem from "./NewsItem"
import './PostManagementList.css'

const NewsList = (props) => {
	return <ul className="postManagementList">
				{props.data.map((item) => (
					<li key={item._id}>
						<NewsItem id={item._id} title={item.title} image={item.image} desc={item.desc}/>
					</li>
				))}
			</ul>
}

export default NewsList     
