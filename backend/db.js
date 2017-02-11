var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test')

var conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error'))
conn.once('open', console.log.bind(console, 'connection successful'))

var Schema = mongoose.Schema

var userScheme = new Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	loots: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Loot'
	}]
})

var User = mongoose.model('User', userScheme)

var lootScheme = new Schema({
	type: {
		type: String,
		required: true
	},
	text: String,
	primaryColor: String,
	secColor: String
})

var Loot = mongoose.model('Loot', lootScheme)

module.exports = User
