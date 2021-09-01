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
	const [user, setUser] = useState(localStorage.getItem('user'))
	const [username, setUsername] = useState(localStorage.getItem('username'))
	const [show, setShow] = useState(false)
	const [toastTitle, setToastTitle] = useState('')
	const [toastContent, setToastContent] = useState('')
	useEffect(() => {
	}, [user])
	const showToast = (title, content) => {
		setShow(true)
		setToastTitle(title)
		setToastContent(content)
	}
	return (
		<div className='App flex-container grow'>
			<div className='fixed'>
				<AppBar setUsername={setUsername} />
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

				<Route path='/admin/dashboard' render={routeProps => <AdminDashboard setUser={setUser} showToast={showToast} {...routeProps} />}>
				</Route>

				<Route path='/admin' render={routeProps => !user ? <Home setUser={setUser} user={user} showToast={showToast} {...routeProps} /> : <AdminDashboard setUser={setUser} showToast={showToast} {...routeProps} />}>
				</Route>

				<Route
					path='/register'
				>
					<Register showToast={showToast} />
				</Route>

				<Route path='/dashboard' render={routeProps => !!user ? <AdminDashboard setUser={setUser} showToast={showToast} {...routeProps} /> : <UserDashboard user={user} />}>
				</Route>
				<Route path='/create-quiz/:id' render={routeProps => <CreateQuiz showToast={showToast} id={routeProps.match.params.id} {...routeProps} />} />
				<Route path='/create-quiz' render={routeProps => <CreateQuiz showToast={showToast} {...routeProps} />} />
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
				<Route path='/' render={routeProps => !!user ? <AdminDashboard setUser={setUser} showToast={showToast} {...routeProps} /> : <UserDashboard setUser={setUser} user={user} showToast={showToast} {...routeProps} />} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	)
}

export default App
/*
!firebase.auth().currentUser ?
*/