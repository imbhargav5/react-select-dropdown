var React = require('react');
var $ = require('jquery');
// <Dropdown onItemSelected={self.onItemSelected} items={items} name='simpleDropdown' display_field='text' selected='1'/>
var DropdownItem = React.createClass({displayName: "DropdownItem",
	render: function(){
		if(this.props.selected){
			return React.createElement("li", {className: "dropdown-item active", onClick: this.props.onSelected}, 
						this.props.item[this.props.display_field]
					);
		}else{
			return React.createElement("li", {className: "dropdown-item", onClick: this.props.onSelected}, 
						this.props.item[this.props.display_field]
					);
		}
	}
});
module.exports = React.createClass({displayName: "exports",
	_onItemSelected: function(index, event){
		event.stopPropagation();
		if(this.state.selected !== index){
			this.setState({selected: index});
			this.props.onItemSelected(this.props.items[index]);
		}
		this.setState({open: false});
		this.forceUpdate();
	},
	getInitialState: function(){
		return {open: false,
			selected: this.props.selected};
	},
	componentWillReceiveProps: function(newProps){
		if(newProps.selected !== this.props.selected){
			this.setState({selected: newProps.selected});
		}
	},
	handleClick: function(e){
		var self = this;
		var dropdownMenu = React.findDOMNode(self.refs.dropdown_menu), dropdownRoot = React.findDOMNode(self.refs.dropdown_root);
		e.stopPropagation();
		var documentClickHandler = function(event){
			event.stopPropagation();
				if(!$.contains(dropdownMenu, event.target)){
					if(!$.contains(dropdownRoot, event.target)){
						self.setState({open: false});
						$(document).unbind('click.' + self.props.name, documentClickHandler);
					}
				}
		};
		if(!this.state.open){
			$(document).unbind('click.' + self.props.name, documentClickHandler).bind('click.' + self.props.name, documentClickHandler);
			self.setState({open: true});
		}else{
			$(document).unbind('click.' + self.props.name, documentClickHandler);
			this.setState({open: false});
		}
		if(this.props.onDropdownClick){
			this.props.onDropdownClick();
		}
	},
	render: function(){
		var self = this;
		var dropdownItems = this.props.items.map(function(item, index){
				var selected = (index === self.state.selected);
				return React.createElement(DropdownItem, {key: index, onSelected: self._onItemSelected.bind(self, index), item: item, display_field: self.props.display_field, selected: selected, index: index});
		});
		if(this.props.first_item_is_label){
			dropdownItems = dropdownItems.filter(function(item, index){
				return index > 0;
			});
		}
		var selectedItem = this.props.items.filter(function(item, index){
				return (index === self.state.selected);
		})[0];
		var displayText = selectedItem ? selectedItem[self.props.display_field] : null;
		if(this.props.first_item_is_label){
			displayText = self.props.items[0][self.props.display_field];
		}else{
			displayText = displayText ? React.createElement("span", null, displayText) : null;
		}

		var isActive = self.state.open ? 'active' : '';
		return React.createElement("div", {id: self.props.idName, className: 'bh-dropdown ' + self.props.name + ' ' + isActive, ref: "dropdown_root", onClick: self.handleClick}, 
		displayText, React.createElement("div", {className: "dropdown-container"}, 
		React.createElement("ul", {ref: "dropdown_menu", className: self.state.open ? 'dropdown-menu open' + self.props.name : 'dropdown-menu close' + self.props.names}, 
		dropdownItems
		)
		)
		);
	}
});
