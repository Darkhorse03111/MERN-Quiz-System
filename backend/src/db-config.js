// TODO: Rename the filename from TODO-db-config.js to db-config.js
// Paste your MongoDB API key here
module.exports = {
	database: process.env.NODE_ENV.indexOf('production') >= 0 ? 'mongodb+srv://soloviev:qwer1234@quizalharamain.rdgdr.mongodb.net/quiz?retryWrites=true&w=majority' : 'mongodb://localhost/'
}
