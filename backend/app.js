var db = require('./db')

var express = require('express')
var mongoose = require('mongoose')

var app = express()
path = require('path');

const User = mongoose.model('User')
const Loot = mongoose.model('Loot')
const Group = mongoose.model('Group')

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

app.post('/user/loot', function (req, response) {
  var username = req.body.username
  User.findOne({username: username}, 'loots', function(err, user){
    if(err) {
      res.status(400).send('Error fetching loot for {0}'.format(username))
    }

    res.status(200).send(user);
  })
})

app.post('/user/group', function(req, response) {
  var username = req.body.username
  User.findOne({username: username}, 'group', function(err, user) {
    if(err) {
      res.status(400).send('Error finding group for {0}'.format(username))
    }

    res.status(200).send(user);
  })
})

app.listen(3000, function () {
  console.log('App listening on port', 3000)
})
