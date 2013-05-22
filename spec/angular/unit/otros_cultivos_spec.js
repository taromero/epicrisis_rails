describe('Otros cultivos de una infeccion', function() {
	beforeEach(function() {
        initializeInfeccionDirectiveSpec();
    });

    it('should add a row on otrosCultivos table with the form when clicking on add', function() {
        expect(template.find('tr.newForm').css('display')).toBe('none');
        template.find('#newCultivo').click();
        expect($scope.newFormEnabled).toBe(true);
        expect(template.find('tr.newForm').css('display')).not.toBe('none');
    });

    // describe('when a cultivo has already been added', function() {
    //     beforeEach(function() {
    //         template.find('#newCultivo').click();
    //         template.find('tr.newform input[type=text]').val('nombreee');
    //         template.find('tr.newform input[type=checkbox]').attr('checked', 'checked');
    //         template.find('#addCultivo').click();
    //     });

    //     it('new form should be hidden again', function() {
    //         expect(template.find('tr.newForm').css('display')).toBe('none');
    //     });

    //     // it('should add a row on otrosCultivos', function() {
    //     //     expect(template.find('tr.newForm').css('display')).toBe('none');
    //     //     template.find('#newCultivo').click();
    //     //     expect($scope.newFormEnabled).toBe(true);
    //     //     expect(template.find('tr.newForm').css('display')).not.toBe('none');
    //     // });
    // })

    it('should add a row with the new cultivo when clicking on create, and the form should remain', function() {
        template.find('#newCultivo').click();
        template.find('tr.newform input[type=text]').val('nombreee');
        template.find('tr.newform input[type=checkbox]').attr('checked', 'checked');
        template.find('#addCultivo').click();

        expect(template.find('tr.newForm').css('display')).toBe(''); 
        expect(template.find('.otrosCultivos tbody tr').length).toBe(2); 
    });
});