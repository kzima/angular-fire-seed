'use strict';

angular.module('myApp.login', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('login', {
  	url: "/login",
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', function($scope) {
	
	// view model
	$scope.user = {
		email: "",
		password: ""
	};

	// use Auth service to login user
	$scope.login = function(){
		$scope.Auth.login($scope.user)
        .then(function(user) {
        	console.log(user);
          	$scope.$state.go('account');
        }, function(err) {
          $scope.err = err;
        });
	}
});