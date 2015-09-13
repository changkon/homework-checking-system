var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	//$urlRouterProvider.otherwise('/');

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
	}).state('home.content', {
		url: '/{id:int}/{creator_id:int}',
		templateUrl: 'app/views/assignment_detail.html',
		controller: 'DetailCtrl'
	});
});