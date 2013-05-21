var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource']);

epicrisis.directive('infeccionDetail', function() {

  return {
    restrict: 'E',
    transclude: true,
    scope: false,
    controller: function($scope, restService) {
    	var standardCultivos = [ { realizado:null, positivo:null} ]
    	$scope.$watch('epicrisis', function() {
    		if($scope.epicrisis) {
			    $scope.infeccion = $scope.epicrisis != undefined ? $scope.epicrisis.infeccion : { };
			    standardCultivos = []
			    //Evita problemas de null pointers cuando alguno de los cultivos no esta inicializado
			    _([$scope.infeccion.ascitis, $scope.infeccion.hemocultivos, $scope.infeccion.urocultivo]).each(function(c) {
			    	if(c){
			    		standardCultivos.push(c);
			    	}
			    });
			    setRealizado()
			}
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
			$scope.httpStatus = 'warning'
			$scope.httpMessage = 'actualizando, espere por favor'
			restService.infeccion.update($scope.infeccion, function(data) {
				$scope.infeccion = data.infeccion;
				setRealizado()
				$scope.httpStatus = 'success'
				$scope.httpMessage = 'actualizado correctamente'
			}, function(data) {
				$scope.httpStatus = 'error'
				$scope.httpMessage = data.errors[0]
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