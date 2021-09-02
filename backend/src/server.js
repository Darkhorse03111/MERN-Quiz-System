'use strict'
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = module.exports.io = require('socket.io')(server, {
	cors: {
		origin: '*',
	}
})

const userRoute = require('./Routes/Users')
const quizzesRoute = require('./Routes/Quizzes')
let students = require('./data/students')
let clients = []

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(fileUpload());
app.use('/API/users', userRoute)
app.use('/API/quizzes', quizzesRoute)
app.post('/API/upload', (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: 'No file uploaded' });
	}

	const file = req.files.file;

	file.mv(`${__dirname}/build/uploads/${file.name}`, err => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}

		res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
	});
})

app.use(express.static(`${__dirname}/build`))

io.on('connect', client => {
	client.on('login', body => {
		clients.push(client)
		students.push({ name: body.username, id: client.id, quizCode: body.quizCode, picture: body.picture, mark: '0' })
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
	});
});

app.use('/*', (req, res) => {
	// res.sendFile(path.join(__dirname.substr(0, __dirname.length - 12), 'build', 'index.html'))
	res.sendFile(path.resolve('build/index.html'))
})

server.listen(PORT, () => {
	console.log("Connected to port:" + PORT);
})