import React from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import './CreateQuiz.css'
import AddQuestionModal from '../components/AddQuestionModal'
import QuestionsTable from '../components/QuestionsTable'
import { Switch } from '@material-ui/core'
import LoadingScreen from './LoadingScreen'

export default class CreateQuiz extends React.Component {
	constructor(props) {
		super(props)
		// console.log('current props:', this.props.match.params.id)
		console.log('current id:', props.id)
		this.state = {
			title: '',
			access: false,
			quizId: props.id,
			questions: [],
			editing: false,
			curIndex: -1
		}
	}
	async componentDidMount() {
		const { quizId } = this.state
		console.log('quizId:', quizId)
		if (quizId) {
			console.log('getting quiz data')
			const res = await fetch(`/API/quizzes/${quizId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const result = await res.json()
			this.setState({ title: result.quizData.title, questions: result.quizData.questions })
		}
	}
	render() {
		const { access, title, questions, curIndex, editing } = this.state
		console.log('current index:', curIndex)
		console.log('questions:', questions)
		return (
			<div id='main-body' style={{ backgroundColor: '#FFFFFF' }}>
				<div id='create-quiz-body'>
					<div className='quiz-header' style={{ backgroundColor: '#F1F1F1', boxShadow: 'none', width: '1138px' }}>
						<Row>
							<Col>
								<input
									style={{ width: '450px', height: '35px', fontSize: '25px', border: 'none' }}
									type='text'
									className='input-text'
									value={title}
									onChange={(e) => this.setState({ title: e.target.valueAsDate })}
									id='quiz-title'
									placeholder='Untitled Quiz'
									autoFocus
									autoComplete='off'
								/>
							</Col>
							<Col md='auto'>
								<button
									// disabled={!(title.length && questionArray.length)}
									className='button'
									style={{ height: '35px', fontSize: '15px', paddingTop: '3px', paddingBottom: '5px' }}
								>
									+Question
								</button>
							</Col>
							<Col md='auto'>
								<select name="cars" className="custom-select" style={{ width: '200px', marginTop: '10px' }}>
									<option>Qur'an</option>
									<option>Arabic</option>
									<option>Islamic Studies</option>
								</select>
							</Col>
							<Col md='auto' style={{ paddingTop: '10px' }}>
								<Switch
									checked={access}
									onChange={(e) => this.setState({ access: e.target.value })}
									name='access'
									default='#00ff00'
									primary='#ff0000'
									secondary='#0000ff'
								/>
								Save
							</Col>
							<Col md='auto'>
								<button
									// disabled={!(title.length && questionArray.length)}
									className='button'
									style={{ height: '35px', fontSize: '15px', paddingTop: '3px', paddingBottom: '5px' }}
								>
									Edit
								</button>
							</Col>
						</Row>
					</div>
					<div style={{ width: '1138px' }}>
						{
							questions.map((question, index) =>
								<Row style={{ marginTop: '30px', backgroundColor: '#FFFFFF', paddingTop: '30px' }} key={index}>
									<Col>
										<div style={{ height: '50px', background: '#A17F50', borderRadius: '5px', color: '#ffffff', textAlign: 'left', fontSize: '20px', paddingTop: '10px', paddingLeft: '30px' }}>
											QUESTION {index + 1}
										</div>
										<Row style={{ paddingTop: '20px', paddingBottom: '20px', marginLeft: '2px', marginRight: '2px', backgroundColor: '#F1F1F1' }}>
											<Col>
												<div style={{ height: '100%', position: 'relative' }}>
													<p style={{ margin: '0', position: 'absolute', top: '50%', left: '20%', transform: 'translate(-20%,-50%)' }} rows='5' cols='40'>
														{question.title}
													</p>
												</div>
											</Col>
											<Col md='auto'>
												<button style={{ width: '200px', height: '200px', fontSize: '80px', backgroundColor: '#3b563f', color: '#C7B299', borderRadius: '10px' }}>+</button>
											</Col>
										</Row>
										<div style={{ backgroundColor: '#CCCCCC' }}>
											<button
												// disabled={!(title.length && questionArray.length)}
												className='button'
												style={{ height: '35px', fontSize: '12px', paddingTop: '3px', paddingBottom: '5px' }}
											>
												+VIDEO CLIP
											</button>
											<button
												// disabled={!(title.length && questionArray.length)}
												className='button'
												style={{ height: '35px', fontSize: '12px', paddingTop: '3px', paddingBottom: '5px' }}
											>
												+SOUND
											</button>
											<button
												// disabled={!(title.length && questionArray.length)}
												className='button'
												style={{ height: '35px', fontSize: '12px', paddingTop: '3px', paddingBottom: '5px' }}
											>
												+PICTURE
											</button>
											<button
												// disabled={!(title.length && questionArray.length)}
												className='button'
												onClick={() => {
													console.log(`editing ${index}`)
													this.setState({ editing: true, curIndex: index })
												}}
												style={{ height: '35px', fontSize: '12px', paddingTop: '3px', paddingBottom: '5px' }}
											>
												EDIT
											</button>
										</div>
									</Col>
									<Col>
										<div style={{ height: '50px', background: '#A17F50', borderRadius: '5px', color: '#ffffff', textAlign: 'left', fontSize: '20px', paddingTop: '10px', paddingLeft: '30px' }}>
											ANSWERS
										</div>
										<Row style={{ backgroundColor: '#F1F1F1' }}>
											<Col style={{ paddingLeft: '30px' }}>
												{
													question.options.map((opt, idx) => idx % 2 === 0 && <div style={{ marginTop: '10px' }} key={idx}>
														<div onClick={e => console.log(opt.isCorrect)}>
															<Row style={{ float: 'left', marginLeft: '30px' }}>
																<form>
																	<input type={question.optionType === 'radio' ? 'radio' : 'checkbox'} id="vehicle1" name="vehicle1" value="Bike" readOnly checked={opt.isCorrect} />
																	<label htmlFor="vehicle1" style={{ marginLeft: '10px' }}>{opt.text}</label>
																</form>
															</Row>
															<br />
														</div>
														<div style={{ marginTop: '10px' }}>
															This is first answer1243
														</div>
													</div>)
												}
											</Col>
											<Col style={{ paddingLeft: '30px' }}>
												{
													question.options.map((opt, idx) => idx % 2 === 1 && <div style={{ marginTop: '10px' }} key={idx}>
														<div onClick={e => console.log(opt.isCorrect)}>
															<Row style={{ float: 'left', marginLeft: '30px' }}>
																<form>
																	<input type={question.optionType === 'radio' ? 'radio' : 'checkbox'} id="vehicle1" name="vehicle1" value="Bike" readOnly checked={opt.isCorrect} />
																	<label htmlFor="vehicle1" style={{ marginLeft: '10px' }}>{opt.text}</label>
																</form>
															</Row>
															<br />
														</div>
														<div style={{ marginTop: '10px' }}>
															This is first answer1243
														</div>
													</div>)
												}
											</Col>
										</Row>
									</Col>
								</Row>
							)
						}
					</div>
				</div>
				{
					editing && <AddQuestionModal type='edit' title={questions[curIndex].title} opType='radio' opArray={questions[curIndex].options} />
				}
			</div>
		)
	}
}
/*
const CreateQuiz = ({
	user,
	quizTitle,
	questions,
	isOpen,
	editQuizHandle,
	showToast
}) => {
	const [questionArray, setQuestionArray] = useState([])
	const [title, setTitle] = useState('')
	const [access, setAccess] = useState(true)
	const [loading, setLoading] = useState('stop')
	const [quizCode, setQuizCode] = useState(null)

	const addQuestionHandle = (title, optionType, options) => {
		const arr = [...questionArray]
		arr.push({ title, optionType, options })
		setQuestionArray(arr)
	}
	useEffect(() => {
		if (quizTitle) {
			setTitle(quizTitle)
			setQuestionArray(questions)
			setAccess(isOpen)
		}
	}, [quizTitle, questions, isOpen])

	const createQuiz = async () => {
		if (!(title.length || questionArray.length)) {
			alert('Please add title and questions.')
			return
		} else if (!title.length) {
			alert('Please add Quiz title.')
			return
		} else if (!questionArray.length) {
			alert('Please add any questions.')
			return
		}
		setLoading('start')
		try {
			const result = await fetch('/API/quizzes/create', {
				method: 'POST',
				body: JSON.stringify({
					title,
					uid: user.uid,
					questions: questionArray,
					isOpen: access
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const body = await result.json()
			setQuizCode(body.quizId)
			showToast('Create Quiz', 'Success')
		} catch (e) {
			setLoading('error')
		}
	}
	if (quizCode) return <Redirect push to={`/created-successfully/${quizCode}`} />

	if (loading === 'start') return <LoadingScreen />

}

export default CreateQuiz
*/