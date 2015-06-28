angular.module('commonsDemo')
	.controller('DemoEditDialogsCtrl', function($scope, dialog) {

		var editorOptions = {
			scope: $scope,
			template: 'components/edit-dialog1.html',
			controller: 'DemoEditDialog1Ctrl',
			editedItem: null
		};

		$scope.item = {
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