epicrisis.directive "medicacionIngresoDetail", ->
	restrict: "E"
	transclude: true
	scope: { epicrisis: '=' }
	controller: ['$scope', 'restService', ($scope, restService) ->
		$scope.$watch "epicrisis", ->
			if $scope.epicrisis
				$scope.medicacion_ingreso = $scope.epicrisis.medicacion_ingreso
				$scope.visible = $scope.medicacion_ingreso != null
		$scope.update = ->
			$scope.medicacion_ingreso.epicrisisId = $scope.epicrisis.id
			$scope.httpStatus = "warning"
			$scope.httpMessage = "actualizando, espere por favor"
			restService.medicacion_ingreso.update $scope.medicacion_ingreso, (data) ->
				$scope.epicrisis.medicacion_ingreso = data.medicacion_ingreso
				$scope.httpStatus = "success"
				$scope.httpMessage = "actualizado correctamente"
			, (resp) ->
				$scope.httpStatus = "error"
				$scope.httpMessage = resp.data.errors[0]
	]
	templateUrl: "partials/medicacion-ingreso-detail.html"
	replace: true
