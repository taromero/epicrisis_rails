var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource', 'ui.directives']);

var mockInfeccion = { id: '1', nombre: 'unNombreDeInfeccion', hemocultivos: { positivo: false },
                  urocultivo: { positivo: false }, ascitis: { positivo: false }, cultivos: [] };
var mockEpicrisis = { id:'1', infeccion: mockInfeccion };

epicrisis.service('restService', ['$resource', function($resource) {
  mockInfeccion.$update = function(success, fail) { this.id == 0 ? fail({data: {errors: []}}) : success() ; };

  return { 
    epicrisis: { get: function(params, callback) { 
      callback({ epicrisis: mockEpicrisis }) 
    } } ,
    infeccion: { get: function(params, callback) { callback({ infeccion: mockInfeccion }) }, 
            update: function(infeccion, callback) { callback({ infeccion: mockInfeccion }) } } ,
    cultivos: { save: function(cultivo) { return cultivo; } },
    mockEpicrisis: mockEpicrisis
  }

}]);