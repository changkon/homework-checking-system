var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'app/views/home.html'
	});

});

// app.controller('TabCtrl', ['$scope', '$http', function($scope, $http) {

// 	$http.get('https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d').
// 	then(function(response) {
// 		//success
// 		$scope.data = response.data;
// 		console.log(response);
// 	}, function(response) {
// 		//failure
// 		console.log('fail');
// 	});
// }]);

// app.controller('ContentCtrl', ['$scope', function($scope) {
// 	$scope.greeting = 'lol';
// }]);