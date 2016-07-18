var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	jobId: Number,
	completed: {type: Boolean, default: false},
	data: {type: String, default: null}
});

module.exports = mongoose.model('Jobs',JobSchema);