epicrisis.directive "toggleButton", ->
    restrict: "E"
    transclude: true
    scope: { visible: '=' }
    controller: ($scope) ->
        $scope.toggle = -> 
            if $scope.visible is null
                $scope.visible = true
            else
                $scope.visible = !$scope.visible
    templateUrl: "partials/toggle-button.html"
    replace: true
