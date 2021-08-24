import React from "react"
import "./QuizCard.css"
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

const JoinedQuizCard = ({ title, questions, id }) => {
	return <Card style={{ width: '18rem' }} className="m-4">
		<Card.Img variant="top" src="/Quiz/download.jpg" />
		<Card.Body>
			<Card.Title>{title}</Card.Title>
		</Card.Body>
		<ListGroup className="list-group-flush">
			<ListGroupItem>{questions} Questions</ListGroupItem>
			<ListGroupItem>{id}</ListGroupItem>
		</ListGroup>
	</Card>
}

export default JoinedQuizCard