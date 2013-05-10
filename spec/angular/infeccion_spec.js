describe('Infeccion', function() {
    describe('infeccion section', function() {
        var $scope, template;
        var restService;
    	beforeEach(function() {
            template = angular.element('<infeccion></infeccion>');
            module('epicrisis');
            module('epicrisisMocks');
            inject(function($injector, $controller, $rootScope, $compile) {
                restService = $injector.get('restService');
            	$scope = $rootScope.$new();
                $compile(template)($scope);
                controller = $controller("EpicrisisDetailCtrl", {$scope: $scope, restService: restService})
                $scope.$apply();
            })
        });

		it('should show infeccion information by default', function() {
            expect(template.find('.nombre').val()).toEqual(restService.mockEpicrisis.infeccion.nombre);
        });
    });

});