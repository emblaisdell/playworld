var mongoose = require('mongoose')

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