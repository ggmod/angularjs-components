angular.module('commonsDemo')
	.controller('EditDialogCtrl', function($scope, dialog) {

		var editorOptions = {
			scope: $scope,
			template: 'dialog/edit-panel.html',
			controller: 'EditPanelCtrl',
			editedItem: null
		};

		$scope.item = {
			id: 123456,
			name: 'John Smith',
			email: 'asdfgh@mail.com',
			age: 24,
			married: true
		};

		$scope.openEditDialog = function() {
			editorOptions.editedItem = $scope.item;
			dialog.editor(editorOptions);
		};
	});