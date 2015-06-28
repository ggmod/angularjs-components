angular.module('commonsDemo')
	.controller('CreateDialogCtrl', function($scope, dialog) {

		var editorOptions = {
			scope: $scope,
			template: 'dialog/edit-panel.html',
			controller: 'EditPanelCtrl',
			editedItem: null
		};

		$scope.openEditDialog = function() {
			editorOptions.editedItem = { age: 18 };
			dialog.editor(editorOptions);
		};
	});