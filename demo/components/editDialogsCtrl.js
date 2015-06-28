angular.module('commonsDemo')
	.controller('DemoEditDialogCtrl', function($scope, dialog) {

		var editorOptions = {
			scope: $scope,
			template: 'components/edit-dialog1.html',
			controller: 'DemoEditDialog1Ctrl',
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