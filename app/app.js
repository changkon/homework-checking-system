var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('');

	$stateProvider.state('home', {
		url: '',
		templateUrl: 'app/views/home.html',
		controller: 'MainCtrl'
	});

});