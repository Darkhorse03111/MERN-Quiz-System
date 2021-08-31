import { Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Row, Col, Toast, ToastContainer } from 'react-bootstrap'
import firebase from './firebase/firebase'

// Stylesheet
import './App.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import Home from './screens/Home'
import CreateQuiz from './screens/CreateQuiz'
import EditQuiz from './screens/editQuiz'
import JoinQuiz from './screens/JoinQuiz'
import UserDashboard from './screens/UserDashboard'
import CreatedSuccessfully from './screens/CreatedSuccessfully'
import NotFoundPage from './screens/NotFoundPage'
import AttemptQuiz from './screens/AttemptQuiz'
import AppBar from './components/AppBar'
import Responses from './screens/Responses'
import AttemptBlindQuiz from './screens/AttemptBlindQuiz'
import UsernameModal from './components/UsernameModal'
import AdminDashboard from './screens/AdminDashboard'
import Register from './screens/Register'

const App = () => {
	const [user, setUser] = useState({})
	const [username, setUsername] = useState(localStorage.getItem('username'))
	const [show, setShow] = useState(false)
	const [toastTitle, setToastTitle] = useState('')
	const [toastContent, setToastContent] = useState('')
	useEffect(() => {
		const createUserInDB = async () => {
			if (user.uid)
				if (
					firebase.auth().currentUser.metadata.lastSignInTime ===
					firebase.auth().currentUser.metadata.creationTime
				) {
					try {
						await fetch('/API/users/create', {
							method: 'POST',
							body: JSON.stringify({
								uid: user.uid,
								name: user.name,
								email: user.email,
							}),
							headers: {
								'Content-Type': 'application/json',
							},
						})
					} catch (error) {
						console.log('User Creation Error: ', error)
					}
				}
		}
		createUserInDB()
	}, [user])
	const showToast = (title, content) => {
		setShow(true)
		setToastTitle(title)
		setToastContent(content)
	}
	return (
		<div className='App flex-container grow'>
			<div className='fixed'>
				<AppBar user={user} setUser={setUser} setUsername={setUsername} />
			</div>
			<ToastContainer position="top-end" className="p-3" style={{ marginTop: '80px', zIndex: '100' }}>
				<Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
					<Toast.Header>
						<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
						<strong className="me-auto">{toastTitle}</strong>
					</Toast.Header>
					<Toast.Body>{toastContent}</Toast.Body>
				</Toast>
			</ToastContainer>
			<Switch>
				<Route path='/name'>
					<UsernameModal setUsername={setUsername} />
				</Route>
				<Route path='/admin/dashboard/editQuiz'>
					<EditQuiz setUser={setUser} user={user} />
				</Route>

				<Route path='/admin/dashboard'>
					<AdminDashboard setUser={setUser} user={user} showToast={showToast} />
				</Route>

				<Route path='/admin'>
					{
						!firebase.auth().currentUser ? <Home setUser={setUser} user={user} showToast={showToast} /> : <AdminDashboard setUser={setUser} user={user} showToast={showToast} />
					}
				</Route>

				<Route
					path='/register'
				>
					<Register showToast={showToast} />
				</Route>

				<Route path='/dashboard'>
					{
						!!firebase.auth().currentUser ? <AdminDashboard setUser={setUser} user={user} showToast={showToast} /> : <UserDashboard user={user} />
					}
				</Route>
				<Route path='/create-quiz/:id' render={routeProps => <CreateQuiz user={user} showToast={showToast} id={routeProps.match.params.id} />} />
				<Route
					path='/created-successfully/:quizCode'
					component={CreatedSuccessfully}
				/>
				<Route path='/join-quiz'>
					<JoinQuiz user={user} />
				</Route>
				<Route path='/attempt-quiz/:quizCode' component={AttemptQuiz} />
				<Route
					path='/attempt-blind-quiz/:quizCode'
					component={AttemptBlindQuiz}
				/>
				<Route path='/responses/:quizCode' component={Responses} />
				<Route path='/'>
					{
						!!firebase.auth().currentUser ? <AdminDashboard setUser={setUser} user={user} showToast={showToast} /> : <UserDashboard user={user} />
					}
				</Route>
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	)
}

export default App
/*
!firebase.auth().currentUser ?
*/