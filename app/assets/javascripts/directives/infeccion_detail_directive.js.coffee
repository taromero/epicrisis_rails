epicrisis.directive "infeccionDetail", ->
	restrict: "E"
	transclude: true
	scope: false
	controller: ($scope, restService) ->
		$scope.infeccion =
			ascitis: null
			hemocultivos: null
			urocultivo: null
		standardCultivos = []
		$scope.$watch "epicrisis", ->
		  	if $scope.epicrisis
		    	$scope.infeccion = $scope.epicrisis.infeccion
		    	setRealizado()
		    	standardCultivos = [$scope.infeccion.ascitis, $scope.infeccion.hemocultivos, $scope.infeccion.urocultivo]
		    	addWatchers()
		addWatchers = ->
			$scope.$watch ->
			    _(standardCultivos).map (cultivo) -> cultivo.positivo
			, ->
			    setRealizado()
			, true

			$scope.$watch ->
			    _(standardCultivos).map (cultivo) -> cultivo.realizado
			, ->
			    _(standardCultivos).each (cultivo) ->
			      	if cultivo?.positivo and not cultivo?.realizado
			      		cultivo.positivo = null
			, true
		setRealizado = ->
		  	_(standardCultivos).each (cultivo) ->
		    	cultivo.realizado = cultivo?.positivo?
		$scope.update = ->
			$scope.infeccion.epicrisisId = $scope.epicrisisId
			$scope.httpStatus = "warning"
			$scope.httpMessage = "actualizando, espere por favor"
			if not $scope.infeccion.ascitis?.realizado
				$scope.infeccion.ascitis.gasa = null
				$scope.infeccion.ascitis.proteinas_totales = null
				$scope.infeccion.ascitis.recuento_de_neutrofilos = null
				$scope.infeccion.ascitis.citologico = null
			restService.infeccion.update $scope.infeccion, (data) ->
				$scope.infeccion = data.infeccion
				setRealizado()
				$scope.httpStatus = "success"
				$scope.httpMessage = "actualizado correctamente"
			, (resp) ->
			    $scope.httpStatus = "error"
			    $scope.httpMessage = resp.data.errors[0]
	templateUrl: "partials/infeccion-detail.html"
	replace: true
