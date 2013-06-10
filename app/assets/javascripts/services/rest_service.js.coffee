epicrisis.service 'restService', ['$resource', ($resource) ->
    epicrisis: $resource '/epicrisis/:id', { id: '@id' }
    cultivos: $resource '/epicrisis/:epicrisisId/infeccion/cultivos/:cultivoId',
    						{ epicrisisId: '@epicrisis.id', cultivoId: '@id' }
    infeccion: $resource '/epicrisis/:epicrisisId/infeccion', { epicrisisId: '@epicrisisId' }, { update: { method: 'PUT'} }
]