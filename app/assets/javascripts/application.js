// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
//= require jquery
//= require jquery_ujs
// = require angular.min.js
// = require angular-resource.min.js
//= require_tree .

var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource', 'ui.directives']);

epicrisis.config(function($routeProvider) {
    $routeProvider.
      // when('/epicrisis', {controller:'EpicrisisListCtrl', templateUrl:'/partials/epicrisis-list.html'}).
      when('/epicrisis/:id', { template: '<epicrisis-detail></epicrisis-detail>' }).
      otherwise({redirectTo: '/epicrisis'})
  });

epicrisis.service('restService', ['$resource', function($resource) {

  return {
    epicrisis: $resource('/epicrisis/:id', { id: '@id' }),
    cultivos: $resource('/epicrisis/:epicrisisId/infeccion/cultivos/:cultivoId', 
    						{ epicrisisId: '@epicrisis.id', cultivoId: '@id' }),
    infeccion: $resource('/epicrisis/:epicrisisId/infeccion', { epicrisisId: '@epicrisisId' }, { update: { method: 'PUT'} })
  }

}]);
