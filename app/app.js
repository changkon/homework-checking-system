var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	//$urlRouterProvider.otherwise('');

	$stateProvider.state('home', {
		url: '',
		views: {
			'assignment': {
				templateUrl: 'app/views/assignment_info.html',
				controller: 'TabCtrl'
			},
			'content': {
				templateUrl: 'app/views/assignment_content.html',
				controller: 'ContentCtrl'
			}
		}
	});

});