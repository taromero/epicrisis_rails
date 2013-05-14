var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource']);

epicrisis.directive('infeccion', function() {

  return {
    restrict: 'E',
    transclude: true,
    template:
        '<div id="infeccion" class="span4 container" style="border: 1px solid #ccc;" ng-controller="EpicrisisDetailCtrl">' +
			'<blockquote>' +
				'<strong><p class="lead">Infeccion <a class="btn" ng-click=""><i class="icon-plus"></i></a></p></strong>' +
			'</blockquote>' +
			'<div class="content" ng-show="infeccion != null">' +
				'<div>' +
					'Nombre' +
					'<input type="text" class="nombre" ng-model="infeccion.nombre"/>' +
				'</div>' +
				'<div>' +
					'Cultivos:' +
					'<table class="table table-striped table-bordered table-hover table-condensed">' +
						'<thead>' +
							'<th>Cultivo</th>' +
							'<th>Realizado</th>' +
							'<th>Resultado</th>' +
						'</thead>' +
						'<tbody>' +
							'<tr class="hemocultivos">' +
								'<td>HEMOCULTIVOS</td>' +
								'<td><input type="checkbox" ng-model="infeccion.hemocultivos.realizado" class="realizado"/></td>' +
								'<td><input type="checkbox" ng-model="infeccion.hemocultivos.positivo" class="positivo"/></td>' +
							'</tr>' +
							'<tr class="urocultivo">' +
								'<td>UROCULTIVO</td>' +
								'<td><input type="checkbox" ng-model="infeccion.urocultivo.realizado" class="realizado"/></td>' +
								'<td><input type="checkbox" ng-model="infeccion.urocultivo.positivo" class="positivo"/></td>' +
							'</tr>' +
							'<tr class="ascitis">' +
								'<td>ASCITIS</td>' +
								'<td><input type="checkbox" ng-model="infeccion.ascitis.realizado" class="realizado"/></td>' +
								'<td><input type="checkbox" ng-model="infeccion.ascitis.positivo" class="positivo"/></td>' +
							'</tr>' +
						'</tbody>' +
					'</table>' +
					'<otroscultivos></otroscultivos>' +
					'<div>' +
						'Shock Septico' +
						'<input type="text" ng-model="infeccion.shockSeptico"/>	' +
					'</div>' +
					'<div>' +
						'Curación' +
						'<input type="text" ng-model="infeccion.curacion"/>' +
					'</div>' +
					'<div>' +
						'<a ng-click="update()" id="addCultivo" class="btn btn-primary">Guardar</a>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>',
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