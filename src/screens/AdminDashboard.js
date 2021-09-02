import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col, Toast, ToastContainer } from 'react-bootstrap'
import confirm from "reactstrap-confirm"
import './UserDashBoard.css'
import CreatedQuizCard from '../components/CreatedQuizCard'
import JoinedQuizCard from '../components/JoinedQuizCard'
// import LoadingScreen from './LoadingScreen'
import CreateQuiz from './CreateQuiz'

const AdminDashboard = ({ showToast, history }) => {
  const [createdQuizzes, setCreatedQuizzes] = useState([])
  // const [loading, setLoading] = useState(true)
  const [editQuiz, setEditQuiz] = useState([])
  const [allQuizzes, setAllQuizzes] = useState([])
  const [path, setPath] = useState('')
  const user = localStorage.getItem('user')
  // Fetch Data from the API
  useEffect(() => {
    // if (!user.uid) {
    // 	setLoading(false)
    // 	return
    // }
    const fetchQuizData = async () => {
      let results, quizData
      // if (!!user && !!user.uid) {
      //   results = await fetch(`/API/users/${user.uid}`)
      //   quizData = await results.json()
      //   if (quizData.createdQuiz) setCreatedQuizzes(quizData.createdQuiz)
      //   console.log('created quiz:', quizData.createdQuiz)
      results = await fetch('/API/quizzes/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      quizData = await results.json()
      if (quizData.quizData) {
        setAllQuizzes(quizData.quizData)
      }
      // }
      // setLoading(false)
    }
    fetchQuizData()
  }, [user])

  const editQuizHandle = async (title, questions, isOpen) => {
    if (!title) setEditQuiz([])
    else {
      // setLoading(true)
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
      // setLoading(false)

      // setToastTitle('Edit Quiz')
      // setToastContent('Success')
      // setShow(true)
      showToast('Edit Quiz', 'Success')
    }
  }

  const publishQuiz = async id => {
    let index = allQuizzes.findIndex(quiz => quiz._id === id)
    const result = await fetch('/API/quizzes/edit', {
      method: 'POST',
      body: JSON.stringify({
        ...allQuizzes[index],
        quizId: allQuizzes[index]._id,
        isOpen: true
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const res = await result.json()
    if (res.message === 'Success') {
      allQuizzes[index].isOpen = true
      showToast('Publish Quiz', 'Success')
    }
  }

  const deleteQuiz = async id => {
    let result = await confirm({
      title: (
        <>
          Deleting Quiz
        </>
      ),
      message: "Do you really want to delete this quiz?",
      confirmText: "OK",
      confirmColor: "primary",
      cancelColor: "link text-danger"
    })
    if (result) {
      const result = await fetch(`/API/quizzes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const res = await result.json()
      if (res.id) {
        let temp = allQuizzes.filter(quiz => quiz._id !== id)
        setAllQuizzes(temp)
        showToast('Deleting Quiz', 'Success')
      }
      else {
        showToast('Deleting Quiz', 'Fail', 'error')
      }
    }
  }

  // if (loading) return <LoadingScreen />

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
      {
        <div className='quizzes'>
          <div className='heading'>
            <div className='line-left' />
            <h2>Qur'an</h2>
            <div className='line' />
          </div>
          <div className='card-holder' style={{ justifyContent: 'center' }}>
            {allQuizzes.map((quiz, key) => (
              quiz.type === "Qur'an" && <CreatedQuizCard
                key={key}
                index={key}
                setEditQuiz={setEditQuiz}
                deleteQuiz={deleteQuiz}
                title={quiz.title}
                code={quiz._id}
                questions={quiz.questions.length}
                isOpen={quiz.isOpen}
                publishQuiz={publishQuiz}
                showToast={showToast}
              />
            ))}
          </div>
          <div className='heading'>
            <div className='line-left' />
            <h2>Arabic</h2>
            <div className='line' />
          </div>
          <div className='card-holder' style={{ justifyContent: 'center' }}>
            {allQuizzes.map((quiz, key) => (
              quiz.type === "Arabic" && <CreatedQuizCard
                key={key}
                index={key}
                setEditQuiz={setEditQuiz}
                deleteQuiz={deleteQuiz}
                title={quiz.title}
                code={quiz._id}
                questions={quiz.questions.length}
                isOpen={quiz.isOpen}
                publishQuiz={publishQuiz}
                showToast={showToast}
              />
            ))}
          </div>
          <div className='heading'>
            <div className='line-left' />
            <h2>Islamic Studies </h2>
            <div className='line' />
          </div>
          <div className='card-holder' style={{ justifyContent: 'center' }}>
            {allQuizzes.map((quiz, key) => (
              quiz.type === "Islamic Studies" && <CreatedQuizCard
                key={key}
                index={key}
                setEditQuiz={setEditQuiz}
                deleteQuiz={deleteQuiz}
                title={quiz.title}
                code={quiz._id}
                questions={quiz.questions.length}
                isOpen={quiz.isOpen}
                publishQuiz={publishQuiz}
                showToast={showToast}
              />
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default AdminDashboard
