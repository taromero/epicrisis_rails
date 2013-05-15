var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource']);

epicrisis.directive('infeccionDetail', function() {

  return {
    restrict: 'E',
    transclude: true,
    scope: false,
    controller: function($scope, restService) {
    	var standardCultivos;
    	$scope.$watch('epicrisis', function() {
		    $scope.infeccion = $scope.epicrisis.infeccion;
		    standardCultivos = [$scope.infeccion.ascitis,
								$scope.infeccion.hemocultivos,
								$scope.infeccion.urocultivo];
		    setRealizado()
		});

		$scope.$watch(function() { 
			return _(standardCultivos).map(function(cultivo) { return cultivo.positivo });
		}, function() {
		    setRealizado();
		}, true);

		$scope.$watch(function() { 
			return _(standardCultivos).map(function(cultivo) { return cultivo.realizado });
		}, function() {
			_(standardCultivos).each(function(cultivo) {
				if(cultivo.positivo == true && cultivo.realizado == false){
		    		cultivo.positivo = null;
			    }
			});
		}, true);

		$scope.update = function() {
			$scope.infeccion.epicrisisId = $scope.epicrisisId;
			restService.infeccion.update($scope.infeccion, function(data) {
				$scope.infeccion = data.infeccion;
				setRealizado()
			});
		}

		function setRealizado() {
			_(standardCultivos).each(function(cultivo) {
				cultivo.realizado = cultivo.positivo != null;
			});
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