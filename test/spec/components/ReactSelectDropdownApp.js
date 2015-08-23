'use strict';

describe('ReactSelectDropdownApp', () => {
  let React = require('react/addons');
  let ReactSelectDropdownApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactSelectDropdownApp = require('components/ReactSelectDropdownApp.js');
    component = React.createElement(ReactSelectDropdownApp);
  });

  it('should create a new instance of ReactSelectDropdownApp', () => {
    expect(component).toBeDefined();
  });
});
