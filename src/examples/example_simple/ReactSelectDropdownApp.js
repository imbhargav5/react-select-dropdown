'use strict';
var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var SelectDropdown = require('../../lib/index.js');

// CSS
require('normalize.css');
require('./styles/main.css');




var ReactSelectDropdownApp = React.createClass({
	getInitialState: function(){
		return {
			items: [{name: 'Item One'}, {name: 'Item Two'}, {name: 'Item Three'}, {name: 'Item Four'}],
			selected: 1,
			activity: []
		};
	},
	onItemSelected: function(item){
		var activity = 'You just selected ' + item.name;
		this.setState({selected: this.state.items.indexOf(item), activity: this.state.activity.concat(activity)});
	},
	addItem: function(e){
		e.preventDefault();
		if(React.findDOMNode(this.refs.textbox).value.length){
			var obj = {name: React.findDOMNode(this.refs.textbox).value.trim()};
			var arr = this.state.items;
			React.findDOMNode(this.refs.textbox).value = '';
			arr.push(obj);
			var activity = 'You just added ' + obj.name + ' to the list';
			this.setState({items: arr, activity: this.state.activity.concat(activity)});
		}
	},
	render: function() {
	var self = this, selected = this.state.selected;
	var itemsUi = this.state.items.map(function(i){
		return i.name;
	}).join(',');
	var activity = this.state.activity.map(function(i){
		return <li>{i}</li>;
	});
	return (
	<div className='main'>
	<ReactTransitionGroup transitionName='fade'>
	<div className="banner">
	<h1>Dropdown</h1>
	<SelectDropdown onItemSelected={self.onItemSelected} items={this.state.items} name='simpleDropdown' display_field='name' selected={selected}/>
	</div>
	<div className='meta'>
	<h1>All Items</h1><p>{itemsUi}</p><form onSubmit={this.addItem}><input placeholder='Add Item To List' ref='textbox' type='text'/><input type="submit" value="Go"/></form>
	<h1>Activity</h1><ul className="activity">{activity}</ul>
	</div>
	</ReactTransitionGroup>
	</div>
	);
	}
});

module.exports = ReactSelectDropdownApp;
