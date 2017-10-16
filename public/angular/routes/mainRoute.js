// DEFINE ALL ROUTES
app.config(function($routeProvider){

	$routeProvider
	.otherwise({
         
          redirectTo: '/'

    })
	.when('/',{
		templateUrl :'./angular/views/homeView.html',
		controller :'homeController',
		controllerAs:'homeCtrl'
	})
	.when('/login',{
		templateUrl:'./angular/views/loginView.html',
		controller : 'loginController',
		controllerAs : 'loginCtrl'
	})
	.when('/signup', {
		templateUrl:'./angular/views/signupView.html',
		controller: 'signupController',
		controllerAs: 'signupCtrl'
	})
	.when('/profile', {
		templateUrl:'./angular/views/profileView.html',
		controller:'profileController',
		controllerAs: 'profileCtrl'
	})
	

});