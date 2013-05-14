function EpicrisisDetailCtrl($scope, $routeParams, restService) {
	var epicrisisId = $routeParams.id;
	restService.infeccion.get({ epicrisisId: $routeParams.id}, function(data) {
	    $scope.infeccion = data.infeccion;
	    $scope.infeccion.hemocultivos.realizado = $scope.infeccion.hemocultivos.positivo != null;
	    $scope.infeccion.urocultivo.realizado = $scope.infeccion.urocultivo.positivo != null;
	    $scope.infeccion.ascitis.realizado = $scope.infeccion.ascitis.positivo != null;
	    $scope.nuevoCultivo = {};
	});

	$scope.newCultivo = function(){
		$scope.newFormEnabled = true;
	}

	$scope.addCultivo = function() {
    	$scope.nuevoCultivo.epicrisis = $scope.epicrisis;
		$scope.infeccion.cultivos.push(restService.cultivos.save($scope.nuevoCultivo));
	}

	$scope.update = function() {
		$scope.infeccion.epicrisisId = epicrisisId;
		restService.infeccion.update($scope.infeccion, function(data) {
			$scope.infeccion = data.infeccion
		});
	}

}