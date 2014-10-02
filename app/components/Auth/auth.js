angular.module('auth', [])

.service('Auth', function($window, $firebaseSimpleLogin) {

	// firebase reference used by methods below
	var myRef = new $window.Firebase("https://hb-test.firebaseio.com");
	var authClient = $firebaseSimpleLogin(myRef);

	/**
     * @param {object} user
     * @returns promise
     */
    this.login = function(user) {
      return authClient.$login('password', {
        email: user.email,
        password: user.password,
        rememberMe: true
      });

    };

    /**
     * logout from Firebase
     */
    this.logout = function() {
      authClient.$logout();
    };

    /**
     * Check if user is authenticated
     * @return promise
     */
	this.isAuthenticated = function(){
		return authClient.$getCurrentUser() // this returns a promise
	};

	/**
     * used to register user
     * @returns {*}
     */
	this.register = function(user) {
		authClient.createUser(user.email, user.password, function(error, user) {
		  if (error === null) {
		    console.log("User created successfully:", user);
		  } else {
		    console.log("Error creating user:", error);
		  }
		});
	}
});