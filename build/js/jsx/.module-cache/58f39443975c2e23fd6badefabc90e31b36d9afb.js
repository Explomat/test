var React = require('React');

var Menu = React.createClass({displayName: "Menu",
	render:function() {
		return (
			React.createElement("div", {className: "menu all"}, 
				React.createElement("div", null, 
					React.createElement("button", {className: "menu-item"}, React.createElement("i", {className: "fa fa-file-image-o fa-2x"})), 
					React.createElement("span", null, "Показывать картинки")
				), 
				React.createElement("div", null, 
					React.createElement("button", {className: "menu-item"}, React.createElement("i", {className: "fa fa-cubes fa-2x"})), 
					React.createElement("span", null, "Показывать вес")
				)
			)
		);
	}
});

var Title = React.createClass({displayName: "Title",
	render:function() {
		return (
			React.createElement("div", {className: "input-group all menu-float"}, 
	            React.createElement("span", {className: "input-group-addon"}, "Заголовок : *"), 
	            React.createElement("input", {type: "text", className: "form-control", placeholder: "Заголовок вопроса"})
	        )
		);
	}
});

var QuestionText = React.createClass({displayName: "QuestionText",
	render:function() {
		return (
			React.createElement("div", {className: "form-group all menu-float"}, 
				React.createElement("label", null, "Вопрос : *"), 
				React.createElement("textarea", {className: "form-control", rows: "2"})
			)
		);
	}
});

var QuestionType = React.createClass({displayName: "QuestionType",

	handleSelect:function() {

	},

	render:function() {
		return (
			React.createElement("div", {className: "btn-group"}, 
				React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.handleSelect}, "Единственный выбор"), 
				React.createElement("button", {type: "button", className: "btn btn-primary dropdown-toggle"}, 
					React.createElement("span", {className: "caret"})
				), 
				React.createElement("ul", {className: "dropdown-menu", role: "menu", style: {"display":"block"}}, 
					React.createElement("li", null, React.createElement("a", {href: "#"}, "Единственный выбор")), 
					React.createElement("li", null, React.createElement("a", {href: "#"}, "Множественный выбор")), 
					React.createElement("li", null, React.createElement("a", {href: "#"}, "Ранжирование")), 
					React.createElement("li", {className: "divider"}), 
					React.createElement("li", null, React.createElement("a", {href: "#"}, "Текстовый ввод")), 
					React.createElement("li", null, React.createElement("a", {href: "#"}, "Цифровой ввод")), 
					React.createElement("li", null, React.createElement("a", {href: "#"}, "Соответствие"))
				)
			)
		);
	}
});

var QuestionView = React.createClass({displayName: "QuestionView",
	render:function () {
		return (
			React.createElement("div", {className: "panel panel-default"}, 
				React.createElement("div", {className: "panel-body"}, 
					React.createElement(Menu, null), 
					React.createElement(Title, null), 
			        React.createElement(QuestionText, null), 
			        React.createElement(QuestionType, null)
				)
			)
		);
	}
});

module.exports = QuestionView;