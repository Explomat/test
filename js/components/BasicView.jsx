var React = require('react');
var Config = require('../config');
var MenuView = require('./modules/MenuView');
var UI = require('../utils/UI');
var Hasher = require('../utils/Hasher');

function getHashRoot(hash){
	var isChainHash = hash.indexOf('/');
	return isChainHash === -1 ? hash : hash.substring(0, isChainHash);
}

var BasicView = React.createClass({

	getInitialState: function(){
		return {
			hash: getHashRoot(window.location.hash)
		}
	},

	componentWillMount: function(){
		this.delay = 250;
		Hasher.changed.add(this._setHash);
	},

	componentDidMount: function() {
		window.addEventListener('scroll', this.handleScroll);
		setTimeout(this._positionFloatingButton, 0);
		this.appTop = this.refs.tests.getBoundingClientRect().top;
	},
 
	componentWillUnmount: function() {
		window.removeEventListener('scroll', this.handleScroll);
	},

	_setHash: function(newHash){
		setTimeout(function(){
			this.setState({hash: getHashRoot('#' + newHash)});
		}.bind(this), this.delay);
		window.scrollTo(0, this.appTop);
		this._positionFloatingButton();
	},

	_positionFloatingButton: function(){
		var btn = this.refs.floatingButton;
		var documentHeight = document.documentElement.clientHeight;
		var testsHeight = this.refs.tests.clientHeight;
		var scrollTop = this.refs.testsBody.getBoundingClientRect().top;

		if (testsHeight > documentHeight){
			var hiddentTestsHeight = testsHeight - documentHeight;
			var visibleTestsHeight = testsHeight - hiddentTestsHeight;
			btn.style.top = (visibleTestsHeight - btn.offsetHeight - scrollTop) + 'px';
		}
		else btn.style.top = null;
	},

	handleScroll: function(e){
		var coordinates = UI.getElementCoordinates(this.refs.tests);
		if (coordinates.positionY <= 0) this.refs.headerFixed.classList.add('tests__header-fixed_stop');
		else this.refs.headerFixed.classList.remove('tests__header-fixed_stop');

		this._positionFloatingButton();
	},

	handleClick: function(e){
		this.refs.floatingList.classList.add('floating-list_active');
	},

	render: function () {
		var c = { transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0px)', opacity: '0' }
		return (
			<div ref="tests" className="tests">
				<div className="tests__header">
					<div ref="headerFixed" className="tests__header-fixed">
						<div className="tests__header-wrapper clearfix">
							<MenuView delay={this.delay} defaultRoute={this.state.hash} routes={[{route: '#settings', title: 'Общие сведения'}, {route: '#structure', title: 'Структура'}, {route: '#view', title: 'Отображение'}]}/>
						</div>
					</div>
				</div>
				<div ref="floatingButton" className="floating-button-box">
					<div onClick={this.handleClick} title="Сохранить тест" className="floating-button">
						<span className="floating-button__icon glyphicon glyphicon-floppy-disk"></span>
					</div>
					<ul ref='floatingList' className="floating-list">
						<li style={c}>
							<div title="Сохранить тест" className="floating-button">
								<span className="floating-button__icon glyphicon glyphicon-floppy-disk"></span>
							</div>
						</li>
						<li style={c}>
							<div title="Сохранить тест" className="floating-button">
								<span className="floating-button__icon glyphicon glyphicon-floppy-disk"></span>
							</div>
						</li>
					</ul>
				</div>
			    <div ref="testsBody" id={Config.dom.appId} className="tests__body"></div>
			</div>
		);
	}
});

module.exports = BasicView;