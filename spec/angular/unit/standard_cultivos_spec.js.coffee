describe 'Cultivos estandar de una infeccion (Ascitis, Hemocultivos, Urocultivo)', () ->
	beforeEach () ->
        initializeInfeccionDirectiveSpec()

    describe 'realizado', () ->
        it "should watch positivo's value and update accordingly", () ->
            using 'all posible standard cultivos', ['ascitis', 'hemocultivos', 'urocultivo'], (cultivo) ->
                using "all posible combinations of positivo and realizado", 
                    [
                        [null, false],
                        [false, true],
                        [true, true],
                        [null, false]
                    ], (positivo, realizado) ->
                        $scope.infeccion[cultivo]['positivo'] = positivo
                        $scope.$apply()
                        expect($scope.infeccion[cultivo]['realizado']).toBe realizado
                        expect(template.find('.' + cultivo + ' .realizado').is(':checked')).toBe realizado

    describe 'positivo', () ->
        it "should watch realizado's value and update accordingly", () ->
            using "all posible standard cultivos", ['ascitis', 'hemocultivos', 'urocultivo'], (cultivo) ->
                $scope.infeccion[cultivo]['positivo'] = true
                $scope.$apply()
                $scope.infeccion[cultivo]['realizado'] = false
                $scope.$apply()
                expect($scope.infeccion[cultivo]['positivo']).toBe null