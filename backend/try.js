var db = require('./db')

var mongoose = require('mongoose')

const User = mongoose.model('User')
const Loot = mongoose.model('Loot')
const Group = mongoose.model('Group')


mongoose.connection.close()
