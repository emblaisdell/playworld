var express = require('express')
var app = express()

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});

/*app.get('/', function (req, res) {
  res.send('Hello World!')
})*/

app.post('/register',function(req,res){
	
})

app.use('/webapp', express.static(path.join(__dirname, '/public')))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
