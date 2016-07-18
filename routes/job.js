var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var Job = require('../models/Jobs.js');
var authmiddleware = require('../middleware/authmiddleware.js');

module.exports = function(router) {
	router.use(bodyparser.json());

	router.get('/job/:id',authmiddleware,function(req,res){
		Job.findOne({jobId: req.params.id},function(err,doc){
			res.json({completed: doc.completed, data: doc.data});
		})
	})
}	