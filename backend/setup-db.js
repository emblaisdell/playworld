var db = require('./db')

var mongoose = require('mongoose')

const User = mongoose.model('User')
const Loot = mongoose.model('Loot')
const Group = mongoose.model('Group')
const Game = mongoose.model('Game')
const Playground = mongoose.model('Playground')

var hufnagle = new Playground({
	name: 'Hufnagle Park Lewisburg',
	hub_ip: 'localhost:3030',
	latitude: '40.9618211',
	longitude: '-76.8866886'
})

var bertrand = new Playground({
	name: 'Bertrand Library Bucknell',
	hub_ip: 'localhost:3030',
	latitude: '40.954296',
	longitude: '-76.882635'
})

var playgrounds = [hufnagle, bertrand]

playgrounds.forEach(function(playground) {
	playground.save(function(err) {
		if (err) {
			return
		}
	})
})

console.log("All playgrounds saved to DB")

mongoose.connection.close()