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
			'<div class="content" ng-show="epicrisis.infeccion != null">' +
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
							'<tr>' +
								'<td>HEMOCULTIVOS</td>' +
								'<td><input type="checkbox" ng-model="infeccion.hemocultivos.realizado"/></td>' +
								'<td><input type="checkbox" ng-model="infeccion.hemocultivos.positivo"/></td>' +
							'</tr>' +
							'<tr>' +
								'<td>UROCULTIVO</td>' +
								'<td><input type="checkbox" ng-model="infeccion.urocultivo.realizado"/></td>' +
								'<td><input type="checkbox" ng-model="infeccion.urocultivo.positivo"/></td>' +
							'</tr>' +
							'<tr>' +
								'<td>ASCITIS</td>' +
								'<td><input type="checkbox" ng-model="infeccion.ascitis.realizado"/></td>' +
								'<td><input type="checkbox" ng-model="infeccion.ascitis.positivo"/></td>' +
							'</tr>' +
						'</tbody>' +
					'</table>' +
					'<table class="table table-striped table-bordered table-hover table-condensed">' +
						'<thead>' +
							'<th>Agregar <a class="btn" id="agregarCultivo" ng-click="agregarCultivo"><i class="icon-plus"></i></a></th>' +
							'<th>Resultado</th>' +
						'</thead>' +
						'<tbody>' +
							'<tr ng-repeat="cultivo in infeccion.otrosCultivos">' +
								'<td><input type="text" ng-model="cultivo.nombre"></td>' +
								'<td><input type="text" ng-model="cultivo.positivo"></td>' +
							'</tr>' +
						'</tbody>' +
					'</table>' +
					'<div>' +
						'Shock Septico' +
						'<input type="text" ng-model="infeccion.shockSeptico"/>	' +
					'</div>' +
					'<div>' +
						'Curación' +
						'<input type="text" ng-model="infeccion.curacion"/>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>',
    replace: true
  }

});