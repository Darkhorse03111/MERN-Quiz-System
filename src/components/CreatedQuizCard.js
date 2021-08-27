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
}) => <Card style={{ width: '300px' }} className="m-4">
		<Card.Img variant="top" src="/Quiz/download.jpg" />
		<Card.Body className="myCard">
			<Card.Title>{title.length < 15 ? title : title.substr(0, 12) + '...'}({questions})</Card.Title>
			<ListGroup className="myCard">
				<ListGroupItem className="myCard">{code}</ListGroupItem>
				<ListGroupItem className="myCard">{isOpen ? 'Opened' : 'Not Opened'}</ListGroupItem>
				<ListGroupItem className="myCard">
					<IconButton onClick={() => setEditQuiz([index])}>
						<EditRounded />
					</IconButton>
					<IconButton onClick={() => deleteQuiz(index)}>
						<DeleteRounded />
					</IconButton>
				</ListGroupItem>
			</ListGroup>
		</Card.Body>
	</Card>

export default CreatedQuizCard
