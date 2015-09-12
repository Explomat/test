var React = require('react');
var QuestionActions = require('../actions/QuestionActions');
var QuestionAPI = require('../api/QuestionAPI');
var QuestionView = require('../components/QuestionView');
var Config = require('../Config');

module.exports = {

	start: function(args) {
		var app = document.getElementById(Config.dom.questionModalId) || document.body;
		React.unmountComponentAtNode(app);

		QuestionAPI.getQuestionData().then(function(data){
			QuestionActions.receiveQuestion(data);
			React.render(React.createElement(QuestionView, args), app);
		});
	}
}
