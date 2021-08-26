import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { StyledFirebaseAuth } from 'react-firebaseui'
import './Home.css'
import firebase from '../firebase/firebase'
import LoadingScreen from './LoadingScreen'

const Home = ({ setUser }) => {
	const [loading, setLoading] = useState(true)
	const [path, setPath] = useState('')
	var uiConfig = {
		signInflow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	}
	useEffect(() => {
		let isMounted = true
		firebase.auth().onAuthStateChanged(async user => {
			// setIsLoggedIn(!!user)
			if (user && isMounted) {
				const res = await fetch('/API/users/login', {
					method: 'POST',
					body: JSON.stringify({ name: firebase.auth().currentUser.displayName }),
					headers: {
						'Content-Type': 'application/json',
					},
				})
				const body = await res.json()
				localStorage.setItem('username', firebase.auth().currentUser.displayName)
				localStorage.setItem('id', body.id)
				setUser({
					uid: firebase.auth().currentUser.uid,
					name: firebase.auth().currentUser.displayName,
					email: firebase.auth().currentUser.email,
				})
				setPath('/dashboard')
			} else {
				setUser({})
			}
			if (isMounted) setLoading(false)
		})
		return () => (isMounted = false)
	}, [setUser])

	if (!!path) {
		return <Redirect push to={path} />
	}

	return (
		<div className='vertical-center'>
			{loading ? (
				<LoadingScreen />
			) : (
				<div id='Home'>
					<div id='logo'>
						<div id='logo-name'>
							<b>Quiz</b>
						</div>
						<div id='description'>
							Now create and join quiz at a single platform.You can create
							trivia quizzes, personality test, polls and survays. Share out
							your quiz with your students with a unique code.
						</div>
					</div>

					<div id='login-card'>
						<label className='login-label'>
							<b>Q</b>
						</label>
						<StyledFirebaseAuth
							borderRadius='40px'
							uiConfig={uiConfig}
							firebaseAuth={firebase.auth()}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default Home
