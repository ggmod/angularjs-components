angular.module('commonsDemo')
	.controller('DemoCustomEditDialogCtrl', function($scope, dialog) {

		var editorOptions = {
			scope: $scope,
			template: 'components/edit-dialog1.html',
			controller: 'DemoEditDialog1Ctrl',
			editedItem: null,
			display: {
				title: 'Custom editor title',
				showRemove: false,
				save: 'Update',
				copy: 'Save as',
				size: 'small'
			},
			isNewItem: function() { return false; }
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