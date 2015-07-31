var UUID = require('../utils/UUID');
var Question = require('./Question');

function Section(args) {
	var args = args || {};
	this.uuid = args.uuid || UUID.generate();
	this.questions = args.questions || [ new Question() ];
}

module.exports = Section;