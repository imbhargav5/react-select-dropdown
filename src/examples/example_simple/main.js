'use strict';

var ReactSelectDropdownApp = require('./ReactSelectDropdownApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={ReactSelectDropdownApp}>
    <Route name="/" handler={ReactSelectDropdownApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
