describe('Otros cultivos de una infeccion', function() {
	var $scope, template;
    var restService;
	beforeEach(function() {
        template = angular.element('<otroscultivos></otroscultivos>');
        module('epicrisis');
        module('epicrisisMocks');
        inject(function($injector, $controller, $rootScope, $compile) {
            restService = $injector.get('restService');
        	$scope = $rootScope.$new();
            $compile(template)($scope);
            controller = $controller("EpicrisisDetailCtrl", {$scope: $scope, restService: restService})
            $scope.$apply();
        })
    });

    it('should add a row on otrosCultivos table with the form when clicking on add', function() {
        expect(template.find('tr.newForm').css('display')).toBe('none');
        template.find('#newCultivo').click();
        expect(template.find('tr.newForm').css('display')).toBe('');
    });

    it('should add a row with the new cultivo when clicking on create, and the form should remain', function() {
        template.find('#newCultivo').click();
        template.find('tr.newform input[type=text]').val('nombreee');
        template.find('tr.newform input[type=checkbox]').attr('checked', 'checked');
        template.find('#addCultivo').click();

        expect(template.find('tr.newForm').css('display')).toBe(''); 
        expect(template.find('tbody tr').length).toBe(2); 
    });
});