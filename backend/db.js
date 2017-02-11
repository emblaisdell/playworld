var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test')

var conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error'))
conn.once('open', console.log.bind(console, 'connection successful'))

var Schema = mongoose.Schema

// User Schema
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
	}],
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}
	personalBest: {
		game: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Game'
			required: true
		}
		date: Date,
		value: Number
	}
})

var User = mongoose.model('User', userScheme)

// Loot Schema
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

// Group Schema
var groupScheme = new Schema({
	members: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
})

var Group = mongoose.model('Group', groupScheme)

// Game Schema
var gameScheme = newSchema({
	type: {
		type: String,
		required: true
	}
	midifier: String,
	date: {
		type: Date,
		required: true
	}
	players: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}]
	winner: String
})

var Game = mongoose.model('Game', gameScheme)

module.exports = User
