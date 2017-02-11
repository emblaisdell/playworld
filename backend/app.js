var db = require('./db')

var express = require('express')
var mongoose = require('mongoose')
var path = require('path')
var parser = require('body-parser')
var fs = require('fs')

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

/**
 * Saves a new user if username does not exist already
 * 
 * @return created user object
 */
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

/**
 * Attempts to login user by verifying credentials
 * 
 * @return logged-in user
 */
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

		return res.status(200).send(user)
	})
})

/**
 * Gets publicly available user details for the username 
 * provided
 * 
 * @return user containing publicly available data
 */
app.post('/user', function (req, res) {
	var username = req.body.username
	User.find({username: username}, function(err, user) {
		if (err) {
			return res.status(400).send(err)
		}

		return res.status(200).send(user)
	})
})

app.post('/user/loots', function (req, res) {
  var username = req.body.username
  User.findOne({username: username}, 'loots', function(err, user) {
  	if (err) {
      return res.status(400).send(err)
    }

    return res.status(200).send(user)
  })
})

app.post('/user/groups', function (req, res) {
  var username = req.body.username
  User.findOne({username: username}, 'groups', function(err, user) {
    if(err) {
      return res.status(400).send(err)
    }

    return res.status(200).send(user)
  })
})

app.post('/playgrounds', function(req, res) {
	Playground.find({}, function(err, playgrounds) {
		if (err) {
			return res.status(400).send(err)
		}

		return res.status(200).send(playgrounds)
	})
})

app.post('/game/end', function(req, res) {

})

/**
 * 
 * @return {[type]}
 */
app.post('/game/actions', function(req, res) {
	var filename = req.body.filename + '.json'
	var file_path = path.join(__dirname, '/../games/', filename)
	var game_desc = JSON.parse(fs.readFileSync(file_path, 'utf8'))
	
	if (game_desc) {
		return res.status(200).send(game_desc)
	} else {
		return res.status(404).send('Not found')
	}
})

app.listen(3000, '0.0.0.0', function () {
  console.log('App listening on port', 3000)
})
