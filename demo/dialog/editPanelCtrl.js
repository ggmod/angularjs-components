angular.module('commonsDemo')
	.controller('EditPanelCtrl', function($scope, editDialog) {

		editDialog.createHandler = function(closeCallback) {
			console.log('Item created:', $scope.editedItem);
			closeCallback();
		};

		editDialog.updateHandler = function(closeCallback) {
			console.log('Item updated:', $scope.editedItem);
			closeCallback();
		};

		editDialog.copyHandler = function(closeCallback) {
			console.log('Item copied:', $scope.editedItem);
			closeCallback();
		};

		editDialog.removeHandler = function(closeCallback) {
			console.log('Item removed:', $scope.editedItem);
			closeCallback();
		};

		editDialog.cancelHandler = function() {
			console.log('Item cancelled:', $scope.editedItem);
		};

		editDialog.beforeOperation = function(operation) {
			if (operation === 'SAVE') {
				console.log('Before save', $scope.editedItem);
			}
		};
	});