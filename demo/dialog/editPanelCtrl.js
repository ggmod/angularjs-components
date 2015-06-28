angular.module('commonsDemo')
	.controller('EditPanelCtrl', function($scope, editDialog) {

		editDialog.saveHandler = function() {
			console.log('Item saved:', $scope.editedItem);
		};

		editDialog.cancelHandler = function() {
			console.log('Item cancelled:', $scope.editedItem);
		};

		editDialog.removeHandler = function() {
			console.log('Item removed:', $scope.editedItem);
		};

		editDialog.beforeOperation = function(operation) {
			if (operation === 'SAVE') {
				console.log('Before save', $scope.editedItem);
			}
		};
	});