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
		res.status(400).send('Invalid parameter(s)')
		return
	}

	newUser.save(function(err) {
		if (err) {
			res.status(400).send('Username already exists')
			return
		}

		console.log('New user created')
		res.status(200).send(newUser)
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
