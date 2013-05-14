var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource']);

epicrisis.directive('infeccionDetail', function() {

  return {
    restrict: 'E',
    transclude: true,
    scope: false,
    controller: function($scope, restService) {
	    $scope.infeccion = $scope.epicrisis.infeccion;
	    setRealizado()

		$scope.update = function() {
			$scope.infeccion.epicrisisId = $scope.epicrisisId;
			restService.infeccion.update($scope.infeccion, function(data) {
				$scope.infeccion = data.infeccion;
				setRealizado()
			});
		}

		function setRealizado() {
			$scope.infeccion.hemocultivos.realizado = $scope.infeccion.hemocultivos.positivo != null;
		    $scope.infeccion.urocultivo.realizado = $scope.infeccion.urocultivo.positivo != null;
		    $scope.infeccion.ascitis.realizado = $scope.infeccion.ascitis.positivo != null;
		}
	},
    templateUrl: 'partials/infeccion-detail.html',
    replace: true
  }

});

epicrisis.directive('otrosCultivos', function() {
	return {
	    restrict: 'E',
	    transclude: true,
	    scope: false,
	    controller: function($scope, restService) {
			$scope.nuevoCultivo = {};
			
			$scope.newCultivo = function() {
				$scope.newFormEnabled = true;
			}

			$scope.addCultivo = function() {
		    	$scope.nuevoCultivo.epicrisis = $scope.epicrisis;
				$scope.infeccion.cultivos.push(restService.cultivos.save($scope.nuevoCultivo));
			}
		},
	    templateUrl: 'partials/otros-cultivos.html',
	    replace: true
	}
});