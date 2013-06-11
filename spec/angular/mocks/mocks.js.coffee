epicrisis.service 'restService', ['$resource', ($resource) ->
	infeccionMock = 
		id: '1'
		nombre: 'unNombreDeInfeccion'
		hemocultivos:
			positivo: false
		urocultivo:
			positivo: false
		ascitis:
			positivo: false
		cultivos: []

	epicrisisMock =
		id:'1'
		infeccion: infeccionMock

	return { 
		epicrisis:  
			get: (params, callback) -> callback(epicrisis: epicrisisMock)
		infeccion:  
			get: (params, callback) ->
				callback(infeccion: infeccionMock)
			update: (infeccion, success, fail) ->
				if infeccion.id == 0
					fail data: errors: ['Hubo un error y no se pudo actulizar, recargue la pagina y si el error sigue llame a Tomas']
				else
					success infeccion: infeccion
		cultivos:   
			save: (cultivo, callback, error) ->
				if cultivo.nombre
					callback cultivo
				else
					error data: errors: ['ocurrio un error creando el cultivo']
			remove: (cultivo, callback, error) ->
				if cultivo.nombre != 'nombreANoBorrar'
					callback cultivo
				else
					error data: errors: ['No es pudo borrar']
		mockEpicrisis: epicrisisMock
	}

]

#For E2E specs
infeccionMock = 
	id: '1'
	nombre: 'unNombreDeInfeccion'
	hemocultivos:
		positivo: false
	urocultivo:
		positivo: false
	ascitis:
		positivo: false
	cultivos: []
epicrisisMock =
	id:'1'
	infeccion: infeccionMock