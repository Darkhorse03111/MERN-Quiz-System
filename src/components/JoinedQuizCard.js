import React from "react"
import "./QuizCard.css"

const JoinedQuizCard = ({ title, score, questions, id, joinQuiz }) => {
	return <div className="quiz-card" onClick={e => joinQuiz(id)}>
		<h1 id="created-quiz-title" style={{ textAlign: 'center' }}>{title}</h1>
		<div id="horizontal-line"></div>
		<div id="row">
			<div style={{ margin: 'auto' }}>Questions : {questions}</div>
		</div>
		<div id="row">
			<div id="questions">ID : {id}</div>
		</div>
	</div>
}

export default JoinedQuizCard
