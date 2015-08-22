angular.module('commonsDemo')
	.controller('CrudPageCtrl', function($scope, dialog, Users) {

		$scope.users = [];
		$scope.usersCount = 0;

		$scope.nameFilter = '';
		$scope.statusFilter = undefined;

		$scope.usersTable = {};

		$scope.usersTableColumns = [{
			property: 'name', 
			displayName: 'Name',
			sortable: true
		},{
			property: 'email', 
			displayName: 'E-mail',
			sortable: true
		},{
			property: 'age', 
			displayName: 'Age',
			sortable: true
		},{
			property: 'married',
			displayName: 'Married',
			cellTemplate:
				'<span style="color: grey">' +
			 	'<span class="glyphicon glyphicon-ok" ng-show="item.married"></span>' +
			 	'<span class="glyphicon glyphicon-remove" ng-show="!item.married"></span>' +
			 	'</span>',
			 width: '100px'			
		},{
			cellTemplate:
				'<span>' +
			 	'<a class="btn btn-sm btn-default row-button" ng-click="parentScope.editItem(item)"><span class="glyphicon glyphicon-edit"/></a>' +
			 	'<a class="btn btn-sm btn-default row-button" ng-click="parentScope.removeItem(item)"><span class="glyphicon glyphicon-trash"/></a>' +
			 	'</span>',
			width: '100px'
		}];

		$scope.reloadUsers = function(queryParams) {
			if ($scope.nameFilter) {
				queryParams.name = $scope.nameFilter;
			}
			if ($scope.statusFilter) {
				queryParams.married = $scope.statusFilter === 'true';
			}

			$scope.users = Users.query(queryParams);
			$scope.usersCount = Users.count().count;
		};

		var editorOptions = {
			scope: $scope,
			template: 'dialog/edit-panel.html',
			controller: 'CrudPageEditPanelCtrl',
			editedItem: null,
			display: {}
		};

		$scope.newItem = function() {
			editorOptions.display.title = 'Create User';
			editorOptions.editedItem = { age: 18 };
			dialog.editor(editorOptions);
		};

		$scope.editItem = function(item) {
			Users.get({ id: item.id }, function(result) {
				editorOptions.display.title = 'Edit User';
				editorOptions.editedItem = result;
				dialog.editor(editorOptions);
			});
		};

		$scope.removeItem = function(item) {
			dialog.confirm(item.name, function() {
				Users.remove({ id: item.id }, function() {
					$scope.usersTable.reload();
				});
			});
		};

	});