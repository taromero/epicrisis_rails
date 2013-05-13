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

        it("should show realizado's checkbox marked if positivo is true for a cultivo", function() {
            testRealizadoMarkedIfPositivoIsTrue('ascitis');
            testRealizadoMarkedIfPositivoIsTrue('hemocultivos');
            testRealizadoMarkedIfPositivoIsTrue('urocultivo');
        });

        it("should show realizado's checkbox marked if positivo is false for a cultivo", function() {
            testRealizadoMarkedIfPositivoIsFalse('ascitis');
            testRealizadoMarkedIfPositivoIsFalse('hemocultivos');
            testRealizadoMarkedIfPositivoIsFalse('urocultivo');
        });

        it("should show realizado's checkbox NOT marked if positivo is null for a cultivo", function() {
            testRealizadoNOTMarkedIfPositivoIsNull('ascitis');
            testRealizadoNOTMarkedIfPositivoIsNull('hemocultivos');
            testRealizadoNOTMarkedIfPositivoIsNull('urocultivo');
        });

        function testRealizadoMarkedIfPositivoIsTrue(property){
            inject(function($controller) {
                restService.mockEpicrisis.infeccion[property]['positivo'] = true;
                controller = $controller("EpicrisisDetailCtrl", {$scope: $scope, restService: restService})
                $scope.$apply();
            });
            expect($scope.infeccion[property]['positivo']).toBe(true);
            expect($scope.infeccion[property]['realizado']).toBe(true);
            expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(true);
        }

        function testRealizadoMarkedIfPositivoIsFalse(property){
            inject(function($controller) {
                restService.mockEpicrisis.infeccion[property]['positivo'] = false;
                controller = $controller("EpicrisisDetailCtrl", {$scope: $scope, restService: restService})
                $scope.$apply();
            });
            expect($scope.infeccion[property]['positivo']).toBe(false);
            expect($scope.infeccion[property]['realizado']).toBe(true);
            expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(true);
        }

        function testRealizadoNOTMarkedIfPositivoIsNull(property){
            inject(function($controller) {
                restService.mockEpicrisis.infeccion[property]['positivo'] = null;
                controller = $controller("EpicrisisDetailCtrl", {$scope: $scope, restService: restService})
                $scope.$apply();
            });
            expect($scope.infeccion[property]['positivo']).toBe(null);
            expect($scope.infeccion[property]['realizado']).toBe(false);
            expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(false);
        }
    });

});