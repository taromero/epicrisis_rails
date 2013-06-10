epicrisis.directive "epicrisisDetail", ->
    restrict: "E"
    transclude: true
    controller: ($scope, $routeParams, restService) ->
        $scope.epicrisisId = $routeParams.id
        restService.epicrisis.get
            id: $routeParams.id
        , (data) ->
            $scope.epicrisis = data.epicrisis
    templateUrl: "partials/epicrisis-detail.html"
    replace: true
