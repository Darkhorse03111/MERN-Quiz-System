import React from "react"
import { IconButton } from '@material-ui/core'
import { EditRounded, DeleteRounded } from '@material-ui/icons'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import "./QuizCard.css"
import { Card, ListGroup, ListGroupItem, Button, Row, Col } from 'react-bootstrap'

const CreatedQuizCard = ({
	title,
	code,
	questions,
	isOpen,
	index,
	setEditQuiz,
	deleteQuiz
}) => <Card className="m-4" style={{ border: '1px solid #a17f50', backgroundColor: 'rgb(41, 70, 52)', borderRadius: '10px', color: '#ffffff', width: '236px' }}>
		<Card.Img variant="top" src="/Quiz/Links/tariq-bin-ziyad-for-burning-the-boats-azhar-abbas.jpg" style={{ borderRadius: '10px' }} />
		<b style={{ marginTop: '30px', borderBottom: '1px solid #ffffff', marginLeft: '12px', marginRight: '12px', paddingBottom: '10px', color: '#ffffff' }}>{title}</b>
		<p style={{ borderBottom: '1px solid #ffffff', marginLeft: '12px', marginRight: '12px', paddingTop: '10px', paddingBottom: '10px', color: '#ffffff' }}>Lesson Quiz</p>
		<p style={{ borderBottom: '1px solid #ffffff', marginLeft: '12px', marginRight: '12px', paddingBottom: '10px', color: '#ffffff' }}>Teacher Shavez Muhammad</p>
		<Row style={{ marginBottom: '10px', paddingLeft: '5px', paddingRight: '5px' }}>
			<Col>
				<button className="button" style={{ height: '24px', padding: '2px', margin: '0px', fontSize: '10px' }}>Publish</button>
			</Col>
			<Col>
				<IconButton style={{ padding: 0, color: '#a17f50' }} onClick={() => deleteQuiz(index)}>
					<FileCopyIcon />
				</IconButton>
			</Col>
			<Col>
				<IconButton style={{ padding: 0, color: '#a17f50' }} onClick={() => deleteQuiz(index)}>
					<EditRounded />
				</IconButton>
			</Col>
			<Col>
				<IconButton style={{ padding: 0, color: '#a17f50' }} onClick={() => deleteQuiz(index)}>
					<DeleteRounded />
				</IconButton>
			</Col>
		</Row>
	</Card>

export default CreatedQuizCard
