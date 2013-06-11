$scope = null
template = null
restService = null

initializeInfeccionDirectiveSpec = ->
	template = angular.element '<infeccion-detail></infeccion-detail>'
	module 'epicrisis'
	inject ($injector, $rootScope, $compile, $templateCache) ->
		loadTemplates $templateCache
		restService = $injector.get 'restService'
		$scope = $rootScope.$new()
		$scope.epicrisis = restService.mockEpicrisis
		$compile(template)($scope)
		$scope.$apply()