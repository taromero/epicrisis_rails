describe 'Ascitis', () ->
	beforeEach () ->
		initializeInfeccionDirectiveSpec()

	it 'should show ascitis form if realizado is true', () ->
		$scope.infeccion.ascitis.realizado = false
		$scope.$apply()
		expect(template.find('div.ascitis').css('display')).toBe 'none'
		$scope.infeccion.ascitis.realizado = true
		$scope.$apply()
		expect(template.find('div.ascitis').css('display')).not.toBe 'none'

	it 'should null all ascitis attributes if realizado is false when updating', () ->
		ascitis = $scope.infeccion.ascitis
		properties = [['gasa', true], ['citologico', 'a'], ['recuento_de_neutrofilos', 20], ['proteinas_totales', 3.5]]
		_(properties).each (propVal) -> ascitis[propVal[0]] = propVal[1]
		_(properties).each (propVal) -> expect(ascitis[propVal[0]]).toBe propVal[1]
		ascitis.realizado = false
		$scope.update()
		_(properties).each (propVal) -> expect(ascitis[propVal[0]]).toBe null