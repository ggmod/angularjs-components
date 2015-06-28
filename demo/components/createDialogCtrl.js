angular.module('commonsDemo')
	.controller('DemoCreateDialogCtrl', function($scope, dialog) {

		var editorOptions = {
			scope: $scope,
			template: 'components/edit-dialog1.html',
			controller: 'DemoEditDialog1Ctrl',
			editedItem: null
		};

		$scope.openEditDialog = function() {
			editorOptions.editedItem = { age: 18 };
			dialog.editor(editorOptions);
		};
	});