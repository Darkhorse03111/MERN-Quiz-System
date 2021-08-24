import React from "react"
import { IconButton } from '@material-ui/core'
import { EditRounded, DeleteRounded } from '@material-ui/icons'
import "./QuizCard.css"
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

const CreatedQuizCard = ({
	title,
	code,
	questions,
	isOpen,
	index,
	setEditQuiz,
	deleteQuiz
}) => <Card style={{ width: '18rem' }} className="m-4">
		<Card.Img variant="top" src="/Quiz/download.jpg" />
		<Card.Body>
			<Card.Title>{title}</Card.Title>
		</Card.Body>
		<ListGroup className="list-group-flush">
			<ListGroupItem>{questions} Questions</ListGroupItem>
			<ListGroupItem>{code}</ListGroupItem>
			<ListGroupItem>{isOpen ? 'Opened' : 'Not Opened'}</ListGroupItem>
			<ListGroupItem>
				<IconButton onClick={() => setEditQuiz([index])}>
					<EditRounded />
				</IconButton>
				<IconButton onClick={() => deleteQuiz(index)}>
					<DeleteRounded />
				</IconButton>
			</ListGroupItem>
		</ListGroup>
	</Card>

export default CreatedQuizCard
