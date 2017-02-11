var express = require('express')
var path = require('path')
var parser = require('body-parser')
var fs = require('node-fs')

var app = express()
app.use(parser.urlencoded({extended: true}))

config = JSON.parse(fs.readFileSync("config.json"));

games = {}

app.get('/', function (req, response) {
  response.send('Hub Active')
})

app.post('/gameStart',function(req,res){
	var gameType = req.body.type;
	var players = req.body.players;
	if(!gameType){
		res.status(400).send('No game type selected')
	}
	if(!players){
		res.status(400).send('No valid players')
	}
	if(!config.setup.hasOwnProperty(gameType)){
		res.status(400).send("Game type not supported at this location")
	}
	games.push(new Game(gameType,players))
})

function Game(type,players){
	this.type = type;
	this.players = players;
}

app.listen(3030, function () {
  console.log('App listening on port', 3030)
})