// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// = require jquery/jquery.min.js
// = require jquery-ui/ui/minified/jquery-ui.custom.min.js
// = require angular/angular.min.js
// = require angular-ui/build/angular-ui.min.js
// = require angular-resource/angular-resource.min.js
// = require underscore/underscore-min.js
// = require bootstrap/docs/assets/js/bootstrap.min.js
//= require_tree .

var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource', 'ui.directives']);

epicrisis.config(function($routeProvider) {
  $routeProvider.
    when('/epicrisis/:id', { template: '<epicrisis-detail></epicrisis-detail>' }).
    otherwise({redirectTo: '/epicrisis/2'})
});
