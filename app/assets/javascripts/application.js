// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
// = require angular.min.js
// = require angular-resource.min.js
//= require_tree .

var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource']);

epicrisis.config(function($routeProvider) {
    $routeProvider.
      when('/epicrisis', {controller:'EpicrisisListCtrl', templateUrl:'/partials/epicrisis-list.html'}).
      when('/epicrisis/:id', {controller:'EpicrisisDetailCtrl', templateUrl:'/partials/epicrisis-detail.html'})
  });

epicrisis.service('restService', ['$resource', function($resource) {

  return {
    epicrisis: $resource('/epicrisis/:id', { id: '@id' }),
    infeccion: $resource('/infeccion/:id')
  }

}]);

epicrisis.controller("EpicrisisDetailCtrl", ['$scope', '$routeParams', 'restService', EpicrisisDetailCtrl]);
