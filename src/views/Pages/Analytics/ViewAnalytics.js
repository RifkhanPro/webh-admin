/* eslint-disable no-tabs */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
// import './AnalyticsCard.css'

import './ViewAnalytics.css'
import Chart from 'react-apexcharts'
import { ResponsiveContainer } from 'recharts'

function ViewAnalytics() {
	// const navigate  = useNavigate()
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState('')

	const [allData, setAllData] = useState('')
	const [userData, userDataChange] = useState(null)
	//post
	const [allPost, setPostDataChange] = useState('')
	const [allPostData, setAllPostData] = useState('')

	//Blog
	const [allBlog, setBlogDataChange] = useState('')
	const [allBlogCount, setAllPClogCount] = useState('')

	//Article
	const [allArticle, setArticleDataChange] = useState('')
	const [allArticleCount, setAllArticleCount] = useState('')

	//Topic
	const [allTopic, setTopicDataChange] = useState('')
	const [allTopicCount, setAllTopicCount] = useState('')

	//Topic Post
	const [allTopicPost, setTopicPostDataChange] = useState('')
	const [allTopicPostCount, setAllTopicPostCount] = useState('')

	//Advertistment
	const [allAdvPost, setAdvDataChange] = useState('')
	const [allAdvCount, setAllAdvCount] = useState('')

	//Advertistment
	const [allNews, setNewsChange] = useState('')
	const [allNewsCount, setAllNewsCount] = useState('')
	const [option, setOption] = useState({
		chart: {
			id: 'apexchart-example'
		},
		xaxis: {
			categories: [
				'Users',
				'Topics',
				'Posts',
				'Newses',
				'Advertisements',
				'Blogs',
				'Articles',
				'TopicPosts'
			]
		}
	})

	const [series, setSeries] = useState([
		{
			name: 'series',
			data: [0, 0, 0, 0, 0, 0, 0]
		}
	])

	useEffect(() => {
		//check whether user has signed in
		if (localStorage.getItem('userAuthToken')) {
			setIsSignedIn(true)
			console.log(isSignedIn)

			//get user data
			if (localStorage.getItem('user')) {
				setUser(JSON.parse(localStorage.getItem('user')))
				console.log(user)
			}
		} else {
			setIsSignedIn(false)
		}
	}, [])

	console.log(user, isSignedIn)

	// Post Count
	useEffect(() => {
		fetch('http://18.205.10.114:8070/postManagement/posts')
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setPostDataChange(resp)
				setAllPostData(Object.keys(resp).length)
				setSeries([...series, (series[0].data[2] = Object.keys(resp).length)])
				// const allData = count
				console.log(allPostData)
				console.log(allPost)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Blog Count
	useEffect(() => {
		fetch('http://18.205.10.114:8070/blog')
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setBlogDataChange(resp)
				setAllPClogCount(Object.keys(resp).length)
				setSeries([...series, (series[0].data[5] = Object.keys(resp).length)])

				console.log(allBlogCount)
				console.log(allBlog)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Article Count
	useEffect(() => {
		fetch('http://18.205.10.114:8070/article')
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setArticleDataChange(resp)
				setAllArticleCount(Object.keys(resp).length)
				setSeries([...series, (series[0].data[6] = Object.keys(resp).length)])

				console.log(allArticleCount)
				console.log(allArticle)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Topic Count
	useEffect(() => {
		fetch('http://18.205.10.114:8070/topic/topics')
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setTopicDataChange(resp)
				setAllTopicCount(Object.keys(resp).length)
				setSeries([...series, (series[0].data[1] = Object.keys(resp).length)])

				console.log(allTopicCount)
				console.log(allTopic)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Topic Count
	useEffect(() => {
		fetch('http://18.205.10.114:8070/topicPost/topicPosts')
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setTopicPostDataChange(resp)
				setAllTopicPostCount(Object.keys(resp).length)
				setSeries([...series, (series[0].data[7] = Object.keys(resp).length)])

				console.log(allTopicPostCount)
				console.log(allTopicPost)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// Advertistment Count
	useEffect(() => {
		fetch('http://18.205.10.114:8070/advertisement')
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setAdvDataChange(resp)
				setAllAdvCount(Object.keys(resp).length)
				setSeries([...series, (series[0].data[4] = Object.keys(resp).length)])

				console.log(allAdvCount)
				console.log(allAdvPost)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// News Count
	useEffect(() => {
		fetch('http://18.205.10.114:8070/news')
			.then(res => {
				return res.json()
			})
			.then(resp => {
				setNewsChange(resp)
				setAllNewsCount(Object.keys(resp).length)
				setSeries([...series, (series[0].data[3] = Object.keys(resp).length)])

				console.log(allNews)
			})
			.catch(err => {
				console.log(err.message)
			})
	}, [])

	// User Count
	useEffect(() => {
		fetch('http://18.205.10.114:8070/user')
			.then(res => {
				return res.json()
			})
			.then(resp => {
				userDataChange(resp)
				setAllData(Object.keys(resp).length)
				setSeries([...series, (series[0].data[0] = Object.keys(resp).length)])

				console.log(userData)
			})
			.catch(err => {
				console.log(err.message)
			})

		console.log(allData)
	}, [])

	console.log(series)

	return (
		<>
			<div className="chart-container">
				<div className="chart-card">
					{user && (
						<ResponsiveContainer maxHeight={500}>
							<Chart
								options={option}
								series={series}
								type="bar"
								width={800}
								height={500}
							/>
						</ResponsiveContainer>
					)}
				</div>
			</div>
		</>
	)
}

export default ViewAnalytics
