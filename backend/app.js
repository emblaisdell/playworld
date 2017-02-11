var db = require('./db')

var express = require('express')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function() {
	console.log("successful")
})

var app = express()

const User = mongoose.model('User')

app.get('/', function (req, res) {
  res.send('Hello, world!')
})

app.listen(3000, function () {
  console.log('App listening on port', 3000)
})
