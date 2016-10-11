(function () {
    "use strict";

    var myapp = angular.module("myapp", ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "templates/view-home.html",
                })
                .when("/random", {
                    templateUrl: "templates/view-results.html",
                    controller: random
                })
                .when("/entertainment", {
                    templateUrl: "templates/view-results.html",
                    controller: entertainment
                })
                .when("/drinks", {
                    templateUrl: "templates/view-results.html",
                    controller: drinks
                })
                .when("/interest", {
                    templateUrl: "templates/view-results.html",
                    controller: interest
                })
                .when("/shopping", {
                    templateUrl: "templates/view-results.html",
                    controller: shopping
                })
                .when("/romantic", {
                    templateUrl: "templates/view-results.html",
                    controller: romantic
                })
                .otherwise({
                    templateUrl: 'templates/view-home.html',
                });
        });
})();

function entertainment($scope, $http){
    $scope.page = "Entertainment"
    $http.get('data/entertainment.json')
    .success(function (response) {
        $scope.locations = response.locations;
    })
}

function romantic($scope, $http) {
    $scope.page = "romantic"
    $http.get('data/romantic.json')
    .success(function (response) {
        $scope.locations = response.locations;
    })
}

function drinks($scope, $http) {
    $scope.page = "drinks"
    $http.get('data/drinks.json')
    .success(function (response) {
        $scope.locations = response.locations;
    })
}

function interest($scope, $http) {
    $scope.page = "interest"
    $http.get('data/interest.json')
    .success(function (response) {
        $scope.locations = response.locations;
    })
}

function shopping($scope, $http) {
    $scope.page = "shopping"
    $http.get('data/shopping.json')
    .success(function (response) {
        $scope.locations = response.locations;
    })
}

function random($scope, $http) {
    $scope.page = "random"
    $http.get('data/random.json')
    .success(function (response) {
        $scope.locations = response.locations;
    })
}