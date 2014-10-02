'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'firebase',
    'auth',
    'myApp.login',
    'myApp.account',
    'myApp.version'
])
/**
 * Set some global behavior here
 */
.config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise('account');
    }
)
/**
 * Manages global states
 */
.run(function($rootScope, $state, Auth) {

	/**
	 * Checks if route requires authentication and redirects to login if user not logged
	 */
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    	$rootScope.loadingView = true;
        // check if toute with authenticate param resolved user and if user set, otherwise redirect to login
        if (toState.authenticate) {
        	Auth.isAuthenticated().then(function(user){
        		if (user) {
	        		return true;//$state.transitionTo('account');
	        	} else {
	        		event.preventDefault();
					// redirect to login
					$state.transitionTo('login', toParams, { location:true, inherit:true, reload:true, notify:true });
	        	}
        	}); 
        }
    });

    /**
     * notify view that state was successful 
     */
	$rootScope.$on('$stateChangeSuccess', function(e, curr, prev) { 
		// Hide loading message
		$rootScope.loadingView = false;
	});

	// reference to state and params
	$rootScope.$state = $state;
	$rootScope.$state = $state;
})

/**
 * global app controller 
 * used mainly in the header
 */
.controller('AppCtrl', function($scope, Auth) {
	$scope.Auth = Auth;
	$scope.logout = function(){
		$scope.Auth.logout();
		$scope.$state.go('login');
	};
});