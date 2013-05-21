var epicrisisMocks = angular.module('epicrisisMocks', ['ngResource', 'ui.directives']);

epicrisisMocks.service('restService', ['$resource', function($resource) {

  var infeccion = { id: '1', nombre: 'unNombreDeInfeccion', hemocultivos: { positivo: false },
                    urocultivo: { positivo: false }, ascitis: { positivo: false }, cultivos: [] };
  var epicrisis = { id:'1', infeccion: infeccion };

  return { 
    epicrisis: { get: function(params, callback) { callback({ epicrisis: epicrisis }) } } ,
    infeccion: { get: function(params, callback) { callback({ infeccion: infeccion }) }, 
    				update: function(infeccion, success, fail) { 
                      if(infeccion.id == 0) {
                        fail({errors: ['Hubo un error y no se pudo actulizar, recargue la pagina y si el error sigue llame a Tomas']})
                      } else {
                        success({ infeccion: infeccion })
                      }
              } } ,
    cultivos: { save: function(cultivo) { return cultivo; } },
    mockEpicrisis: epicrisis
  }

}]);