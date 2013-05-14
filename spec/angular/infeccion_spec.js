describe('Infeccion', function() {
    describe('infeccion section', function() {
        var $scope, template;
        var restService;
        jasmine.getFixtures().fixturesPath = 'public/partials/';
    	beforeEach(function() {
            template = angular.element('<infeccion></infeccion>');
            module('epicrisis');
            module('epicrisisMocks');
            inject(function($injector, $rootScope, $compile, $templateCache) {
                $templateCache.put('partials/infeccion-detail.html', jasmine.getFixtures().getFixtureHtml_('infeccion-detail.html'));
                restService = $injector.get('restService');
            	$scope = $rootScope.$new();
                $compile(template)($scope);
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
            // $scope.update();
            // testRealizadoMarkedIfPositivoIsTrue('ascitis');
            // testRealizadoMarkedIfPositivoIsTrue('hemocultivos');
            // testRealizadoMarkedIfPositivoIsTrue('urocultivo');
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
            recompile(property, true);
            expect($scope.infeccion[property]['positivo']).toBe(true);
            expect($scope.infeccion[property]['realizado']).toBe(true);
            expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(true);
        }

        function testRealizadoMarkedIfPositivoIsFalse(property){
            recompile(property, false);
            expect($scope.infeccion[property]['positivo']).toBe(false);
            expect($scope.infeccion[property]['realizado']).toBe(true);
            expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(true);
        }

        function testRealizadoNOTMarkedIfPositivoIsNull(property){
            recompile(property, null);
            expect($scope.infeccion[property]['positivo']).toBe(null);
            expect($scope.infeccion[property]['realizado']).toBe(false);
            expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(false);
        }

        function recompile(property, positivo){
           inject(function($compile) {
                template = angular.element('<infeccion></infeccion>');
                restService.mockEpicrisis.infeccion[property]['positivo'] = positivo;
                $compile(template)($scope);
                $scope.$apply();
            }); 
        }
    });

});