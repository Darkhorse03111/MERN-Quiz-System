import React from "react"
import "./QuizCard.css"
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'

const JoinedQuizCard = ({ title, questions, id, joinQuiz }) => {
	return <Card className="m-4" style={{ border: '1px solid #a17f50', backgroundColor: 'rgb(41, 70, 52)', borderRadius: '10px', color: '#ffffff' }}>
		<Card.Img variant="top" src="/Quiz/Links/tariq-bin-ziyad-for-burning-the-boats-azhar-abbas.jpg" style={{ borderRadius: '10px' }} />
		<b style={{ marginTop: '30px', borderBottom: '1px solid #ffffff', marginLeft: '12px', marginRight: '12px', paddingBottom: '10px', color: '#ffffff' }}>{title}</b>
		<p style={{ borderBottom: '1px solid #ffffff', marginLeft: '12px', marginRight: '12px', paddingTop: '10px', paddingBottom: '10px', color: '#ffffff' }}>Lesson Quiz</p>
		<p style={{ borderBottom: '1px solid #ffffff', marginLeft: '12px', marginRight: '12px', paddingBottom: '10px', color: '#ffffff' }}>Teacher Shavez Muhammad</p>
		<ListGroup className="myCard list-group-flush" style={{ display: 'none' }}>
			<ListGroupItem className="myCard">{id}</ListGroupItem>
			<ListGroupItem className="myCard"><Button variant="success" onClick={e => joinQuiz(id)} style={{ height: '38px', width: '100%' }}>Join</Button></ListGroupItem>
		</ListGroup>
	</Card>
}

export default JoinedQuizCard