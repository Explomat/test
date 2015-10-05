var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var StructureConstants = require('../constants/StructureConstants');
var QuestionConstants = require('../constants/QuestionConstants');
var extend = require('extend-object');

var _structure = {}, _sections = [];

function getQuestion(questionUuid){
	for (var i = _sections.length - 1; i >= 0; i--) {
		section = _sections[i];
		var questions = section.questions;
		for (var j = questions.length - 1; j >= 0; j--) {
			if (questions[j].uuid === questionUuid) {
				return {question: questions[j], index: j}
			}
		}
	}
	return null;
}

function getSection(sectionUuid){
	for (var i = _sections.length - 1; i >= 0; i--) {
		if(_sections[i].uuid === sectionUuid) {
			return _sections[i];
		}
	}
	return null;
}

function loadStructureData(data) {
	_structure = data;
	_sections = data.sections || [];
}

function saveStructureDate(){
	_structure = _sections = null;
}

function saveSection(section){
	var isEdit = false;
	for (var i = _sections.length - 1; i >= 0; i--) {
		if (_sections[i].uuid === section.uuid) {
			_sections[i] = section;
			isEdit = true;
			break;
		}
	}
	if (!isEdit)
		_sections.push(section);
}

function saveQuestion(question, sectionUuid){
	var questionIndex = getQuestion(question.uuid);
	var section = getSection(sectionUuid);

	if (questionIndex === null && section) {
		section.questions.push(question);
	}
	else if (questionIndex !== null && section){
		section.questions[questionIndex.index] = question;
	}
}

function removeQuestion(sectionUuid, questionUuid){
	var questionIndex = getQuestion(questionUuid);
	var section = getSection(sectionUuid);

	if (questionIndex !== null && section) {
		section.questions.splice(questionIndex.index, 1);
	}
}

function replaceQuestion(questionUuid, sourceSectionUuid, destSectionUuid, destQuestionUuid){
	var sourceSection = getSection(sourceSectionUuid);
	var sourceQuestion = getQuestion(questionUuid);
	
	if (sourceSectionUuid === destSectionUuid && destQuestionUuid){
		var destQuestion = getQuestion(destQuestionUuid);
		sourceSection.questions.splice(sourceQuestion.index, 1);
		sourceSection.questions.splice(destQuestion.index, 0, sourceQuestion.question);
		return;
	} 

	var destSection = getSection(destSectionUuid);
	var sourceQuestions = sourceSection.questions || [];
	var destQuestions = destSection.questions || [];
	var deletedQuestion = sourceQuestions.splice(sourceQuestion.index, 1)[0];
	if (deletedQuestion) destQuestions.push(deletedQuestion);
}

function removeSection(uuid){
	var secIndex = _sections.findIndex(function(sec){
		return sec.uuid === uuid;
	});
	if (secIndex != -1)
		_sections.splice(secIndex, 1);
}

var StructureStore = extend({}, EventEmitter.prototype, {
	
	getSections: function(){
		return _sections;
	},

	getStructure: function () {
		return _structure;
	},

	getQuestionIndexNoSection: function(questionUuid){
		var index = 0;
		for (var i = _sections.length - 1; i >= 0; i--) {
			section = _sections[i];
			var questions = section.questions;
			for (var j = questions.length - 1; j >= 0; j--) {
				index++;
				if (questions[j].uuid === questionUuid) {
					return index;
				}
			}
		}
		return null;
	},

	getSectionIndex: function(sectionUuid){
		for (var i = _sections.length - 1; i >= 0; i--) {
			if(_sections[i].uuid === sectionUuid) {
				return i;
			}
		}
		return null;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callBack) {
		this.on('change', callBack);
	},

	removeChangeListener: function(callBack) {
		this.removeListener('change', callBack);
	}
});

StructureStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var isEmit = false;

	switch(action.actionType) {

		case StructureConstants.RECEIVE_STRUCTURE_DATA:
			loadStructureData(action.data);
			isEmit = true;
			break;
		case StructureConstants.SAVE_STRUCTURE_DATA:
			saveStructureDate();
			break;
		case StructureConstants.SAVE_SECTION:
			saveSection(action.section);
			isEmit = true;
			break;
		case StructureConstants.REMOVE_SECTION:
			removeSection(action.uuid);
			isEmit = true;
			break;
		case StructureConstants.REMOVE_QUESTION:
			removeQuestion(action.sectionUuid, action.questionUuid);
			isEmit = true;
			break;
		case StructureConstants.REPLACE_QUESTION:
			replaceQuestion(action.questionUuid, action.sourceSectionUuid, action.destSectionUuid, action.destQuestionUuid);
			isEmit = true;
			break;
		case QuestionConstants.SAVE_QUESTION_DATA:
			saveQuestion(action.question, action.sectionUuid);
			isEmit = true;
			break;
		default:
			return true;
	}

	if (isEmit){
		StructureStore.emitChange();
	}
	return true;
});

module.exports = StructureStore;
