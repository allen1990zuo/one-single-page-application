 var ECE9065_Lab1=angular.module('ECE9065_Lab1', ['ngRoute','ngAnimate','ui.bootstrap']);
        ECE9065_Lab1.config(function($routeProvider) {
        $routeProvider

            // route for the login page
            .when('/', {
                templateUrl : 'Views/Login.html',
                controller  : 'mainController'
            })
            
            // route for the Posting page
             .when('/Posting', {
                templateUrl : 'Views/Posting.html',
                controller  : 'PostingController'
            })
            // route for the PostsTracking page
            .when('/PostsTracking', {
                templateUrl : 'Views/PostsTracking.html',
                controller  : 'PostsTrackingController'
            })
            
             // route for the SpecificPostComments page
            .when('/SpecificPostComments', {
                templateUrl : 'Views/SpecificPostComments.html',
                controller  : 'SpecificPostCommentsController'
            })
            
            // route for the login page
            .when('/Login', {
                templateUrl : 'Views/Login.html',
                controller  : 'mainController'
            })
            
        });
// dropdown menu controll for the posing page   

 ECE9065_Lab1.controller('PostingController', function ($scope, $log) {
       $scope.status = {
           isopen: false
          };
      $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
       };

  
      });
// dropdown menu controll for the PostsTracking page      

ECE9065_Lab1.controller('PostsTrackingController', function ($scope, $log) {
       $scope.status = {
           isopen: false
          };
      $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
       };

  
      });

// dropdown menu controll for the SpecificPostComments page  

ECE9065_Lab1.controller('SpecificPostCommentsController', function ($scope, $log) {
       $scope.status = {
           isopen: false
          };
      $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
       };

  
      });
      
// show comment   







