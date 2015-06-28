angular.module('commonsDemo')
	.controller('CustomEditDialogCtrl', function($scope, dialog) {

		var editorOptions = {
			scope: $scope,
			template: 'dialog/edit-panel.html',
			controller: 'EditPanelCtrl',
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