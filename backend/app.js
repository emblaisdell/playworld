var db = require('./db')

var express = require('express')
var mongoose = require('mongoose')

var app = express()
path = require('path');

const User = mongoose.model('User')
const Loot = mongoose.model('Loot')

app.get('/', function (req, response) {
  response.send('Hello, world!')
})

app.use('/webapp', express.static(path.join(__dirname + '/../public')));

app.post('/register', function (req, response) {
	var newUser = new User({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
	})

	if (!(newUser.name && newUser.username && newUser.password)) {
		response.send('Invalid parameter(s)', 400)
		return
	}

	newUser.save(function(err) {
		if (err) {
			response.send('Username {0} exists'.format(req.body.username), 400)
			return
		}

		console.log('User {0} created'.format(req.body.username))
	})
})

app.listen(3000, function () {
  console.log('App listening on port', 3000)
})
