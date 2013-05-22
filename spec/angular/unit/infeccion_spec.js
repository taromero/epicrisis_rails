describe('Infeccion', function() {
    
    beforeEach(function() {
        initializeInfeccionDirectiveSpec();
    });

    describe('update', function() {
        it("should show a success msg en case of successful update", function() {
            expect(template.find('.status tr').hasClass('success')).toBe(false);
            template.find('#guardar').click();
            $(document).find('body').append(template)
            expect(template.find('.status tr').hasClass('success')).toBe(true);
            expect($scope.httpMessage).toEqual('actualizado correctamente')
        });

        it("should show an error msg en case of unsuccesful update", function() {
            expect(template.find('.status tr').hasClass('error')).toBe(false);
            $scope.infeccion.id = 0;
            template.find('#guardar').click();
            expect(template.find('.status tr').hasClass('error')).toBe(true);
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

});