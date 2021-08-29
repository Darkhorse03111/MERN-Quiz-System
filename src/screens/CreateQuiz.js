import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import './CreateQuiz.css'
import AddQuestionModal from '../components/AddQuestionModal'
import QuestionsTable from '../components/QuestionsTable'
import { Switch } from '@material-ui/core'
import LoadingScreen from './LoadingScreen'

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

	return (
		<div id='main-body'>
			<div id='create-quiz-body'>
				<div className='quiz-header'>
					<Row>
						<Col>
							<input
								style={{width:'600px',height:'35px', fontSize:'25px'}}
								type='text'
								className='input-text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
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
							onClick={() => {
								if (quizTitle) editQuizHandle(title, questionArray, access)
								else createQuiz()
							}}
							style={{height:'35px', fontSize:'20px', paddingTop:'3px', paddingBottom:'5px'}}
						>
							+Question
						</button>
						</Col>
						<Col md='auto'>
						<div className='button' style={{borderRadius:'20px', paddingTop:'3px',paddingBottom:'0px', height:'35px', fontSize:'20px'}}>Subject</div>
							<select style={{width:'100px'}}>
								<option>Qur'an</option>
								<option>Arabic</option>
								<option>Islamic Studies</option>
							</select>
						</Col>
						<Col md='auto' style={{paddingTop:'5px'}}>
							<Switch
								checked={access}
								onChange={(e) => setAccess(e.target.checked)}
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
							onClick={() => {
								if (quizTitle) editQuizHandle(title, questionArray, access)
								else createQuiz()
							}}
							style={{height:'35px', fontSize:'20px', paddingTop:'3px', paddingBottom:'5px'}}
						>
							Edit
						</button>
						</Col>
					</Row>
					<Row style={{marginTop:'30px'}}>
						<Col>
							<div style={{height:'50px',background:'#A17F50', borderRadius:'5px', color:'#ffffff', color: '#ffffff',textAlign: 'left', fontSize: '20px',paddingTop: '10px', paddingLeft: '30px'}}>
								QUESTION 1
							</div>
							<Row style={{paddingTop:'20px', paddingBottom:'20px'}}>
								<Col>
								<div style={{height:'100%',position: 'relative'}}>
									<p style={{margin:'0', position:'absolute', top:'50%',left:'20%',transform:'translate(-20%,-50%)'}}>
									Question Lorem ipsum dolor sit amet, consectetuer
									adipiscing elit, sed diam nonummy nibh euismod
									tincidunt ut laoreet dolore magna
									</p>
								</div>
								</Col>
								<Col md='auto'>
									<button style={{width:'200px', height:'200px', fontSize:'80px', backgroundColor:'#3b563f',color:'#C7B299', borderRadius:'10px'}}>+</button>
								</Col>
							</Row>
							<div>
								<button
									// disabled={!(title.length && questionArray.length)}
									className='button'
									onClick={() => {
										if (quizTitle) editQuizHandle(title, questionArray, access)
										else createQuiz()
									}}
									style={{height:'35px', fontSize:'20px', paddingTop:'3px', paddingBottom:'5px'}}
								>
									+VIDEO CLIP
								</button>
								<button
									// disabled={!(title.length && questionArray.length)}
									className='button'
									onClick={() => {
										if (quizTitle) editQuizHandle(title, questionArray, access)
										else createQuiz()
									}}
									style={{height:'35px', fontSize:'20px', paddingTop:'3px', paddingBottom:'5px'}}
								>
									+SOUND
								</button>
								<button
									// disabled={!(title.length && questionArray.length)}
									className='button'
									onClick={() => {
										if (quizTitle) editQuizHandle(title, questionArray, access)
										else createQuiz()
									}}
									style={{height:'35px', fontSize:'20px', paddingTop:'3px', paddingBottom:'5px'}}
								>
									+PICTURE
								</button>
							</div>
						</Col>
						<Col>
							<div style={{height:'50px',background:'#A17F50', borderRadius:'5px', color:'#ffffff', color: '#ffffff',textAlign: 'left', fontSize: '20px',paddingTop: '10px', paddingLeft: '30px'}}>
								ANSWERS
							</div>
							<Row style={{marginTop:'50px'}}>
								<Col style={{paddingLeft:'30px'}}>
									<div>
									<Row style={{float:'left', marginLeft:'30px'}}>
										<div>
										<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
										<label for="vehicle1" style={{marginLeft:'10px'}}>Answer 2</label>
										</div>
									</Row>
									<br/>
									</div>
									<div>
									<Row style={{float:'left', marginLeft:'30px'}}>
										<div>
										<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
										<label for="vehicle1" style={{marginLeft:'10px'}}>Answer 2</label>
										</div>
									</Row>
									<br/>
									</div>
									<div>
									<Row style={{float:'left', marginLeft:'30px'}}>
										<div>
										<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
										<label for="vehicle1" style={{marginLeft:'10px'}}>Answer 2</label>
										</div>
									</Row>
									<br/>
									</div>
								</Col>
								<Col style={{paddingRight:'30px'}}>
									<div>
									<Row style={{float:'left', marginLeft:'30px'}}>
										<div>
										<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
										<label for="vehicle1" style={{marginLeft:'10px'}}>Answer 2</label>
										</div>
									</Row>
									<br/>
									</div>
									<div>
									<Row style={{float:'left', marginLeft:'30px'}}>
										<div>
										<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
										<label for="vehicle1" style={{marginLeft:'10px'}}>Answer 2</label>
										</div>
									</Row>
									<br/>
									</div>
									<div>
									<Row style={{float:'left', marginLeft:'30px'}}>
										<div>
										<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
										<label for="vehicle1" style={{marginLeft:'10px'}}>Answer 2</label>
										</div>
									</Row>
									<br/>
									</div>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	)
}

export default CreateQuiz
