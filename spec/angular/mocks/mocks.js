
var infeccionMock = { id: '1', nombre: 'unNombreDeInfeccion', hemocultivos: { positivo: false },
                  urocultivo: { positivo: false }, ascitis: { positivo: false }, cultivos: [] };
var epicrisisMock = { id:'1', infeccion: infeccionMock };

epicrisis.service('restService', ['$resource', function($resource) {
  infeccionMock = { id: '1', nombre: 'unNombreDeInfeccion', hemocultivos: { positivo: false },
                  urocultivo: { positivo: false }, ascitis: { positivo: false }, cultivos: [] };

  epicrisisMock = { id:'1', infeccion: infeccionMock };

  return { 
    epicrisis: { get: function(params, callback) { callback({ epicrisis: epicrisisMock }) } } ,
    infeccion: { get: function(params, callback) { callback({ infeccion: infeccionMock }) }, 
    				update: function(infeccion, success, fail) { 
                      if(infeccion.id == 0) {
                        fail({ data: {errors: ['Hubo un error y no se pudo actulizar, recargue la pagina y si el error sigue llame a Tomas']}})
                      } else {
                        success({ infeccion: infeccion })
                      }
              } } ,
    cultivos: { save: function(cultivo, callback, error) {
                        if(cultivo.nombre) {
                          callback(cultivo);
                        } else {
                          error({data: {errors: ['ocurrio un error creando el cultivo'] }})
                        }
                      },
                remove: function(cultivo, callback, error) { 
                          if(cultivo.nombre != 'nombreANoBorrar') {
                            callback(cultivo)
                          } else {
                            error({ data: { errors: ['No es pudo borrar']} })
                          }
                        }
               },
    mockEpicrisis: epicrisisMock
  }

}]);