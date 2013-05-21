describe('Infeccion', function() {
    var $scope, template;
    var restService;
    beforeEach(function() {
        template = angular.element('<infeccion-detail></infeccion-detail>');
        module('epicrisis');
        module('epicrisisMocks');
        inject(function($injector, $rootScope, $compile, $templateCache) {
            loadTemplates($templateCache);
            restService = $injector.get('restService');
            $scope = $rootScope.$new();
            $scope.epicrisis = restService.mockEpicrisis;
            $(document).find('body').append(template) //con esto puedo ver el html como queda
            $compile(template)($scope);
            $scope.$apply();
        })
    });

    afterEach(function() {
        $(template).remove();
    });

    describe('update', function() {
        it("should show a success msg en case of successful update", function() {
            expect($('#infeccion .status').hasClass('success')).toBe(false);
            $('#guardar').click();
            expect($('#infeccion .status tr').hasClass('success')).toBe(true);
            expect($scope.httpMessage).toEqual('actualizado correctamente')
        });

        it("should show an error msg en case of unsuccesful update", function() {
            expect($('#infeccion .status').hasClass('error')).toBe(false);
            $scope.infeccion.id = 0;
            $('#guardar').click();
            expect($('#infeccion .status tr').hasClass('error')).toBe(true);
            expect($scope.httpMessage).toEqual('Hubo un error y no se pudo actulizar, recargue la pagina y si el error sigue llame a Tomas')
        });
    });

    it('should show infeccion information by default', function() {
        expect(template.find('.nombre').val()).toEqual(restService.mockEpicrisis.infeccion.nombre);
    });

    it("should update realizado's checkbox when infeccion is updated", function() {
        $scope.infeccion['ascitis']['positivo'] = null;
        $scope.$apply();
        expect($scope.infeccion['ascitis']['realizado']).toBe(false);
        $scope.infeccion['ascitis']['positivo'] = false;
        $scope.$apply();
        expect($scope.infeccion['ascitis']['realizado']).toBe(true);
    });

    describe('standard cultivos', function() {
        it("should show realizado's checkbox marked if positivo is true for a cultivo", function() {
            _(['ascitis', 'hemocultivos', 'urocultivo']).each(function(property) {
                $scope.infeccion[property]['positivo'] = true;
                $scope.$apply();
                expect($scope.infeccion[property]['positivo']).toBe(true);
                expect($scope.infeccion[property]['realizado']).toBe(true);
                expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(true);
            });
        });

        it("should show realizado's checkbox marked if positivo is false for a cultivo", function() {
            _(['ascitis', 'hemocultivos', 'urocultivo']).each(function(property) {
                $scope.infeccion[property]['positivo'] = false;
                $scope.$apply();
                expect($scope.infeccion[property]['positivo']).toBe(false);
                expect($scope.infeccion[property]['realizado']).toBe(true);
                expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(true);
            });
        });

        it("should show realizado's checkbox NOT marked if positivo is null for a cultivo", function() {
            _(['ascitis', 'hemocultivos', 'urocultivo']).each(function(property) {
                $scope.infeccion[property]['positivo'] = null;
                $scope.$apply();
                expect($scope.infeccion[property]['positivo']).toBe(null);
                expect($scope.infeccion[property]['realizado']).toBe(false);
                expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(false);
            });
        });

        describe('realizado', function() {
            it("should watch positivo's value and update accordingly", function() {
                _(['ascitis', 'hemocultivos', 'urocultivo']).each(function(property) {
                    _([
                        [null, false],
                        [false, true],
                        [true, true],
                        [null, false]
                    ]).each(function(positivo_realizado) {
                        $scope.infeccion[property]['positivo'] = positivo_realizado[0];
                        $scope.$apply();
                        expect($scope.infeccion[property]['realizado']).toBe(positivo_realizado[1]);
                    });
                });
            });
        });

        describe('positivo', function() {
            it("should watch realizado's value and update accordingly", function() {
                _(['ascitis', 'hemocultivos', 'urocultivo']).each(function(property) {
                    $scope.infeccion[property]['positivo'] = true;
                    $scope.$apply()
                    $scope.infeccion[property]['realizado'] = false;
                    $scope.$apply()
                    expect($scope.infeccion[property]['positivo']).toBe(null);
                });
            })
        });

        describe('ascitis', function() {
            it('should show ascitis form if realizado is true', function() {
                $scope.infeccion.ascitis.realizado = false;
                $scope.$apply();
                expect(template.find('div.ascitis').css('display')).toBe('none');
                $scope.infeccion.ascitis.realizado = true;
                $scope.$apply();
                expect(template.find('div.ascitis').css('display')).not.toBe('none');
            })
        });
    })
});