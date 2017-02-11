var db = require('./db')

var express = require('express')
var mongoose = require('mongoose')

var app = express()

const User = mongoose.model('User')

app.get('/', function (req, response) {
  response.send('Hello, world!')
})

app.listen(3000, function () {
  console.log('App listening on port', 3000)
})
