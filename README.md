React Select Dropdown

[Demo](http://bhargav175.github.io/react-select-dropdown/dist/index.html#/)

## Installation

    npm install react-select-dropdown
    
Can be used with browserify and React.

## Definition

    var SelectDropdown = require('react-select-dropdown');
    
## Usage
   
    
    
    var ReactSelectDropdownApp = React.createClass({
	getInitialState: function(){
			return {
				items: [{name: 'Item One'}, {name: 'Item Two'}, {name: 'Item Three'}, {name: 'Item Four'}],selected: 1
                };
	},
	onItemSelected: function(item){
			console.log('You just selected ' + item.name);
		    this.setState({selected: this.state.items.indexOf(item));
	    },
	render: function() {
	    var self = this, selected = this.state.selected;
	    //name serves as namespace for events
	    //display_field is the property in an item which will be used to display
	
	return (
	    <div>
        <h1>Dropdown</h1>
	    <SelectDropdown onItemSelected={self.onItemSelected} items={this.state.items} name='simpleDropdown' display_field='name' selected={selected}/>
	</div>
	
	);
	}
    });

	module.exports = ReactSelectDropdownApp;

## Styles


