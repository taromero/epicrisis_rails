function EpicrisisDetailCtrl($scope, $routeParams, restService) {
	restService.epicrisis.get({ id: $routeParams.id}, function(data) {
	    $scope.epicrisis = data.epicrisis;
	    $scope.infeccion = data.epicrisis.infeccion;
	    $scope.infeccion.hemocultivos.realizado = data.epicrisis.infeccion.hemocultivos.positivo != null;
	    $scope.infeccion.urocultivo.realizado = data.epicrisis.infeccion.urocultivo.positivo != null;
	    $scope.infeccion.ascitis.realizado = data.epicrisis.infeccion.ascitis.positivo != null;
	    $scope.nuevoCultivo = {};
	});

	$scope.newCultivo = function(){
		$scope.newFormEnabled = true;
	}

	$scope.addCultivo = function() {
    	$scope.nuevoCultivo.epicrisis = $scope.epicrisis;
		$scope.epicrisis.infeccion.cultivos.push(restService.cultivos.save($scope.nuevoCultivo));
	}



}