'use strict';

angular.module('myApp.account', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('account', {
  	url: "/account",
    templateUrl: 'account/account.html',
    controller: 'AccountCtrl',
    resolve: {
	    user: function(Auth) {
	    	return Auth.isAuthenticated() // function that returns a promise
	    }
	},
    authenticate: true
  });
}])

.controller('AccountCtrl', function() {

});