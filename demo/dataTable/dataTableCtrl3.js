angular.module('commonsDemo')
	.factory('Tasks', function(remoteResourceWrapper) {

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
	})

	.controller('TaskCtrl', function($scope, Tasks) {

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
				'<span style="color: grey">' +
			 	'<span class="glyphicon glyphicon-ok" ng-show="item.finished"></span>' +
			 	'<span class="glyphicon glyphicon-remove" ng-show="!item.finished"></span>' +
			 	'</span>',
			 width: '100px'
		}];

		$scope.reloadTasks = function(params) {
			$scope.tasks = Tasks.query(params);
			$scope.taskCount = Tasks.count().count;
		};

	});