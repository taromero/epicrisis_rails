epicrisis.directive('otrosCultivos', function() {
	return {
	    restrict: 'E',
	    transclude: true,
	    scope: false,
	    controller: function($scope, restService) {
			$scope.nuevoCultivo = { nombre: '', positivo: false };
			
			$scope.newCultivo = function() {
				$scope.newFormEnabled = true;
			}

			$scope.addCultivo = function() {
		    	$scope.nuevoCultivo.epicrisis = $scope.epicrisis;
				$scope.infeccion.cultivos.push(restService.cultivos.save($scope.nuevoCultivo));
				$scope.newFormEnabled = false;
				$scope.nuevoCultivo = { nombre: '', positivo: false };
			}
		},
	    templateUrl: 'partials/otros-cultivos.html',
	    replace: true
	}
});