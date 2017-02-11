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
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	loot: [String]
})

var User = mongoose.model('User', userScheme)

var lootScheme = new Schema({
	type: String,
	text: String,
	primColor: String,
	secColor: String
})

var Loot = mongoose.model('Loot', lootScheme)

module.exports = User