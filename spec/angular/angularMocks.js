var epicrisisMocks = angular.module('epicrisisMocks', ['ngResource', 'ui.directives']);

epicrisisMocks.service('restService', ['$resource', function($resource) {

  var infeccion = { id: '1', nombre: 'unNombreDeInfeccion', hemocultivos: { positivo: false },
                    urocultivo: { positivo: false }, ascitis: { positivo: false }, cultivos: [] };
  var epicrisis = { id:'1', infeccion: infeccion };

  infeccion.$update = function(success, fail) { this.id == 0 ? fail({data: {errors: []}}) : success() ; };

  return { 
    epicrisis: { get: function(params, callback) { callback({ epicrisis: epicrisis }) } } ,
    cultivos: { save: function(cultivo) { return cultivo; } },
    mockEpicrisis: epicrisis
  }

}]);