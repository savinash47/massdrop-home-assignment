var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var PORT = process.env.PORT || 8000;

var mainRouter = express.Router();
var jobRouter = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/massdrop-test');

require('./routes/main.js')(mainRouter);
require('./routes/job.js')(jobRouter);

app.set('port',PORT);

app.use('/',mainRouter);
app.use('/',jobRouter);

server.listen(app.get('port'),function(error){
	if(error){
		console.log(error.toString());
	}
	else {
		console.log('SERVER STARTED AND LISTENING ON PORT: ' + PORT);
	}	
});