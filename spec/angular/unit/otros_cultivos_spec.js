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

    describe('when a cultivo has already been added', function() {
        var nombreCultivo = 'nombreee';
        var positivoCultivo = true;
        beforeEach(function() {
            expect($scope.infeccion.cultivos.length).toBe(0)
            template.find('#newCultivo').click();
            $scope.nuevoCultivo.nombre = nombreCultivo
            $scope.nuevoCultivo.positivo = positivoCultivo
            template.find('#addCultivo').click();
        });

        it('a new cultivo should be added to the list', function() {
            expect($scope.infeccion.cultivos.length).toBe(1)
            expect($scope.infeccion.cultivos[0].nombre).toBe(nombreCultivo)
            expect($scope.infeccion.cultivos[0].positivo).toBe(positivoCultivo)
            expect(template.find('.otrosCultivos tbody tr.otrosCultivos input[type=text]').val()).toBe(nombreCultivo)
            expect(template.find('.otrosCultivos tbody tr.otrosCultivos input[type=checkbox]').val()).toBe(positivoCultivo ? 'on' : '')
            expect(template.find('.otrosCultivos tbody tr.otrosCultivos').length).toBe(1); 
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