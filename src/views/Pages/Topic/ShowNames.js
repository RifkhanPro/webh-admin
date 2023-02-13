/* eslint-disable no-tabs */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NameList from './NameList'
function ShowNames() {
	const { id } = useParams()
	const [names, setNames] = useState()

	useEffect(() => {
		const sendRequest = async () => {
			try {
				const response = await fetch(`http://localhost:8070/topic/${id}`)

				const responseData = await response.json()

				setNames(responseData.names)
				console.log(responseData)
				if (!response.ok()) {
					throw new Error(responseData.message)
				}
			} catch (err) {}
		}

		sendRequest()
	}, [id])

	return (
		<div>
			<NameList data={names} />
		</div>
	)
}

export default ShowNames
