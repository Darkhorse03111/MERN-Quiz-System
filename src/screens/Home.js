import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './Home.css'
import { InputGroup, FormControl } from 'react-bootstrap'
const Home = ({ setUser }) => {
	const [path, setPath] = useState('')
	var uiConfig = {
		signInflow: 'popup',
		signInOptions: [
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	}
	useEffect(() => {
		let isMounted = true
		return () => (isMounted = false)
	}, [setUser])

	if (!!path) {
		return <Redirect push to={path} />
	}

	return (
		<div className='vertical-center pt-5' style={{ backgroundColor: '#294634', height:'100%'}}>
			<div id='Home'>
				<div id='logo'>
					<div id='logo-name'>
						<b>Create Al Haramain Games</b>
					</div>
					<div id='description'>
						Now create and join quiz at a single platform.You can create
						trivia quizzes, personality test, polls and survays. Share out
						your quiz with your students with a unique code.
					</div>
				</div>

				<div id='login-card'>
					<label className='login-label'>
						<img
							style={{width:'100px'}}
							src="/Quiz/logo/admin_login_logo.png"
							className="rounded"
							alt=""
						/>
					</label>
					<div>
					<InputGroup className="mb-3">
						<FormControl
						placeholder="Username"
						aria-label="Username"
						aria-describedby="basic-addon1"
						/>
					</InputGroup>
					<InputGroup className="mb-3">
						<FormControl
						placeholder="Password"
						aria-label="Password"
						type="password"
						aria-describedby="basic-addon1"
						/>
					</InputGroup>
						<button className="btn" style={{backgroundColor: '#A17F50', color:'#fff'}}>LOGIN</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
