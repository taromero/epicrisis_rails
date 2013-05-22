describe('Cultivos estandar de una infeccion (Ascitis, Hemocultivos, Urocultivo)', function() {
	beforeEach(function() {
        initializeInfeccionDirectiveSpec();
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
                    expect(template.find('.' + property + ' .realizado').is(':checked')).toBe(positivo_realizado[1]);
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


});