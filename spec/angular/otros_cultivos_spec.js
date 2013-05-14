describe('Otros cultivos de una infeccion', function() {
	var $scope, template;
    var restService;
    jasmine.getFixtures().fixturesPath = 'public/partials/';
	beforeEach(function() {
        template = angular.element('<infeccion-detail></infeccion-detail>');
        module('epicrisis');
        module('epicrisisMocks');
        inject(function($injector, $controller, $rootScope, $compile, $templateCache) {
            $templateCache.put('partials/infeccion-detail.html', jasmine.getFixtures().getFixtureHtml_('infeccion-detail.html'));
            $templateCache.put('partials/otros-cultivos.html', jasmine.getFixtures().getFixtureHtml_('otros-cultivos.html'));
            restService = $injector.get('restService');
        	$scope = $rootScope.$new();
            $scope.epicrisis = restService.mockEpicrisis;
            $compile(template)($scope);
            $scope.$apply();
        })
    });

    it('should add a row on otrosCultivos table with the form when clicking on add', function() {
        expect(template.find('tr.newForm').css('display')).toBe('none');
        template.find('#newCultivo').click();
        expect($scope.newFormEnabled).toBe(true);
        expect(template.find('tr.newForm').css('display')).toBe('');
    });

    it('should add a row with the new cultivo when clicking on create, and the form should remain', function() {
        template.find('#newCultivo').click();
        template.find('tr.newform input[type=text]').val('nombreee');
        template.find('tr.newform input[type=checkbox]').attr('checked', 'checked');
        template.find('#addCultivo').click();

        expect(template.find('tr.newForm').css('display')).toBe(''); 
        expect(template.find('.otrosCultivos tbody tr').length).toBe(2); 
    });
});