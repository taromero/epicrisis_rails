describe('Otros cultivos de una infeccion', function() {
	beforeEach(function() {
        initializeInfeccionDirectiveSpec();
    });

    it('should add a row on otrosCultivos table with the form when clicking on add', function() {
        expect(template.find('tr.newForm').css('display')).toBe('none');
        template.find('#newCultivo').click();
        expect($scope.newFormEnabled).toBe(true);
        expect(template.find('tr.newForm').css('display')).not.toBe('none');
        expect($scope.nuevoCultivo.nombre).toBe('');
        expect($scope.nuevoCultivo.positivo).toBe(false)
    });

    describe('when adding a new cultivo when name is blank ', function() {
        beforeEach(function() {
            expect($scope.infeccion.cultivos.length).toBe(0)
            template.find('#newCultivo').click();
            $scope.nuevoCultivo.nombre = ''
            $scope.nuevoCultivo.positivo = true
            $scope.$apply();
            template.find('#addCultivo').click();
        });

        it('should show an error', function() {
            expect($scope.infeccion.cultivos.length).toBe(0)
            expect(template.find('.otrosCultivos tbody tr .alert-error').length).toBe(1);
        });

        describe('if I close the alert and try to add the new cultivo again', function() {
            beforeEach(function() {
                template.find('.alert .close').click();
            });
            it('should shoe the alert again', function() {
                expect(template.find('.otrosCultivos tbody tr .alert-error').length).toBe(0);
                template.find('#addCultivo').click();
                expect(template.find('.otrosCultivos tbody tr .alert-error').length).toBe(1);
            });
        });
    });



    describe('when a cultivo has already been added', function() {
        var nombreCultivo = 'nombreee';
        var positivoCultivo = true;
        beforeEach(function() {
            expect($scope.infeccion.cultivos.length).toBe(0)
            template.find('#newCultivo').click();
            $scope.nuevoCultivo.nombre = nombreCultivo
            $scope.nuevoCultivo.positivo = positivoCultivo
            $scope.$apply();
            template.find('#addCultivo').click();
        });

        it('a new cultivo should be added to the list', function() {
            expect($scope.infeccion.cultivos.length).toBe(1)
            expect($scope.infeccion.cultivos[0].nombre).toBe(nombreCultivo)
            expect($scope.infeccion.cultivos[0].positivo).toBe(positivoCultivo)
            expect(template.find('.otrosCultivos tbody tr.otrosCultivos input[type=text]').val()).toBe(nombreCultivo)
            expect(template.find('.otrosCultivos tbody tr.otrosCultivos input[type=checkbox]').val()).toBe(positivoCultivo ? 'on' : '')
            expect(template.find('.otrosCultivos tbody tr.otrosCultivos').length).toBe(1); 
            expect(template.find('.otrosCultivos tbody tr .alert-success').length).toBe(1); 
        });

        it('should delete a cultivo', function() {
            expect($scope.infeccion.cultivos.length).toBe(1)
            expect(template.find('.otrosCultivos tbody tr.otrosCultivos').length).toBe(1); 
            template.find('.deleteCultivo')[0].click();
            expect($scope.infeccion.cultivos.length).toBe(0)
            expect(template.find('.otrosCultivos tbody tr.otrosCultivos').length).toBe(0); 
            expect($scope.httpMessage).toEqual('cultivo ' + nombreCultivo + ' eliminado correctamente')
        });

        it('new form should be hidden again', function() {
            expect(template.find('tr.newForm').css('display')).toBe('none');
        });

        describe('when adding a second cultivo', function() {
            beforeEach(function() {
                template.find('#newCultivo').click();
                expect(template.find('tr.newForm').css('display')).toBe('');
                expect($scope.newFormEnabled).toBe(true);
            });

            it('new form should have nombre blank and positivo false', function() {
                expect($scope.nuevoCultivo.nombre).toBe('');
                expect($scope.nuevoCultivo.positivo).toBe(false);
            });
        })
    })
});