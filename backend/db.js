var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test')

var conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error'))
conn.once('open', console.log.bind(console, 'connection successful'))

var Schema = mongoose.Schema

var userScheme = new Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
})

var User = mongoose.model('User', userScheme)

module.exports = User