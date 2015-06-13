var app = angular.module('commonsDemo', ['commons']);


app.factory('Tasks', function(remoteResourceWrapper) {

	var tasks = [];
	for (var i = 0; i < 25; i++) {
		tasks.push({
			name: 'task ' + i,
			description: 'task description ' + i,
			date: new Date(new Date().getTime() + Math.random() * Math.pow(10, 10)),
			creator: "John Smith",
			finished: i % 3 === 0
		});
	}

	return remoteResourceWrapper(tasks);
});

app.controller('TaskCtrl', function($scope, Tasks) {

	$scope.tasks = []; // contains the paginated interval only.
	$scope.taskCount = 0;

	$scope.taskColumns = [{
		property: 'name', 
		displayName: 'Név',
		sortable: true
	},{
		property: 'date', 
		displayName: 'Date',
		cellTemplate: '<span>{{item.date | date:"yyyy-MM-dd"}}</span>',
		sortable: true
	}, {
		property: 'creator',
		displayName: 'Creator',
	}, {
		property: 'description',
		displayName: 'Description',
		hidden: true
	}, {
		property: 'finished',
		displayName: 'Finished',
		headerTemplate: '<span style="color: rgb(232, 0, 0)">Finished</span>',
		cellTemplate:
			'<span style="color: grey">' 
		 + '<span class="glyphicon glyphicon-ok" ng-show="item.finished"></span>'
		 + '<span class="glyphicon glyphicon-remove" ng-show="!item.finished"></span>'
		 + '</span>',
		 width: '100px'
	}];

	$scope.reloadTasks = function(params) {
		$scope.tasks = Tasks.query(params);
	};

	$scope.taskCount = Tasks.count();

});

app.factory('Cars', function(remoteResourceWrapper) {
	return remoteResourceWrapper([
		{ year: 1997, maker: 'Ford', model: 'E350', desc: 'ac, abs, moon', price: 3000.00 },
		{ year: 1999, maker: 'Chevy', model: 'Venture "Extended Edition"', price: 4900.00 },
		{ year: 1999, maker: 'Checy', model: 'Venture "Extended Edition, Very Large"', price: 5000.00 },
		{ year: 1996, maker: 'Jeep', model: 'Grand Cherokee', desc: 'air, moon roof, loaded', price: 4799.00 }
	]);
});

app.controller('CarsCtrl', function($scope, Cars) {

	$scope.cars = [];
	$scope.carCount = 0;

	$scope.carColumns = [{
		property: 'year',
		displayName: 'Year',
		cellTemplate: '<input type="number" ng-model="item.year" style="width: 50px"/>',
		sortable: true
	}, {
		property: 'maker',
		displayName: 'Maker',
	}, {
		property: 'model',
		displayName: 'Model',
	}, {
		property: 'price',
		displayName: "Price ($)"
	}, {
		displayName: 'Actions',
		headerTemplate: '<i>Actions</i>',
		cellTemplate: '<button ng-click="parentScope.carClicked(item)">Buy</button>'
	}];

	$scope.carOptions = {
		pagination: false,
		indexColumn: false,
		rowColors: [{
			color: 'rgb(255, 255, 128)',
			condition: function(car, $index) {
				return car.year >= $scope.yearLimit;
			}
		}],
		parentScope: true
	};

	$scope.yearLimit = 1999;

	$scope.carClicked = function(car) {
		alert(car.model);
	};

	$scope.reloadCars = function(params) {
		$scope.cars = Cars.query(params);
	};

	$scope.carCount = Cars.count();
});