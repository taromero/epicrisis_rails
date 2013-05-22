describe('Ascitis', function() {
	beforeEach(function() {
        initializeInfeccionDirectiveSpec();
    });

    it('should show ascitis form if realizado is true', function() {
	    $scope.infeccion.ascitis.realizado = false;
	    $scope.$apply();
	    expect(template.find('div.ascitis').css('display')).toBe('none');
	    $scope.infeccion.ascitis.realizado = true;
	    $scope.$apply();
	    expect(template.find('div.ascitis').css('display')).not.toBe('none');
	});

	it('should null all ascitis attributes if realizado is false when updating', function() {
	    $scope.infeccion.ascitis.realizado = true;
	    $scope.infeccion.ascitis.gasa = true;
	    $scope.infeccion.ascitis.citologico = 'a';
	    $scope.infeccion.ascitis.recuento_de_neutrofilos = 20;
	    $scope.infeccion.ascitis.proteinas_totales = 3.5;
	    expect($scope.infeccion.ascitis.gasa).toBe(true);
	    expect($scope.infeccion.ascitis.citologico).toBe('a');
	    expect($scope.infeccion.ascitis.recuento_de_neutrofilos).toBe(20);
	    expect($scope.infeccion.ascitis.proteinas_totales).toBe(3.5);
	    $scope.infeccion.ascitis.realizado = false;
	    $scope.update();
	    expect($scope.infeccion.ascitis.gasa).toBe(null);
	    expect($scope.infeccion.ascitis.citologico).toBe(null);
	    expect($scope.infeccion.ascitis.recuento_de_neutrofilos).toBe(null);
	    expect($scope.infeccion.ascitis.proteinas_totales).toBe(null);
	});
});