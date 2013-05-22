var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource']);

epicrisis.directive('infeccionDetail', function() {

  return {
    restrict: 'E',
    transclude: true,
    scope: false,
    controller: function($scope, restService) {
    	$scope.infeccion = { ascitis: null, hemocultivos: null, urocultivo: null }
    	var standardCultivos = []
    	$scope.$watch('epicrisis', function() {
    		if($scope.epicrisis) {
			    $scope.infeccion = $scope.epicrisis.infeccion;
			    setRealizado()
			    standardCultivos = [$scope.infeccion.ascitis, $scope.infeccion.hemocultivos, $scope.infeccion.urocultivo]
			    addWatchers()
			}
		});

    	function addWatchers() {
			$scope.$watch(function() { 
				return _(standardCultivos).map(function(cultivo) { return cultivo.positivo });
			}, function() {
			    setRealizado();
			}, true);

			$scope.$watch(function() { 
				return _(standardCultivos).map(function(cultivo) { return cultivo.realizado });
			}, function() {
				_(standardCultivos).each(function(cultivo) {
					if(cultivo) {
						if(cultivo.positivo == true && cultivo.realizado == false){
				    		cultivo.positivo = null;
					    }
					}
				});
			}, true);
		}

		$scope.update = function() {
			$scope.infeccion.epicrisisId = $scope.epicrisisId;
			$scope.httpStatus = 'warning'
			$scope.httpMessage = 'actualizando, espere por favor'
			if($scope.infeccion.ascitis) {
				if($scope.infeccion.ascitis.realizado == false) {
					$scope.infeccion.ascitis.gasa = null; $scope.infeccion.ascitis.proteinas_totales = null;
					$scope.infeccion.ascitis.recuento_de_neutrofilos = null; $scope.infeccion.ascitis.citologico = null;
				}
			}
			restService.infeccion.update($scope.infeccion, function(data) {
				$scope.infeccion = data.infeccion;
				setRealizado()
				$scope.httpStatus = 'success'
				$scope.httpMessage = 'actualizado correctamente'
			}, function(resp) {
				debugger;
				$scope.httpStatus = 'error'
				$scope.httpMessage = resp.data.errors[0]
			});
		}

		function setRealizado() {
			_([$scope.infeccion.ascitis, $scope.infeccion.hemocultivos, $scope.infeccion.urocultivo]).each(function(cultivo) {
				if(cultivo != null) {
					cultivo.realizado = cultivo.positivo != null;
				}
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