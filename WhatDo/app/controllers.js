(function () {
    "use strict";
    angular.module("myapp", [])

    .controller("appCtrl", ["$scope", function ($scope) {
    }])

    //homeCtrl provides the logic for the home screen
    .controller("homeCtrl", ["$scope", "$state", function ($scope, $state) {
        $scope.refresh = function () {
            //refresh binding
            $scope.$broadcast("scroll.refreshComplete");
        };
    }])

   //Controller for Romantic view page
   .controller("romantic", function ($scope, $http) {
       $scope.page = "Romantic"
       $http.get('data/romantic.json')
       .success(function (response) {
           console.log('response = ' + response.Type);
           $scope.locations = response.locations;
       })
   })

   //Controller for Random view page
   .controller("random", function ($scope, $http) {
       $scope.page = "Random"
       $http.get('data/random.json')
       .success(function (response) {
           console.log('response = ' + response.Type);
           $scope.locations = response.locations;
       })
   })

   //Controller for Entertainment view page
   .controller("entertainment", function ($scope, $http) {
       $scope.page = "Entertainment"
       $http.get('data/entertainment.json')
       .success(function (response) {
           console.log('response = ' + response.Type);
           $scope.locations = response.locations;
       })
   })

   //Controller for drinks view page
   .controller("drinks", function ($scope, $http) {
       $scope.page = "Drinks"
       console.log('entertainment');
       $http.get('data/drinks.json')
       .success(function (response) {
           console.log('response = ' + response.Type);
           $scope.locations = response.locations;
       })
   })

   //Controller for drinks view page
   .controller("interest", function ($scope, $http) {
       $scope.page = "Point of Interest"
       console.log('entertainment');
       $http.get('data/interest.json')
       .success(function (response) {
           console.log('response = ' + response.Type);
           $scope.locations = response.locations;
       })
   })

   //Controller for drinks view page
   .controller("shopping", function ($scope, $http) {
       $scope.page = "Shopping"
       console.log('entertainment');
       $http.get('data/Shopping.json')
       .success(function (response) {
           console.log('response = ' + response.Type);
           $scope.locations = response.locations;
       })
   })
})();