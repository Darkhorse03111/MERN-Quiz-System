import React from "react"
import "./QuizCard.css"
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'

const JoinedQuizCard = ({ title, questions, id, joinQuiz }) => {
	return <Card style={{ width: '18rem' }} className="m-4">
		<Card.Img variant="top" src="/Quiz/download.jpg" />
		<Card.Body>
			<Card.Title>{title}({questions})</Card.Title>
		</Card.Body>
		<ListGroup className="list-group-flush">
			<ListGroupItem>{id}</ListGroupItem>
			<ListGroupItem><Button variant="success" onClick={e => joinQuiz(id)} style={{ height: '38px', width: '100%' }}>Join</Button></ListGroupItem>
		</ListGroup>
	</Card>
}

export default JoinedQuizCard