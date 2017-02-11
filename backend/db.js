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
		required: true,
		select: false
	},
	loots: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Loot'
	}],
	groups: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group'
	}]
})

var User = mongoose.model('User', userScheme)

// Loot Schema
var lootScheme = new Schema({
	type: {
		type: String,
		enum: [
			'PATCH',
			'BADGE',
			'TROPHY'
		],
		required: true
	},
	text: String,
	primary_color: String,
	sec_color: String
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
var gameScheme = new Schema({
	type: {
		type: String,
		required: true
	},
	modifier: String,
	started_at: {
		type: Date,
		default: Date.now,
		required: true
	},
	playground: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Playground'
	},
	players: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}],
	winners: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	is_complete: {
		type: Boolean,
		required: true
	}
})

userScheme.pre('save', function(next) {
	this.started_at = new Date()
	this.is_complete = false

	next()
})

var Game = mongoose.model('Game', gameScheme)

// Playground Schema
var playgroundScheme = new Schema({
	name: {
		type: String,
		required: true
	},
	hub_ip: {
		type: String,
		required: true
	},
	latitude: {
		type: Number,
		required: true
	},
	longitude: {
		type: Number,
		required: true
	}
})

playgroundScheme.index(
	{
		latitude: 1,
		longitude: 1	
	}, 
	{
		unique: true
	}
)

var Playground = mongoose.model('Playground', playgroundScheme)

module.exports = User
