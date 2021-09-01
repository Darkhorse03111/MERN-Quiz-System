import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import './Home.css'
import { InputGroup, FormControl } from 'react-bootstrap'
const Home = ({ setUser, showToast, history }) => {
	const [path, setPath] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	var uiConfig = {
		signInflow: 'popup',
		signInOptions: [
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	}
	useEffect(() => {
		// let isMounted = true
		// return () => (isMounted = false)
	}, [setUser])

	const login = async () => {
		const result = await fetch('/API/users/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const res = await result.json()
		showToast('Login', res.message)
		if (res.message === 'Success') {
			localStorage.setItem('user', username)
			console.log('setting path admin dashboard')
			// setPath('/admin/dashboard')
			history.push('/admin/dashboard')
		}
	}

	if (!!path) {
		return <Redirect push to={path} />
	}

	return (
		<div className='vertical-center pt-5' style={{ backgroundColor: '#294634', height: '100%' }}>
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
							style={{ width: '100px' }}
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
								value={username}
								onChange={e => setUsername(e.target.value)}
							/>
						</InputGroup>
						<InputGroup className="mb-3">
							<FormControl
								placeholder="Password"
								aria-label="Password"
								type="password"
								aria-describedby="basic-addon1"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</InputGroup>
						<InputGroup className="mb-3">
							<button className="btn" style={{ backgroundColor: '#A17F50', color: '#fff', width: '100%' }} onClick={e => login()}>LOGIN</button>
						</InputGroup>
						<InputGroup className="mb-3">
							<Link to='/register' style={{ width: '100%' }}><button className="btn" style={{ backgroundColor: '#A17F50', color: '#fff', width: '100%' }}>REGISTER</button></Link>
						</InputGroup>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
