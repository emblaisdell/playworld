var db = require('./db')

var mongoose = require('mongoose')

const User = mongoose.model('User')

User.remove({}, function() {
	console.log("All users removed")
})

mongoose.connection.close()