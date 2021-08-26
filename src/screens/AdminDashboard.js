import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import './UserDashBoard.css'
import CreatedQuizCard from '../components/CreatedQuizCard'
import JoinedQuizCard from '../components/JoinedQuizCard'
import LoadingScreen from './LoadingScreen'
import CreateQuiz from './CreateQuiz'
import { Carousel } from 'react-bootstrap'
import firebase from '../firebase/firebase'

const AdminDashboard = ({ user }) => {
  const [createdQuizzes, setCreatedQuizzes] = useState([])
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
    <div className='dash-body'>
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
