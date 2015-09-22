var Storage = require('../utils/Storage');
var Question = require('../models/Question');

module.exports = {

	createNew: function(){
		//storage.setItem('question', new Question());
		//return storage.getItem('question');
		return new Question();
	},

	getQuestion: function(questionUuid){
		var structure = Storage.getItem('structure');
		if (!structure){
			throw new Error('Structure is not defined in storage');
			return;
		}
		var sections = structure.sections || [];
		for (var i = sections.length - 1; i >= 0; i--) {
			section = sections[i];
			var questions = section.questions;
			for (var j = questions.length - 1; j >= 0; j--) {
				if (questions[j].uuid == questionUuid) {
					return questions[j];
				}
			}

		}
		return null;
	},

	save: function(question, sectionUuid){
		var structure = Storage.getItem('structure');
		if (!structure){
			throw new Error('Structure is not defined in storage');
			return;
		}
		var sections = structure.sections || [];
		var section = null;
		var isEdit = false;
		for (var i = sections.length - 1; i >= 0; i--) {
			if (sections[i].uuid == sectionUuid) {
				section = sections[i];
				var questions = section.questions;
				for (var j = questions.length - 1; j >= 0; j--) {
					if (questions[j].uuid == question.uuid) {
						questions[j] = question;
						isEdit = true;
						break;
					}
				}
				break;
			}
		}

		if (!isEdit && section) {
			section.questions.push(question);
		}
		Storage.setItem('structure', structure);
	}
}

/*module.exports = {
	init: function () {
		storage.clear();
		storage.setItem('question', {
			title: 'Temp',
			text: 'What\'s the Fuck?',
			type: 'match_item',
			img: null,
			answers: [
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d2',
					text: 'Test',
					weight: 1,
					height: 20,
					width: 1,
					img: null,
					conditions: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2re',
							text: '1',
							condition: 'equal'
						}
					],
					conditionsText: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2r',
							text: 'condition0',
							condition: 'equal'
						}
					],
					conformities: [
						{
							uuid: 'b6363c6e',
							text: ''
						}
					]
				},
				{
					uuid: 'b6363c6e-0c11-41b5-ac2c-3000b87961d1',
					text: 'Test1',
					weight: 2,
					height: 20,
					width: 1,
					img: {
						name:'blue.png',
						id:'6166916040804028637',
						error: null
					},
					conditions: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2s',
							text: '2',
							condition: 'moreOrEqual'
						},

						{
							uuid: 'b6363c6e-0c11-41b5-ac2a',
							text: 'condition3',
							condition: 'lessOrEqual'
						}
					],
					conditionsText: [
						{
							uuid: 'b6363c6e-0c11-41b5-ac2',
							text: 'condition2',
							condition: 'equal'
						},

						{
							uuid: 'b6363c6e-0c11-41b5-ac',
							text: 'condition3',
							condition: 'contains'
						}
					],

					conformities: [
						{
							uuid: 'b6363c6',
							text: ''
						},
						{
							uuid: 'b6363c5',
							text: ''
						},
					]
				}
			]
		});
	}
};*/