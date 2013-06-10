epicrisis.directive 'otrosCultivos', ->
	restrict: 'E',
	transclude: true,
	scope: false,
	controller: ($scope, restService, $timeout) ->
		$scope.nuevoCultivo = 
			nombre: ''
			positivo: false 
		
		$scope.newCultivo = ->
			$scope.newFormEnabled = true
			$timeout -> $('.newForm input[type="text"]').focus();
		$scope.addCultivo = ->
			$scope.nuevoCultivo.epicrisis = $scope.epicrisis
			restService.cultivos.save $scope.nuevoCultivo, (cultivoCreado) ->
				$scope.infeccion.cultivos.push(cultivoCreado)
				$scope.newFormEnabled = false
				$scope.nuevoCultivo = 
					nombre: ''
					positivo: false
				$scope.nuevoCultivo.httpResponse = 'success'
				$scope.nuevoCultivo.httpMessage = "cultivo #{cultivoCreado.nombre} creado correctamente"
			, (resp) ->
				$scope.nuevoCultivo.httpResponse = 'error'
				$scope.nuevoCultivo.httpMessage = resp.data.errors[0]

		$scope.delete = (cultivo) ->
			cultivo.epicrisis = $scope.epicrisis
			$scope.cultivo = cultivo
			restService.cultivos.remove { epicrisisId: cultivo.epicrisis.id, cultivoId: cultivo.id, nombre: cultivo.nombre }
			, (destroyedCultivo) ->
				$scope.infeccion.cultivos.splice($scope.infeccion.cultivos.indexOf(cultivo), 1);
				$scope.httpStatus = 'success'
				$scope.httpMessage = 'cultivo ' + destroyedCultivo.nombre + ' eliminado correctamente'
			, (resp) ->
				$scope.httpStatus = 'error'
				$scope.httpMessage = resp.errors[0]
	templateUrl: 'partials/otros-cultivos.html',
	replace: true