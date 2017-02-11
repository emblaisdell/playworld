var express = require('express')
var path = require('path')
var parser = require('body-parser')
var fs = require('node-fs')
var request = require('request');

var app = express()
app.use(parser.urlencoded({extended: true}))

config = JSON.parse(fs.readFileSync("config.json"));

games = []

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
	this.groups = [{
		members:this.players,
		actionNum:0
	}];
	this.winners = [];
	this.actions = [];
	this.initActions();
}
Game.prototype.initActions = function(){
	this.actions.forEach(function(action,i){
		switch(action.type){
			case "win":
				action.winners = 0;
				break;
			case "waitFor":
				action.completedBy = [];
				break;
		}
	})
}
Game.prototype.sensorInput = function(event,player){
	groups.forEach(function(group,i){
		if(this.actions[group.actionNum] == event){
			if(group.members.indexOf(player)!=-1){
				if(false){
					//TODO finish sensor response
				}
			}
		}
	})
}
Game.prototype.getHardware = function(given){
	if(given.substring(0,1)=="#"){
		return config.setup[this.type];
	}
	return given;
}
Game.prototype.nextAction = function(group){
	group.actionNum++;
	if(group.actionNum>=this.actions.length){
		Game.end();
		return;
	}
	var action = this.actions[group.actionNum];
	switch(action.type){
		case "win":
			if(!actions.first || action.winners==0){
				this.winners = this.winners.concat(group.members).unique();
				action.winners++;
			}
			break;
		case "regroup":
			if(action.groupBy=="team"){
				this.groups = [{
					members:this.players,
					actionNum:group.actionNum
				}];
			}else{
				this.groups = [];
				this.players.forEach(function (player,i){
					groups.push({
						members:[player],
						actionNum:group.actionNum
					})
				})
			}
			groups.forEach(function(newGroup,i){
				this.nextAction(newGroup)
			})
			return;
		case "waitfor":
			return;
		case "do":
			var to;
			if(action.where = "everywhere"){
				to = config.hardware;
			}
			else{
				to = action.where.split(",");
			}
			for(var i=0; i<to.length; i++){
				to[i] = getHardware(to[i]);
				request.post(
					to[i]+"/"+action.what,
					data,
					function(){}
				)
			}
			break;
	}
	this.nextAction(group)
}
Game.prototype.end = function(){
	request.post(
		config.serverURL+"/game/end",
		{
			type:this.type,
			winners:this.winners,
			players:this.winners
		},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body)
			}
		}
	)
}

app.listen(3030, function () {
  console.log('App listening on port', 3030)
})


Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};
