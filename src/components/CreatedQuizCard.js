import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { EditRounded, DeleteRounded } from '@material-ui/icons'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Card, ListGroup, ListGroupItem, Button, Row, Col } from 'react-bootstrap'
import "./QuizCard.css"

const CreatedQuizCard = ({
	title,
	code,
	questions,
	isOpen,
	index,
	setEditQuiz,
	deleteQuiz,
	publishQuiz,
	showToast
}) => {
	const [path, setPath] = useState('')
	if (path) {
		return <Redirect to={path}></Redirect>
	}
	return <Card className="m-4" style={{ border: '1px solid #a17f50', backgroundColor: 'rgb(41, 70, 52)', borderRadius: '10px', color: '#ffffff', width: '236px' }}>
		<Card.Img variant="top" src="/Quiz/Links/tariq-bin-ziyad-for-burning-the-boats-azhar-abbas.jpg" style={{ borderRadius: '10px' }} />
		<b style={{ marginTop: '20px', borderBottom: '1px solid #ffffff', marginLeft: '12px', marginRight: '12px', paddingBottom: '10px', color: '#ffffff' }}>{title}</b>
		<p style={{ borderBottom: '1px solid #ffffff', marginLeft: '12px', marginRight: '12px', marginBottom: '0px', paddingTop: '3px', paddingBottom: '3px', color: '#ffffff', fontSize: '12px' }}>Lesson Quiz</p>
		<p style={{ borderBottom: '1px solid #ffffff', marginLeft: '12px', marginRight: '12px', paddingTop: '3px', paddingBottom: '3px', color: '#ffffff', fontSize: '12px' }}>Teacher Shavez Muhammad</p>
		<Row style={{ marginBottom: '10px', paddingLeft: '15px', paddingRight: '15px' }}>
			{
				!isOpen && <Col>
					<button className="button" style={{ height: '24px', padding: '2px', margin: '0px', fontSize: '10px' }} onClick={e => publishQuiz(code)}>Publish</button>
				</Col>
			}
			<Col>
				<CopyToClipboard
					text={code}
					onCopy={() => {
						// showToast('Copying Quiz Code', 'Success')
					}}
				>
					<IconButton style={{ padding: 0, color: '#a17f50' }} onClick={() => showToast('Copying Quiz Code', 'Success')}>
						<FileCopyIcon />
					</IconButton>
				</CopyToClipboard>
			</Col>
			<Col>
				<IconButton style={{ padding: 0, color: '#a17f50' }} onClick={() => setPath(`/create-quiz/${code}`)}>
					<EditRounded />
				</IconButton>
			</Col>
			<Col>
				<IconButton style={{ padding: 0, color: '#a17f50' }} onClick={() => deleteQuiz(code)}>
					<DeleteRounded />
				</IconButton>
			</Col>
		</Row>
	</Card>
}
export default CreatedQuizCard
