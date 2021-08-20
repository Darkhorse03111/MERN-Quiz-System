// TODO: Rename the filename from TODO-db-config.js to db-config.js
// Paste your MongoDB API key here
const env = process.env.NODE_ENV || 'development'
module.exports = {
	database: env.includes('production') ? 'mongodb+srv://soloviev:qwer1234@quizalharamain.rdgdr.mongodb.net/quiz?retryWrites=true&w=majority' : 'mongodb://localhost/'
}
