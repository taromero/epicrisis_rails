describe 'Otros cultivos de una infeccion', () ->

	beforeEach () ->
        initializeInfeccionDirectiveSpec()

    describe 'when adding a new cultivo', () ->
        beforeEach () ->
            expect(template.find('tr.newForm').css('display')).toBe 'none'
            template.find('#newCultivo').click()

        it 'should add a row on otrosCultivos table with the form when clicking on add', () ->
            expect($scope.newFormEnabled).toBe true
            expect(template.find('tr.newForm').css('display')).not.toBe 'none'
            expect($scope.nuevoCultivo.nombre).toBe ''
            expect($scope.nuevoCultivo.positivo).toBe false

        it 'should set focus to the name field', () ->
            $(document).find('body').append(template)
            template.find('#newCultivo').click()
            #El focus esta seteado en un timeout en la directive para que se ejecute despues del render
            inject ($timeout) -> $timeout.flush()
            aux = document.activeElement
            expect(aux.placeholder).toEqual 'Nombre'
            template.remove()

        describe 'when name is blank and try to create the cultivo', () ->
            beforeEach () ->
                $scope.nuevoCultivo.nombre = ''
                $scope.nuevoCultivo.positivo = true
                $scope.$apply()
                template.find('#addCultivo').click()

            it 'should show an error', () ->
                expect($scope.infeccion.cultivos.length).toBe 0
                expect(template.find('.otrosCultivos tbody tr .alert-error').length).toBe 1

            describe 'if I close the alert and try to add the new cultivo again', () ->
                beforeEach () ->
                    template.find('.alert .close').click()
                it 'should should show the alert again', () ->
                    expect(template.find('.otrosCultivos tbody tr .alert-error').length).toBe 0
                    template.find('#addCultivo').click()
                    expect(template.find('.otrosCultivos tbody tr .alert-error').length).toBe 1

        describe 'when a cultivo has already been added', () ->
            nombreCultivo = 'nombreee'
            positivoCultivo = true
            beforeEach () ->
                $scope.nuevoCultivo.nombre = nombreCultivo
                $scope.nuevoCultivo.positivo = positivoCultivo
                $scope.$apply()
                template.find('#addCultivo').click()

            it 'a new cultivo should be added to the list', () ->
                expect($scope.infeccion.cultivos.length).toBe 1
                expect($scope.infeccion.cultivos[0].nombre).toBe nombreCultivo
                expect($scope.infeccion.cultivos[0].positivo).toBe positivoCultivo
                expect(template.find('.otrosCultivos tbody tr.otrosCultivos input[type=text]').val()).toBe nombreCultivo
                expect(template.find('.otrosCultivos tbody tr.otrosCultivos input[type=checkbox]').val()).toBe(if positivoCultivo then 'on' else '')
                expect(template.find('.otrosCultivos tbody tr.otrosCultivos').length).toBe 1
                expect(template.find('.otrosCultivos tbody tr .alert-success').length).toBe 1

            it 'should delete a cultivo', () ->
                expect($scope.infeccion.cultivos.length).toBe 1
                expect(template.find('.otrosCultivos tbody tr.otrosCultivos').length).toBe 1
                template.find('.deleteCultivo')[0].click()
                expect($scope.infeccion.cultivos.length).toBe 0
                expect(template.find('.otrosCultivos tbody tr.otrosCultivos').length).toBe 0
                expect($scope.httpMessage).toEqual "cultivo #{nombreCultivo} eliminado correctamente"

            it 'new form should be hidden again', () ->
                expect(template.find('tr.newForm').css('display')).toBe 'none'

            describe 'when adding a second cultivo', () ->
                beforeEach () ->
                    template.find('#newCultivo').click()
                    expect(template.find('tr.newForm').css('display')).toBe ''
                    expect($scope.newFormEnabled).toBe true

                it 'new form should have nombre blank and positivo false', () ->
                    expect($scope.nuevoCultivo.nombre).toBe ''
                    expect($scope.nuevoCultivo.positivo).toBe false