'use strict'
const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = module.exports.io = require('socket.io')(server)

const userRoute = require('./Routes/Users')
const quizzesRoute = require('./Routes/Quizzes')
let students = require('./data/students')
let clients = []

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/API/users', userRoute)
app.use('/API/quizzes', quizzesRoute)

app.use(express.static(path.join(__dirname, 'build')))

app.use('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
io.on('connect', client => {
	client.on('login', body => {
		clients.push(client)
		students.push({ name: body.username, id: client.id, quizCode: body.quizCode, mark: '0' })
		let res = students.filter(std => std.quizCode === body.quizCode).sort((a, b) => parseInt(b.mark) - parseInt(a.mark))
		clients.map(clnt => clnt.emit('mark', res))
	})
	client.on('mark', body => {
		let index = students.findIndex(std => std.id === client.id)
		if (index < 0) {
			return;
		}
		students[index].mark = body.currentScore
		let res = students.filter(std => std.quizCode === students[index].quizCode).sort((a, b) => parseInt(b.mark) - parseInt(a.mark))
		clients.map(clnt => clnt.emit('mark', res))
	})
	client.on('disconnect', () => {
		console.log('client disconnected:', client.id)
		let index = students.findIndex(std => std.id === client.id)
		if (index < 0) {
			return;
		}
		students.splice(index, 1)
		index = clients.findIndex(clnt => clnt.id === client.id)
		if (index < 0) {
			return;
		}
		clients.splice(index, 1)
		console.log(students)
	});
});

server.listen(PORT, () => {
	console.log("Connected to port:" + PORT);
})