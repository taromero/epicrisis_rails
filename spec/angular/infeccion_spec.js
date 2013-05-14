describe('Infeccion', function() {
    describe('infeccion section', function() {
        var $scope, template;
        var restService;
        jasmine.getFixtures().fixturesPath = 'public/partials/';
    	beforeEach(function() {
            template = angular.element('<infeccion-detail></infeccion-detail>');
            module('epicrisis');
            module('epicrisisMocks');
            inject(function($injector, $rootScope, $compile, $templateCache) {
                $templateCache.put('partials/infeccion-detail.html', jasmine.getFixtures().getFixtureHtml_('infeccion-detail.html'));
                $templateCache.put('partials/otros-cultivos.html', jasmine.getFixtures().getFixtureHtml_('otros-cultivos.html'));
                restService = $injector.get('restService');
            	$scope = $rootScope.$new();
                $scope.epicrisis = restService.mockEpicrisis;
                $compile(template)($scope);
                $scope.$apply();
            })
        });

		it('should show infeccion information by default', function() {
            expect(template.find('.nombre').val()).toEqual(restService.mockEpicrisis.infeccion.nombre);
        });

        it("should update realizado's checkbox when infeccion is updated", function() {
            testRealizadoMarkedIfPositivoIsTrue('ascitis');
            $scope.infeccion['ascitis']['positivo'] = null;
            $scope.update();
            expect($scope.infeccion['ascitis']['realizado']).toBe(false);
            $scope.infeccion['ascitis']['positivo'] = false;
            $scope.update();
            expect($scope.infeccion['ascitis']['realizado']).toBe(true);
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
            recompile(property, true);
            // expect($scope.infeccion[property]['positivo']).toBe(true);
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
                template = angular.element('<infeccion-detail></infeccion-detail>');
                restService.mockEpicrisis.infeccion[property]['positivo'] = positivo;
                $compile(template)($scope);
                $scope.$apply();
            }); 
        }
    });

});