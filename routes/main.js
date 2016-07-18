var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var kue = require('kue');
var jobs = kue.createQueue();
var Job = require('../models/Jobs.js');
var request = require('request');
var authmiddleware = require('../middleware/authmiddleware.js');

module.exports = function(router) {
	router.use(bodyparser.json());
	router.post('/main',authmiddleware,function(req,res){
		if(!req.body.url){
			res.status(400).json({error: 'The body should contain a url property'});
		}
		else {
			var url = req.body.url;
			if(isURLWithProtocol(url)){
				createJob(url,res);
			}
			else if (isURL(url)){
			 	url = 'http://' + url;
				createJob(url,res);
			}
			else {
				res.status(400).json({error: 'Please Enter a valid url'});
			}
		}
		
	});
}

function createJob(url,res) {
	var job = jobs.create('fetch html',{
			url:url
	});
	job.on('enqueue',function() {
			var newJob = Job({
				jobId: job.id,
				completed: false
			});
			
			newJob.save(function(err,doc){
				if(err){
					return res.status(500).send();
				}
				else {
					res.status(200).json({jobId: doc.jobId});
				}
			});
	}).save();
	
	
}

function isURL(url){
	var expression =  /(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
	return expression.test(url);
}

function isURLWithProtocol(url) {
	var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
	return expression.test(url);
}

jobs.process('fetch html',1, function(job,done){
	request(job.data.url,function(error,response,body){
		if(error){
			Job.findOneAndUpdate({jobId: job.id},{data: 'There was a problem in fetching data'},{new:true},function(err,doc){
				if(err){
					return console.log(err);
				}
			});
		}
		else {
			Job.findOneAndUpdate({jobId: job.id},{completed:true,data: body},{new:true},function(err,doc){
				if(err){
					return console.log(err);
				}	
			});
		}
	});
	done();
});