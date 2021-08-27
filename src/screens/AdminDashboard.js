import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Toast, ToastContainer } from 'react-bootstrap'
import './UserDashBoard.css'
import CreatedQuizCard from '../components/CreatedQuizCard'
import JoinedQuizCard from '../components/JoinedQuizCard'
import LoadingScreen from './LoadingScreen'
import CreateQuiz from './CreateQuiz'
import firebase from '../firebase/firebase'

const AdminDashboard = ({ user, showToast }) => {
  const [createdQuizzes, setCreatedQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editQuiz, setEditQuiz] = useState([])
  const [allQuizzes, setAllQuizzes] = useState([])
  const [path, setPath] = useState('')
  const [show, setShow] = useState(false)
  const [toastTitle, setToastTitle] = useState('')
  const [toastContent, setToastContent] = useState('')
  // Fetch Data from the API
  useEffect(() => {
    // if (!user.uid) {
    // 	setLoading(false)
    // 	return
    // }
    const fetchQuizData = async () => {
      let results, quizData
      if (!!user && !!user.uid) {
        results = await fetch(`/API/users/${user.uid}`)
        quizData = await results.json()
        if (quizData.createdQuiz) setCreatedQuizzes(quizData.createdQuiz)
        console.log('created quiz:', quizData.createdQuiz)
        results = await fetch(`/API/quizzes`)
        quizData = await results.json()
        console.log('all quiz:', quizData)
        if (quizData.quizData) {
          setAllQuizzes(quizData.quizData)
        }
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
      let temp = [...createdQuizzes]
      temp[editQuiz[0]].title = title
      temp[editQuiz[0]].questions = questions
      temp[editQuiz[0]].isOpen = isOpen
      setCreatedQuizzes(temp)
      temp = [...allQuizzes]
      const index = temp.findIndex(quiz => quiz._id === createdQuizzes[editQuiz]._id)
      temp.splice(index, 1)
      setAllQuizzes(temp)
      setEditQuiz([])
      setLoading(false)

      // setToastTitle('Edit Quiz')
      // setToastContent('Success')
      // setShow(true)
      showToast('Edit Quiz', 'Success')
    }
  }

  const deleteQuiz = async index => {
    setLoading(true)
    const id = createdQuizzes[index]._id
    const results = await fetch(`/API/quizzes/${createdQuizzes[index]._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const submitData = await results.json()
    console.dir(submitData)
    let temp = [...createdQuizzes]
    temp.splice(index, 1)
    setCreatedQuizzes(temp)
    temp = [...allQuizzes]
    const ind = temp.findIndex(quiz => quiz._id === id);
    temp.splice(ind, 1)
    setAllQuizzes(temp)
    setEditQuiz([])
    setLoading(false)
    showToast('Delete Quiz', 'Success')
  }

  if (loading) return <LoadingScreen />

  if (path) {
    return localStorage.getItem('username') == undefined ? <Redirect push to='join-quiz' /> : <Redirect push to={`/attempt-quiz/${path}`} />
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
    <div className='dash-body' style={{ marginTop: '100px' }}>
      <Row>
        <Col xs={6}>
          <ToastContainer position="top-end" className="p-3">
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">{toastTitle}</strong>
              </Toast.Header>
              <Toast.Body>{toastContent}</Toast.Body>
            </Toast>
          </ToastContainer>
        </Col>
      </Row>
      {
        !!(firebase.auth().currentUser) && <div className='quizzes'>
          <div className='heading'>
            <div className='line-left' />
            <h2>My Quiz </h2>
            <div className='line' />
          </div>
          <div className='card-holder' style={{ justifyContent: 'center' }}>
            {createdQuizzes.map((quiz, key) => (
              <CreatedQuizCard
                key={key}
                index={key}
                setEditQuiz={setEditQuiz}
                deleteQuiz={deleteQuiz}
                title={quiz.title}
                code={quiz._id}
                questions={quiz.questions.length}
                isOpen={quiz.isOpen}
              />
            ))}
          </div>
          <div className='heading'>
            <div className='line-left' />
            <h2>All Quiz </h2>
            <div className='line' />
          </div>
          <div className='card-holder' style={{ justifyContent: 'center' }}>
            {
              allQuizzes.map((quiz, key) => (
                <JoinedQuizCard
                  key={key}
                  title={quiz.title}
                  // score={quiz.responses[0].score}
                  questions={quiz.questions.length}
                  id={quiz._id}
                  joinQuiz={setPath}
                />
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default AdminDashboard
