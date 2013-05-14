var epicrisis = epicrisis || angular.module('epicrisis', ['ngResource']);

epicrisis.directive('epicrisisDetail', function() {

  return {
    restrict: 'E',
    transclude: true,
    controller: function($scope, $routeParams, restService) {
		$scope.epicrisisId = $routeParams.id;
		restService.epicrisis.get({ id: $routeParams.id}, function(data) {
		    $scope.epicrisis = data.epicrisis;
		});
    },
    templateUrl: 'partials/epicrisis-detail.html',
    replace: true
  }

});