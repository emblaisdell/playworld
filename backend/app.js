var db = require('./db')

var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var parser = require('body-parser')

var app = express()
app.use(parser.urlencoded({extended: true}))

const User = mongoose.model('User')
const Loot = mongoose.model('Loot')
const Group = mongoose.model('Group')
const Game = mongoose.model('Game')
const Playground = mongoose.model('Playground')

app.get('/', function (req, response) {
  response.send('Hello, world!')
})

app.use('/webapp', express.static(path.join(__dirname + '/../public')));

app.post('/register', function (req, res) {
	var name = req.body.name
	var username = req.body.username
	var password = req.body.password

	var newUser = new User({
		name: name,
		username: username,
		password: password,
	})

	if (!(name && username && password)) {
		return res.status(400).send('Invalid parameter(s)')
	}

	newUser.save(function(err) {
		if (err) {
			return res.status(500).send('Username already exists')
		}

		console.log('New user created')
		return res.status(200).send(newUser)
	})
})

app.post('/login', function (req, res) {
	var username = req.body.username
	var password = req.body.password

	var credentials = {
		username: username,
		password: password
	}

	User.findOne(credentials, function (err, user) {
		if (err) {
			return res.status(400).send(err)
		}

		if (!user) {
			return res.status(404).send('No user found')
		}

		return res.status(200).send('Login successful')
	})
})

app.post('/user', function (req, res) {
	var username = req.body.username
	User.find({username: username}, function(err, user) {
		if (err) {
			return res.status(400).send(err)
		}

		return res.status(200).send(user)
	})
})

app.post('/user/loot', function (req, res) {
  var username = req.body.username
  User.findOne({username: username}, 'loots', function(err, user) {
  	if (err) {
      return res.status(400).send(err)
    }

    return res.status(200).send(user)
  })
})

app.post('/user/group', function (req, res) {
  var username = req.body.username
  User.findOne({username: username}, 'groups', function(err, user) {
    if(err) {
      return res.status(400).send(err)
    }

    return res.status(200).send(user)
  })
})

app.listen(3000, function () {
  console.log('App listening on port', 3000)
})
