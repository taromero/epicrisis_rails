var $scope, template;
var restService;

function initializeInfeccionDirectiveSpec() {
	template = angular.element('<infeccion-detail></infeccion-detail>');
    module('epicrisis');
    inject(function($injector, $rootScope, $compile, $templateCache) {
	    loadTemplates($templateCache);
	    restService = $injector.get('restService');
	    $scope = $rootScope.$new();
	    $scope.epicrisis = restService.mockEpicrisis;
	    $compile(template)($scope);
	    $scope.$apply();
	});
}