var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource']);

epicrisis.directive('infeccion', function() {

  return {
    restrict: 'E',
    transclude: true,
    controller: function($scope, $routeParams, restService) {
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
	},
    templateUrl: 'partials/infeccion-detail.html',
    replace: true
  }

});

epicrisis.directive('otroscultivos', function() {
	return {
	    restrict: 'E',
	    transclude: true,
	    template:
	    	'<div>' +
		    	'<table class="table table-striped table-bordered table-hover table-condensed" style="table-layout:fixed">' +
					'<thead>' +
						'<th>Agregar <a class="btn" id="newCultivo" ng-click="newCultivo()"><i class="icon-plus"></i></a></th>' +
						'<th>Resultado</th>' +
					'</thead>' +
					'<tbody>' +
						'<tr ng-repeat="cultivo in infeccion.cultivos">' +
							'<td><input type="text" ng-model="cultivo.nombre" style="width:90%"></td>' +
							'<td><input type="checkbox" ng-model="cultivo.positivo"></td>' +
						'</tr>' +
						'<tr class="newForm" ng-show="newFormEnabled">' +
							'<td>' +
								'<input type="text" ng-model="nuevoCultivo.nombre" placeholder="Nombre">' +
							'</td>' +
							'<td>' +
								'<input type="checkbox" ng-model="nuevoCultivo.positivo">' +
							'</td>' +
							'<td>' +
								'<a ng-click="addCultivo()" id="addCultivo" class="btn btn-primary" id="createCultivo">Agregar Cultivo</a>' +
							'</td>' +
						'</tr>' +
					'</tbody>' +
				'</table>' +
			'</div>',
	    replace: true
	}
});