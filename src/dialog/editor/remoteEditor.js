angular.module('commons')
	.controller('AbstractRemoteEditDialogCtrl', function($scope, editDialog, Resource) {

		editDialog.createHandler = function(closeCallback) {
			Resource.create($scope.editedItem, function(result) {
				console.log('Item created:', result);
				closeCallback();
			}, function(result) {
				console.log('Failed to create item:', result);
			});
		};

		editDialog.updateHandler = function(closeCallback) {
			Resource.update({ id: $scope.editedItem[editDialog.idProperty]}, 
				$scope.editedItem, function(result) {
				console.log('Item updated:', result);
				closeCallback();
			}, function(result) {
				console.log('Failed to update item:', result);
			});
		};

		editDialog.copyHandler = function(closeCallback) {
			delete $scope.editedItem[editDialog.idProperty];
			editDialog.saveHandler(closeCallback);
		};

		editDialog.cancelHandler = function() { };

		editDialog.removeHandler = function(closeCallback) {
			Resource.remove({ id: $scope.editedItem[editDialog.idProperty]}, function(result) {
				console.log('Item removed:', result);
				closeCallback();
			}, function(result) {
				console.log('Failed to remove item:', result);
			});
		};

	});