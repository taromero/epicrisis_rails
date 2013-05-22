describe('Cultivos estandar de una infeccion (Ascitis, Hemocultivos, Urocultivo)', function() {
	beforeEach(function() {
        initializeInfeccionDirectiveSpec();
    });

    describe('realizado', function() {
        it("should watch positivo's value and update accordingly", function() {
            using('all posible standard cultivos', ['ascitis', 'hemocultivos', 'urocultivo'], function(cultivo) {
                using("all posible combinations of positivo and realizado", 
                    [
                        [null, false],
                        [false, true],
                        [true, true],
                        [null, false]
                    ], function(positivo, realizado) {
                        $scope.infeccion[cultivo]['positivo'] = positivo;
                        $scope.$apply();
                        expect($scope.infeccion[cultivo]['realizado']).toBe(realizado);
                        expect(template.find('.' + cultivo + ' .realizado').is(':checked')).toBe(realizado);
                    }
                );
            });
        });
    });

    describe('positivo', function() {
        it("should watch realizado's value and update accordingly", function() {
            using("all posible standard cultivos", ['ascitis', 'hemocultivos', 'urocultivo'], function(cultivo){
                $scope.infeccion[cultivo]['positivo'] = true;
                $scope.$apply()
                $scope.infeccion[cultivo]['realizado'] = false;
                $scope.$apply()
                expect($scope.infeccion[cultivo]['positivo']).toBe(null);
            });
        })
    });

});