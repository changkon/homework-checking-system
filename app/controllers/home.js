var app = angular.module('app');

app.query = {
	assignment: 'https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d',
	assignment_submission1: 'https://api.edmodo.com/assignment_submissions?assignment_id=',
	assignment_submission2: '&assignment_creator_id=',
	assignment_submission3: '&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d'
};

app.controller('TabCtrl', ['$scope', '$http', function($scope, $http) {
	var counter = -1;

	// initialize
	$scope.newAssignment = {
		title: "",
		due_at: "",
		description: "",
		id: counter,
		creator: {
			id: counter
		}
	};

	$scope.addAssignment = function() {
		
		if ($scope.newAssignment.title == '' || $scope.newAssignment.due_at == '' || $scope.newAssignment.description == '') {
			return;
		}

		// clone object
		var copy = {
			title: $scope.newAssignment.title,
			due_at: $scope.newAssignment.due_at,
			description: $scope.newAssignment.description,
			id: $scope.newAssignment.id,
			creator: $scope.newAssignment.creator
		};

		$scope.data.push(copy);

		// empty
		$scope.newAssignment.title = '';
		$scope.newAssignment.due_at = '';
		$scope.newAssignment.description = '';

		counter--;
		$scope.newAssignment.id = counter;
	}

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

	// determines if object is mock object
	var mockObject = id < 0 && creator_id < 0 ? true : false;

	$scope.tabList = ['Assignment', 'Submissions'];
	$scope.showSubmission = false;
	$scope.submissionIndex = -1;

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

	$scope.changeSubmissionContent = function(event, index) {
		$scope.submissionIndex = $scope.submissionIndex == index ? -1 : index;
	}

	var findAssignment = function(obj) {
		return obj.id == id;
	};

	if (mockObject) {
		// add mock data
		$scope.title = "Placeholder title";
		$scope.due_at = new Date("2015-09-25");
		$scope.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisi finibus, rhoncus nulla ac, lobortis magna. Vestibulum a nunc porttitor, pharetra diam quis, egestas tellus. Donec rutrum ipsum at lorem ultrices consequat. Suspendisse auctor erat at augue tempor, nec commodo turpis elementum. In vehicula, urna ac molestie dignissim, arcu nunc hendrerit nunc, quis ullamcorper lectus elit ac risus. Suspendisse lacinia bibendum turpis.";
		$scope.submissions = [
			{
				creator: {
					first_name: "Henry",
					last_name: "Williams"
				},
				submitted_at: new Date('2015-08-30'),
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisi finibus, rhoncus nulla ac, lobortis magna. Vestibulum a nunc porttitor, pharetra diam quis, egestas tellus."
			},
			{
				creator: {
					first_name: "John",
					last_name: "Hill"
				},
				submitted_at: new Date('2015-08-30'),
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisi finibus, rhoncus nulla ac, lobortis magna. Vestibulum a nunc porttitor, pharetra diam quis, egestas tellus."
			},
			{
				creator: {
					first_name: "Lucas",
					last_name: "Watson"
				},
				submitted_at: new Date('2015-08-30'),
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisi finibus, rhoncus nulla ac, lobortis magna. Vestibulum a nunc porttitor, pharetra diam quis, egestas tellus."
			},
			{
				creator: {
					first_name: "Jenny",
					last_name: "Liu"
				},
				submitted_at: new Date('2015-08-30'),
				content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec nisi finibus, rhoncus nulla ac, lobortis magna. Vestibulum a nunc porttitor, pharetra diam quis, egestas tellus."
			},
		];
	} else {
		// load data

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
	}

}]);