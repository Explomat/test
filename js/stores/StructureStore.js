var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var StructureConstants = require('../constants/StructureConstants');
var Section = require('../models/Section')
var ServerConstants = require('../constants/ServerConstants');
var extend = require('extend-object');

var _structure = {};

function loadStructureData(data) {
	_structure = data;
}

function addSection(){
	_structure.sections.push(new Section());
}

function removeSection(uuid){
	var secIndex = _structure.sections.findIndex(function(sec){
		return sec.uuid == uuid;
	});
	if (secIndex != -1)
		_structure.sections.splice(secIndex, 1);
}

var StructureStore = extend({}, EventEmitter.prototype, {
	
	getSections: function(){
		return _structure.sections;
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

	switch(action.actionType) {

		case ServerConstants.RECEIVE_STRUCTURE_DATA:
			loadStructureData(action.data);
			break;
		case StructureConstants.ADD_SECTION:
			addSection();
			break;
		case StructureConstants.REMOVE_SECTION:
			removeSection(action.uuid);
			break;
		default:
			return true;
	}

	StructureStore.emitChange();
	return true;
});

module.exports = StructureStore;
