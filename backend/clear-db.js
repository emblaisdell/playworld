var db = require('./db')

var mongoose = require('mongoose')

const User = mongoose.model('User')
const Loot = mongoose.model('Loot')
const Group = mongoose.model('Group')
const Game = mongoose.model('Game')
const Playground = mongoose.model('Playground')

User.remove({}, function() {
	console.log('Removed all users')
})

Playground.remove({}, function() {
	console.log('Removed all playgrounds')
})

mongoose.connection.close()
