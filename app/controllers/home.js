var app = angular.module('app');

app.query = {
	assignment: 'https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d',
	assignment_submission1: 'https://api.edmodo.com/assignment_submissions?assignment_id=',
	assignment_submission2: '&assignment_creator_id=',
	assignment_submission3: '&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d'
};

app.controller('TabCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.assignmentTab = function() {

	};

	$http.get(app.query.assignment).
	then(function(response) {
		//success
		$scope.data = response.data;
	}, function(response) {
		//failure
		console.log('fail');
	});
}]);

app.controller('ContentCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.location = $location;
}]);

app.controller('DetailCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
	var id = $stateParams.id;
	var creator_id = $stateParams.creator_id;
	$scope.tabList = ['Assignment', 'Submissions'];
	$scope.showSubmission = false;

	$scope.changeActive = function(event) {
		// remove active from all li
		var li = document.getElementById('selection-tab').getElementsByTagName('li');
		for (var i = 0; i < li.length; i++) {
			var item = li[i];
			item.classList.remove('active');
		}

		// add class name to element
		var elem = event.srcElement;
		elem.classList.add('active');

		// update show submission
		if (this.value == "Submissions") {
			$scope.showSubmission = true;
		} else {
			$scope.showSubmission = false;
		}
	};

	var findAssignment = function(obj) {
		return obj.id == id;
	};

	// query assignment
	$http.get(app.query.assignment).
	then(function(response) {
		var match = response.data.filter(findAssignment)[0];
		$scope.title = match.title;
		$scope.due_at = match.due_at;
		$scope.description = match.description;
	}, function(response) {
		console.log('fail');
	});

	//query assignment submissions
	$http.get(app.query.assignment_submission1 + id + app.query.assignment_submission2 + creator_id + app.query.assignment_submission3).
	then(function(response) {
		$scope.submissions = response.data;
	}, function(response) {
		console.log('fail');
	});
}]);