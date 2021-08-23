import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './UserDashBoard.css'
import CreatedQuizCard from '../components/CreatedQuizCard'
import JoinedQuizCard from '../components/JoinedQuizCard'
import LoadingScreen from './LoadingScreen'
import CreateQuiz from './CreateQuiz'

const UserDashboard = ({ user }) => {
	const [createdQuizzes, setCreatedQuizzes] = useState([])
	const [attemptedQuizzes, setAttemptedQuizzes] = useState([])
	const [loading, setLoading] = useState(true)
	const [editQuiz, setEditQuiz] = useState([])
	const [allQuizzes, setAllQuizzes] = useState([])
	const [path, setPath] = useState('')
	// Fetch Data from the API
	useEffect(() => {
		// if (!user.uid) {
		// 	setLoading(false)
		// 	return
		// }
		const fetchQuizData = async () => {
			let results, quizData
			if (user.uid) {
				results = await fetch(`/API/users/${user.uid}`)
				console.log('results:', results)
				quizData = await results.json()
				if (quizData.createdQuiz) setCreatedQuizzes(quizData.createdQuiz)
			}
			// if (quizData.attemptedQuiz) setAttemptedQuizzes(quizData.attemptedQuiz)
			results = await fetch(`/API/quizzes`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			quizData = await results.json()
			if (quizData.quizData) {
				setAllQuizzes(quizData.quizData)
			}
			setLoading(false)
		}
		fetchQuizData()
	}, [user])

	const editQuizHandle = async (title, questions, isOpen) => {
		if (!title) setEditQuiz([])
		else {
			setLoading(true)
			console.dir({
				quizId: createdQuizzes[editQuiz]._id,
				uid: user.uid,
				title,
				questions,
				isOpen,
			})
			const results = await fetch('/API/quizzes/edit', {
				method: 'POST',
				body: JSON.stringify({
					quizId: createdQuizzes[editQuiz]._id,
					uid: user.uid,
					title,
					questions,
					isOpen,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const submitData = await results.json()
			console.dir(submitData)
			const temp = [...createdQuizzes]
			temp[editQuiz[0]].title = title
			temp[editQuiz[0]].questions = questions
			temp[editQuiz[0]].isOpen = isOpen
			setCreatedQuizzes(temp)
			setEditQuiz([])
			setLoading(false)
		}
	}

	const deleteQuiz = async index => {
		setLoading(true)
		const results = await fetch(`/API/quizzes/${createdQuizzes[index]._id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const submitData = await results.json()
		console.dir(submitData)
		const temp = [...createdQuizzes]
		temp.splice(index, 1)
		setCreatedQuizzes(temp)
		setEditQuiz([])
		setLoading(false)
	}

	if (loading) return <LoadingScreen />

	if (path) {
		return <Redirect push to={`/attempt-quiz/${path}`} />
	}

	if (editQuiz.length)
		return (
			<CreateQuiz
				user={user}
				quizTitle={createdQuizzes[editQuiz].title}
				questions={createdQuizzes[editQuiz].questions}
				isOpen={createdQuizzes[editQuiz].isOpen}
				editQuizHandle={editQuizHandle}
			/>
		)
	return (
		<div className='dash-body'>
			{
				user.uid && <div className='quizzes'>
					<div className='heading'>
						<div className='line-left' />
						<h2>Created </h2>
						<div className='line' />
					</div>
					<div className='card-holder'>
						{createdQuizzes.map((quiz, key) => (
							<CreatedQuizCard
								key={key}
								index={key}
								setEditQuiz={setEditQuiz}
								deleteQuiz={deleteQuiz}
								title={quiz.title}
								code={quiz._id}
								responses={quiz.responses}
								questions={quiz.questions.length}
								isOpen={quiz.isOpen}
							/>
						))}
					</div>
				</div>
			}
			<div className='quizzes'>
				<div className='heading'>
					<div className='line-left' />
					<h2>Quizzes </h2>
					<div className='line' />
				</div>
				<div className='card-holder'>
					{allQuizzes.map((quiz, key) => (
						<JoinedQuizCard
							key={key}
							title={quiz.title}
							// score={quiz.responses[0].score}
							questions={quiz.questions.length}
							id={quiz._id}
							joinQuiz={setPath}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default UserDashboard
