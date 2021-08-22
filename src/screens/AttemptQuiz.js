import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as io from 'socket.io-client';
import firebase from '../firebase/firebase'
import LoadingScreen from './LoadingScreen'
import AttemptedModal from './AttemptedModal'
import '../components/AddQuestionModal.css'
let socket
class AttemptQuiz extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			number: 0,
			questions: [],
			attemptedQuestions: [],
			quizTitle: '',
			loading: true,
			result: {},
			showModal: false,
			path: '',
			quizCode: '',
			score: 0,
			time: true
		}
	}
	async componentDidMount() {
		const quizCode = this.props.match.params.quizCode
		const res = await fetch('/API/quizzes/join', {
			method: 'POST',
			body: JSON.stringify({ quizId: quizCode }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const quizData = await res.json()
		console.log('fetch res:', quizData)
		if (!!quizData.error) {
			this.setState({
				quizTitle: quizData.error,
				loading: false
			})
		}
		else {
			this.setState({
				quizTitle: quizData.title,
				questions: quizData.questions,
				loading: false
			})
			const env = process.env.NODE_ENV;
			socket = io.connect((!!env && env.includes('production')) ? 'https://arcane-atoll-82454.herokuapp.com:4000' : 'http://192.168.104.16:4000')
			const username = localStorage.getItem('username')
			socket.emit('login', username)
			const temp = quizData.questions.map((question) => {
				return {
					id: question.id,
					title: question.title,
					optionType: question.optionType,
					selectedOptions: [],
				}
			})
			this.setState({
				attemptedQuestions: temp,
				quizCode
			})
		}
	}
	componentWillUnmount() {
		socket.close()
	}
	handleOptionSelect = (e, option, index) => {
		const { attemptedQuestions } = this.state
		const temp = [...attemptedQuestions]
		const options = temp[index].selectedOptions
		console.log('index:' + index)
		if (!options.includes(option) && e.target.checked) {
			if (attemptedQuestions[index].optionType === 'radio') options[0] = option
			else options.push(option)
		}
		if (options.includes(option) && !e.target.checked) {
			const i = options.indexOf(option)
			options.splice(i, 1)
		}
		temp[index].selectedOptions = options
		this.setState({
			attemptedQuestions: temp
		})
	}
	increaseNumber = () => {
		const { questions, attemptedQuestions, number } = this.state
		const score = this.evaluateQuiz(questions, attemptedQuestions)
		console.log('current score:', score)
		this.setState({
			number: number + 1,
			score,
			showModal: true,
			time: true
		})
	}
	submitQuiz = async () => {
		// send attempted Questions to backend
		const { quizCode, attemptedQuestions } = this.state
		try {
			const { questions, attemptedQuestions, number } = this.state
			const score = this.evaluateQuiz(questions, attemptedQuestions)
			console.log('current score:', score)
			this.setState({
				score
			})
			// const res = await fetch('/API/quizzes/submit', {
			// 	method: 'POST',
			// 	body: JSON.stringify({
			// 		quizId: quizCode,
			// 		questions: attemptedQuestions,
			// 	}),
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// })
			// const body = await res.json()
			this.setState({
				// result: body,
				showModal: true,
				time: false
			})
			// console.log('res body : ', body)
		} catch (e) {
			console.log('Error Submitting quiz', e)
		}
	}
	evaluateQuiz = (quizQuestions, attemptedQuestions) => {
		let score = 0
		console.log('questions:', quizQuestions)
		console.log('attemptQuestions:', attemptedQuestions)
		attemptedQuestions.forEach((question) => {
			const realQues = quizQuestions.find((x) => x.id === question.id)
			const correctOptions = realQues.options.filter((op) => op.isCorrect)
			// Error for Quiz with no correct answers
			if (correctOptions.length < 1) return 0

			const attemptedOptions = question.selectedOptions
			if (realQues.optionType === 'check') {
				const weightage = 1 / correctOptions.length
				let qScore = 0
				if (correctOptions.length < question.selectedOptions.length) {
					qScore -=
						(question.selectedOptions.length - correctOptions.length) * weightage
				}
				question.selectedOptions.forEach((selectedOp) => {
					const correct = correctOptions.find((op) => op.text === selectedOp)
					if (correct !== undefined) qScore += weightage
				})
				qScore < 0 ? (score += 0) : (score += qScore)
				console.log('Score : ', score)
			} else if (realQues.optionType === 'radio') {
				if (correctOptions[0].text === attemptedOptions[0]) {
					score++
				}
			}
		})
		return score;
	}

	render = () => {
		const { number, questions, attemptedQuestions, quizTitle, loading, showModal, path, score, time } = this.state
		const { handleOptionSelect, submitQuiz, increaseNumber } = this
		const quizCode = this.props.match.params.quizCode
		if (loading) return <LoadingScreen />
		// For Quiz not Found
		if (quizTitle === 'ERR:QUIZ_NOT_FOUND')
			return (
				<div className='loading'>
					<h1>404 Quiz Not Found!</h1>
					<div id='logo-name'>
						<b>Quiz</b>
					</div>
					<h3>
						Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
					</h3>
				</div>
			)
		if (!!path) {
			return <Redirect push to={`/attempt-quiz/${quizCode}/${path}`} />
		}
		// For Quiz not accessible
		else if (quizTitle === 'ERR:QUIZ_ACCESS_DENIED')
			return (
				<div className='loading'>
					<h2>
						Quiz Access is Not Granted by the Creator. Please contact Quiz
						Creator.
					</h2>
					<div id='logo-name'>
						<b>Quiz</b>
					</div>
					<h3>
						Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
					</h3>
				</div>
			)
		else if (quizTitle === 'ERR:QUIZ_ALREADY_ATTEMPTED')
			return (
				<div className='loading'>
					<h2>You have already taken the Quiz.</h2>
					<div id='logo-name'>
						<b>Quiz</b>
					</div>
					<h3>
						Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
					</h3>
				</div>
			)
		else {
			let question = questions[number], options = attemptedQuestions.length > number ? attemptedQuestions[number].selectedOptions : []
			return (
				<div id='main-body'>
					<div id='create-quiz-body'>
						<div className='quiz-header'>
							<h2>{quizTitle}</h2>
						</div>
						<div className='attemptQuestionCard'>
							<div id='title'>{question.title}</div>
							<div className='option-div'>
								{question.options.map((option, ind) => (
									<div className='option' key={ind}>
										{question.optionType === 'radio' ? (
											<input
												type='radio'
												name={`option${number}`}
												checked={options.findIndex(opt => opt === option.text) >= 0}
												onChange={(e) =>
													handleOptionSelect(e, option.text, number)
												}
											/>
										) : (
											<input
												type='checkbox'
												name='option'
												checked={options.findIndex(opt => opt === option.text) >= 0}
												onChange={(e) =>
													handleOptionSelect(e, option.text, number)
												}
											/>
										)}
										<label className='label' style={{ padding: '0px 5px' }}>
											{option.text}
										</label>
									</div>
								))}
							</div>
						</div>
						<div id='row'>
							<button className='button wd-200' onClick={submitQuiz}>
								Submit
							</button>
							{
								(number < questions.length - 1) && <button className='button wd-200' onClick={e => increaseNumber()}>
									Next
								</button>
							}
						</div>
						<AttemptedModal
							result={score}
							showModal={showModal}
							totalScore={questions.length}
							hideModal={() => this.setState({ showModal: false })}
							time={time}
						/>
					</div>
				</div>
			)
		}
	}
}
/*
const AttemptQuiz = ({ match }) => {
	const quizCode = match.params.quizCode
	const [number, setNumber] = useState(parseInt(localStorage.getItem('number')))
	const [questions, setQuestions] = useState([])
	const [attemptedQuestions, setAttemptedQuestions] = useState([])
	const [quizTitle, setQuizTitle] = useState('')
	const [loading, setLoading] = useState(true)
	const [result, setResult] = useState({})
	const [showModal, setShowModal] = useState(false)
	const [path, setPath] = useState('')
	// const uid = firebase.auth().currentUser.uid
	useEffect(() => {
		const fetchQuiz = async () => {
			const res = await fetch('/API/quizzes/join', {
				method: 'POST',
				body: JSON.stringify({ quizId: quizCode }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const quizData = await res.json()
			console.log('fetch res:', quizData)
			if (!!quizData.error) {
				setQuizTitle(quizData.error)
				setLoading(false)
			}
			else {
				setQuizTitle(quizData.title)
				setQuestions(quizData.questions)
				setLoading(false)
				const temp = quizData.questions.map((question) => {
					return {
						id: question.id,
						title: question.title,
						optionType: question.optionType,
						selectedOptions: [],
					}
				})
				setAttemptedQuestions(temp)
			}
		}
		fetchQuiz()
	}, [quizCode])

	const handleOptionSelect = (e, option, index) => {
		const temp = [...attemptedQuestions]
		const options = temp[index].selectedOptions
		console.log('index:' + index)
		if (!options.includes(option) && e.target.checked) {
			if (attemptedQuestions[index].optionType === 'radio') options[0] = option
			else options.push(option)
		}
		if (options.includes(option) && !e.target.checked) {
			const i = options.indexOf(option)
			options.splice(i, 1)
		}
		temp[index].selectedOptions = options
		setAttemptedQuestions(temp)
	}

	const increaseNumber = () => {
		localStorage.setItem('number', `${number + 1}`)
		setNumber(number + 1)
	}

	const submitQuiz = async () => {
		// send attempted Questions to backend
		try {
			const res = await fetch('/API/quizzes/submit', {
				method: 'POST',
				body: JSON.stringify({
					quizId: quizCode,
					questions: attemptedQuestions,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const body = await res.json()
			setResult(body)
			setShowModal(true)
			console.log('res body : ', body)
		} catch (e) {
			console.log('Error Submitting quiz', e)
		}
	}

	if (loading) return <LoadingScreen />
	// For Quiz not Found
	if (quizTitle === 'ERR:QUIZ_NOT_FOUND')
		return (
			<div className='loading'>
				<h1>404 Quiz Not Found!</h1>
				<div id='logo-name'>
					<b>Quiz</b>
				</div>
				<h3>
					Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
				</h3>
			</div>
		)
	if (!!path) {
		return <Redirect push to={`/attempt-quiz/${quizCode}/${path}`} />
	}
	// For Quiz not accessible
	else if (quizTitle === 'ERR:QUIZ_ACCESS_DENIED')
		return (
			<div className='loading'>
				<h2>
					Quiz Access is Not Granted by the Creator. Please contact Quiz
					Creator.
				</h2>
				<div id='logo-name'>
					<b>Quiz</b>
				</div>
				<h3>
					Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
				</h3>
			</div>
		)
	else if (quizTitle === 'ERR:QUIZ_ALREADY_ATTEMPTED')
		return (
			<div className='loading'>
				<h2>You have already taken the Quiz.</h2>
				<div id='logo-name'>
					<b>Quiz</b>
				</div>
				<h3>
					Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
				</h3>
			</div>
		)
	else {
		let question = questions[number], options = attemptedQuestions.length > number ? attemptedQuestions[number].selectedOptions : []
		return (
			<div id='main-body'>
				<div id='create-quiz-body'>
					<div className='quiz-header'>
						<h2>{quizTitle}</h2>
					</div>
					<div className='attemptQuestionCard'>
						<div id='title'>{question.title}</div>
						<div className='option-div'>
							{question.options.map((option, ind) => (
								<div className='option' key={ind}>
									{question.optionType === 'radio' ? (
										<input
											type='radio'
											name={`option${number}`}
											checked={options.findIndex(opt => opt === option.text) >= 0}
											onChange={(e) =>
												handleOptionSelect(e, option.text, number)
											}
										/>
									) : (
										<input
											type='checkbox'
											name='option'
											checked={options.findIndex(opt => opt === option.text) >= 0}
											onChange={(e) =>
												handleOptionSelect(e, option.text, number)
											}
										/>
									)}
									<label className='label' style={{ padding: '0px 5px' }}>
										{option.text}
									</label>
								</div>
							))}
						</div>
					</div>
					<div id='row'>
						<button className='button wd-200' onClick={submitQuiz}>
							Submit
						</button>
						{
							(number < questions.length - 1) && <button className='button wd-200' onClick={e => increaseNumber()}>
								Next
							</button>
						}
					</div>
					<AttemptedModal
						result={result}
						showModal={showModal}
						totalScore={questions.length}
					/>
				</div>
			</div>
		)
	}
}
*/
export default AttemptQuiz
